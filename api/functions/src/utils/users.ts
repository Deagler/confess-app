import { User } from '../typings';

export function fillCriticalFieldsOnUser(userData: User) {
  if (!userData.displayName) {
    userData.displayName = userData.firstName || '#Unknown#';
  }

  return userData;
}
