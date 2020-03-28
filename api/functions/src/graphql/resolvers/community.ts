import { Post } from "../../typings";
import { addIdToDoc } from "./utils";
import { ApolloError } from "apollo-server-express";
import { firebaseApp } from "../../firebase";

const firestore = firebaseApp.firestore();

export const communityResolvers = {
  async posts(parent: any, args) {
    try {
      const postQuery = await firestore
        .collection(`communities/${parent.id}/posts`)
        .get();

      const posts: Post[] = postQuery.docs.map(addIdToDoc);

      return posts;
    } catch (error) {
      throw new ApolloError(error);
    }
  }
};
