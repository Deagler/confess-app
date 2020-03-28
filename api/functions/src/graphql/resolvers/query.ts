import { Post, Community } from "../../typings";
import { addIdToDoc } from "./utils";
import { ApolloError } from "apollo-server-express";
import { firebaseApp } from "../../firebase";

const firestore = firebaseApp.firestore();

export const queryResolvers = {
  async post(_: null, args: { communityId: string; postId: string }) {
    try {
      const post = await firestore
        .doc(`communities/${args.communityId}/posts/${args.postId}`)
        .get();

      return addIdToDoc(post) as Post | undefined;
    } catch (error) {
      throw new ApolloError(error);
    }
  },
  async community(_: null, args: { id: string }) {
    try {
      const community = await firestore.doc(`communities/${args.id}`).get();

      return addIdToDoc(community) as Community | undefined;
    } catch (error) {
      throw new ApolloError(error);
    }
  }
};
