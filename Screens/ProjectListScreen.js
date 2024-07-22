import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, CheckBox } from 'react-native';
import { firestore, auth } from '../firebaseConfig';  // Ensure this path is correct

const ProjectListScreen = ({ navigation }) => {
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const organizationId = 'organizationId'; // Replace with actual organization ID
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const orgDoc = await firestore
          .collection('organizations')
          .doc(organizationId)
          .get();

        if (orgDoc.exists) {
          const membersData = orgDoc.data().members || [];
          const userPromises = membersData.map(memberId =>
            firestore.collection('users').doc(memberId).get()
          );
          const users = await Promise.all(userPromises);
          const members = users.map(user => ({
            uid: user.id,
            displayName: user.data().displayName,
          }));
          setMembers(members);
        }
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    const fetchProjects = async () => {
      try {
        const projectsSnapshot = await firestore
          .collection('projects')
          .where('organizationId', '==', organizationId)
          .get();

        const projectsData = projectsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        const tasksPromises = projectsData.map(async (project) => {
          const tasksSnapshot = await firestore
            .collection('tasksmanage')
            .where('projectId', '==', project.id)
            .get();

          const tasksData = tasksSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

          return { ...project, tasks: tasksData };
        });

        const projectsWithTasks = await Promise.all(tasksPromises);

        // Filter projects where the current user is assigned to at least one task
        const filteredProjects = projectsWithTasks.filter(project =>
          project.tasks.some(task => task.assignedTo === userId)
        );

        setProjects(filteredProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
    fetchProjects();
  }, [organizationId, userId]);

  const getMemberName = (uid) => {
    const member = members.find(member => member.uid === uid);
    return member ? member.displayName : 'Unknown';
  };

  const handleTaskCompletion = async (projectId, taskId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'completed' ? 'incomplete' : 'completed';
      await firestore
        .collection('tasksmanage')
        .doc(taskId)
        .update({ status: newStatus });

      setProjects(prevProjects =>
        prevProjects.map(project =>
          project.id === projectId
            ? {
                ...project,
                tasks: project.tasks.map(task =>
                  task.id === taskId ? { ...task, status: newStatus } : task
                ),
              }
            : project
        )
      );
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0d6efd" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {projects.map((project) => (
        <View key={project.id} style={styles.projectContainer}>
          <Text style={styles.projectTitle}>{project.name}</Text>
          <Text style={styles.projectDescription}>{project.description}</Text>
          {project.tasks.map((task) => (
            <View key={task.id} style={styles.taskContainer}>
              <Text style={styles.taskTitle}>{task.title}</Text>
              <Text style={styles.taskAssignedTo}>Assigned to: {getMemberName(task.assignedTo)}</Text>
              <Text style={styles.taskDueDate}>Due Date: {task.dueDate.toDate().toDateString()}</Text>
              <Text style={styles.taskStatus}>Status: {task.status}</Text>
              <CheckBox
                value={task.status === 'completed'}
                onValueChange={() => handleTaskCompletion(project.id, task.id, task.status)}
              />
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F6F8FA',
  },
  projectContainer: {
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  projectTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  projectDescription: {
    fontSize: 16,
    color: '#7E7E7E',
    marginBottom: 10,
  },
  taskContainer: {
    backgroundColor: '#F1F1F1',
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskAssignedTo: {
    fontSize: 16,
    color: '#7E7E7E',
  },
  taskDueDate: {
    fontSize: 14,
    color: '#7E7E7E',
  },
  taskStatus: {
    fontSize: 14,
    color: '#7E7E7E',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F8FA',
  },
});

export default ProjectListScreen;
