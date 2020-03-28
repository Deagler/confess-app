import { Post } from "../../typings";
import { addIdToDoc } from "./utils";
import { ApolloError } from "apollo-server-express";
import { firebaseApp } from "../../firebase";

const firestore = firebaseApp.firestore();

export const queryResolvers = {
  async post(_: null, args: { id: string }) {
    try {
      const post = await firestore.doc(`posts/${args.id}`).get();

      return addIdToDoc(post) as Post | undefined;
    } catch (error) {
      throw new ApolloError(error);
    }
  }
};
