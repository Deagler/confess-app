import { UserInputError } from 'apollo-server-express';
import { firebaseApp } from '../../firebase';

const usersCollection = firebaseApp.firestore().collection('users');
/**
 * @param displayName
 * Display name has to be at least 3 characters and can't exceed 24 characters
 * Has to be alphanumeric
 * has to be unique
 * has to contain at least one letter, can not be only integers
 */
export async function validateDisplayName(displayName) {
  const displayNameRemoveSpace = displayName.replace(/ \t\n\r\0\x0B/g, '');
  if (
    !displayNameRemoveSpace ||
    !displayNameRemoveSpace.trim() ||
    !displayNameRemoveSpace.match(/^[0-9a-zA-Z_.-]+$/)
  ) {
    throw new UserInputError('Invalid display name. No whitespace allowed.');
  } else if (!(await IsDisplayNameUnique(displayNameRemoveSpace))) {
    throw new UserInputError('This display name is not available');
  } else if (
    displayNameRemoveSpace.length > 24 ||
    displayNameRemoveSpace.length < 3
  ) {
    throw new UserInputError(
      'Your display name has to be between 3 to 24 characters'
    );
  } else if (!/[a-zA-Z]/.test(displayNameRemoveSpace)) {
    throw new UserInputError(
      'Your display name has to contain at least one letter'
    );
  }
}

async function IsDisplayNameUnique(displayName) {
  const userDocs = await usersCollection
    .where('displayNameId', '==', displayName.toLowerCase())
    .get();
  return userDocs.empty;
}
