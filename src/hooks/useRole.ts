'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import { ROLES, hasAnyRole, type Role } from '@/lib/auth0/roles';

export function useRole() {
  const { user, isLoading } = useUser();
  const roles = (user as { roles?: Role[] } | undefined)?.roles ?? [];

  return {
    isLoading,
    roles,
    isAdmin: roles.includes(ROLES.ADMIN),
    isCoordinator: roles.includes(ROLES.COORDINATOR),
    isCompany: roles.includes(ROLES.COMPANY),
    isCandidate: roles.includes(ROLES.CANDIDATE),
    can: (allowedRoles: Role[]) => hasAnyRole(roles, allowedRoles),
  };
}
