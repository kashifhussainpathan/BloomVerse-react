/* eslint-disable react/prop-types */
import { Fragment } from "react";
import { Post } from "./post/Post";

export const UserPosts = ({ userPosts, userProfile }) => {
  return (
    <>
      <div>
        {userPosts.length > 0 ? (
          userPosts?.map((post) => {
            return (
              <Fragment key={post?._id}>
                <Post post={post} userProfile={userProfile} />
                <hr className="post-break-hr" />
              </Fragment>
            );
          })
        ) : (
          <div className="noPost"> Create a post </div>
        )}
      </div>
    </>
  );
};
