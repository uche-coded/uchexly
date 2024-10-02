import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function Logout() {
  const { onLogout } = useAuth();

  useEffect(() => {
    onLogout!();
  }, []);
}
