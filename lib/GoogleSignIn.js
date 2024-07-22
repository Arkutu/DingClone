import * as Google from 'expo-auth-session/providers/google';
import { useEffect } from 'react';
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import app from '../firebaseConfig'; // Adjust path as necessary

const useGoogleSignIn = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '51521225167-s903tfi7esi7r2tih3qlpdvr6e4bev70.apps.googleusercontent.com',
    redirectUri: makeRedirectUri({
      native: 'r', // Replace with your app's scheme
    }),
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const auth = getAuth(app);
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  return [request, promptAsync];
};

export default useGoogleSignIn;
