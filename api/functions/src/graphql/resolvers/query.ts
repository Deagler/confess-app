import { Post } from "../schema";

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
