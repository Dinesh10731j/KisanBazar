import Cookies from 'js-cookie';

export type Role = 'admin' | 'farmer' | 'user';

export function UseUserRole(): Role {
  if (typeof window === 'undefined') {

    return 'user';
  }

  const storedRole = Cookies.get('role') as Role | undefined;

  if (storedRole === 'admin' || storedRole === 'farmer' || storedRole === 'user') {
    return storedRole;
  } else {
    Cookies.set('role', 'user');
    return 'user';
  }
}
