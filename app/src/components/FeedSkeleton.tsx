import React from 'react';
import PostSkeleton from './PostSkeleton';

const FeedSkeleton: React.FC<{}> = () => (
  <>
    <PostSkeleton />
    <PostSkeleton />
    <PostSkeleton />
  </>
);

export default FeedSkeleton;
