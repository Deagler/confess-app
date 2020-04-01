import moment from 'moment';
import { firebaseApp } from '../../firebase';
import { Post } from '../../typings';

const firestore = firebaseApp.firestore();
const communitiesCollection = firestore.collection('communities');

async function submitPostForApproval(
  _: any,
  { communityId, channel, title, content, authorAlias }
) {
  // TODO:
  // Pull AuthorId from context.req
  // verify user exists in the community
  // validate channel for the community

  const communityDoc = communitiesCollection.doc(communityId);
  const communityPosts = communityDoc.collection('posts');

  const newPost: Partial<Post> = {
    creationTimestamp: moment().unix(),
    title,
    content,
    channel,
    authorAlias,
    isApproved: false,
    approvalInfo: null,
    totalComments: 0,
    totalLikes: 0,
    likes: [],
    comments: [],
  };
  const newPostRef = communityPosts.doc();
  await newPostRef.set(newPost);

  newPost.id = newPostRef.id;
  return {
    code: 200,
    message: 'Post submitted for approval.',
    success: true,
    post: newPost,
  };
}

export const postMutations = {
  submitPostForApproval,
};
