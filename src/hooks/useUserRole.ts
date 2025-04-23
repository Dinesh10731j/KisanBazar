
import Cookies from "js-cookie";
type Role = 'admin' | 'farmer' | 'user';
export function UseUserRole(): Role {
  if (typeof window === 'undefined') return 'user';

  const storedRole = Cookies.get('role');
  const validRoles: Role[] = ['admin', 'farmer', 'user'];

  if (validRoles.includes(storedRole as Role)) {
    return storedRole as Role;
  }

  return 'user';
}
