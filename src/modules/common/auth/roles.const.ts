export enum FuturePlayAuthRole {
  User = 'User',
  Admin = 'Admin',
}

export const JWT_NAME = {
  [FuturePlayAuthRole.User]: 'user-token',
  [FuturePlayAuthRole.Admin]: 'admin-token',
}

export const JWT_EXPIRE = {
  [FuturePlayAuthRole.User]: 2 * 24 * 60 * 60,
  [FuturePlayAuthRole.Admin]: 2 * 24 * 60 * 60,
}
