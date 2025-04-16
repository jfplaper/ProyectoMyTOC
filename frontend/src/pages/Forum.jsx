import React from 'react';
import { useThreads } from '../contexts/ThreadsContext';
import { useComments } from '../contexts/CommentsContext';
import LoadingSpinner from "../components/LoadingSpinner";

const Forum = () => {
  const { threads, threadsLoading } = useThreads();
  const { comments, commentsLoading } = useComments();

  if (threadsLoading || commentsLoading) {
    return <LoadingSpinner />
  } else {
    return (
      <>
        <div>
        {threads.map((thread) => (
          <div key={thread.id}>
            <h2>{thread.title}</h2>
            <p>{thread.location}</p>
          </div>
        ))}
        </div>
        <br/>
        <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            <h2>{comment.text}</h2>
            <p>{comment.author.username}</p>
          </div>
        ))}
        </div>
      </>
    );
  }
};

export default Forum;
