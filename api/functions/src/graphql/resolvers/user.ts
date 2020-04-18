import { Community, User } from '../../typings';
import { addIdToDoc } from './utils';

export const userResolvers = {
  async community(parent: User, args) {
    if (!parent.communityRef) {
      return null;
    }

    return addIdToDoc(await parent.communityRef.get()) as Community | undefined;
  },
  async displayName(parent: User) {
    if (!parent.displayName) {
      return parent['firstName'] || '#Unknown#';
    }

    return parent.displayName;
  },
};
