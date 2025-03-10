'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = (WrappedComponent: React.FC) => {
  const AuthenticatedComponent: React.FC = (props) => {
    const { authenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !authenticated) {
        router.push('/login'); // Redirect to login if not authenticated
      }
    }, [authenticated, loading, router]);

    if (loading) return <p>Loading...</p>; // Show a loading state

    return authenticated ? <WrappedComponent {...props} /> : null;
  };

  return AuthenticatedComponent;
};

export default withAuth;
