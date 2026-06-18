export const ROLES = {
  ADMIN: 'Admin',
  COORDINATOR: 'Coordinator',
  COMPANY: 'Company',
  CANDIDATE: 'Candidate',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

// check if user has a specific role
export function hasRole(roles: Role[] | undefined, role: Role): boolean {
  return (roles ?? []).includes(role);
}

// check if user has any of the specified roles
export function hasAnyRole(
  roles: Role[] | undefined,
  requiredRoles: Role[],
): boolean {
  const userRoles = roles ?? [];
  return requiredRoles.some((role) => hasRole(userRoles, role));
}
