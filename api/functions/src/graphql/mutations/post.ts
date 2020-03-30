import admin from 'firebase-admin';
import moment from 'moment';
import { firebaseApp } from '../../firebase';
import { Post } from '../../typings';

const firestore = firebaseApp.firestore();
const communitiesCollection = firestore.collection('communities');

async function submitPostForApproval(
  _: any,
  { communityId, channel, title, content, authorName }
) {
  // TODO:
  // Pull AuthorId from context.req
  // verify user exists in the community
  // validate channel for the community

  const communityDoc = communitiesCollection.doc(communityId);

  const communityPosts = communityDoc.collection('posts');

  const newPost: Partial<Post> = {
    creationTimestamp: moment().unix(),
    authorId: '<unknown>', // 2 be added once auth exists.
    title,
    content,
    channel,
    authorName,
    isApproved: false,
    approvalInfo: null,
    totalComments: 0,
    totalLikes: 0,
    likedByIds: [],
    comments: [],
  };
  const newPostRef = communityPosts.doc();

  const batch = firestore.batch();
  batch.set(newPostRef, newPost);
  batch.update(communityDoc, {
    unapprovedPosts: admin.firestore.FieldValue.arrayUnion(newPostRef),
  });
  await batch.commit();

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
