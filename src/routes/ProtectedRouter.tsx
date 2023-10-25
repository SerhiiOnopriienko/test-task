import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { TStore } from '../types';

export default function ProtectedRouter({
  children,
  redirectTo,
}: {
  children: ReactNode;
  redirectTo: string;
}) {
  const { message } = useSelector((store: TStore) => store.loginReducer);

  if (message !== 'Authentication successful.') {
    return <Navigate to={redirectTo} />;
  }
  return children;
}
