import React, { createContext, useState, useEffect } from 'react';
import { supabase } from './lib/supabase';

export const OrganizationContext = createContext();

export const OrganizationProvider = ({ children }) => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrganizations = async () => {
      const { data, error } = await supabase.from('organizations').select('*');
      if (error) {
        console.error('Error fetching organizations:', error);
      } else {
        setOrganizations(data);
      }
      setLoading(false);
    };
    fetchOrganizations();
  }, []);

  return (
    <OrganizationContext.Provider value={{ organizations, loading }}>
      {children}
    </OrganizationContext.Provider>
  );
};
