import { User } from '../typings';

export function fillCriticalFieldsOnUser(userData: User) {
  if (!userData.displayName) {
    userData.displayName = '#Unknown#';
  }

  return userData;
}
