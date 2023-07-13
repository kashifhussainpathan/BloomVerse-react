import "./feedStyles.css";

import { useContext, Fragment } from "react";

import { PostContext } from "src/frontend/context/post-context";
import { EditPost } from "../editPost/EditPost";
import { UserContext } from "src/frontend/context/user-context";
import { Post } from "src/frontend/components/post/Post";
import { PostLoader } from "src/frontend/components/postLoader/PostLoader";

export const Feed = () => {
  const {
    state: { posts, sortBy },
    dispatch,
    editMode,
    isPosting,
    isEditing,
  } = useContext(PostContext);

  const {
    userState: { user },
  } = useContext(UserContext);

  const isFollowingUser = (username) => {
    return user?.following?.some(
      (userFollowing) => userFollowing?.username === username
    );
  };

  const finalData =
    sortBy === "latest"
      ? [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      : [...posts].sort((a, b) => b.likes.likeCount - a.likes.likeCount);

  return (
    <>
      {/* Create Post */}

      {editMode && <EditPost />}

      {/* Sort Section */}
      <div className="sortby-section">
        <div
          className={sortBy === "latest" && "latest"}
          onClick={() => dispatch({ type: "SORT-BY", payload: "latest" })}
        >
          Latest
        </div>

        <div
          className={sortBy === "trending" && "trending"}
          onClick={() => dispatch({ type: "SORT-BY", payload: "trending" })}
        >
          Trending
        </div>
      </div>

      {/* Posts Section */}
      {!isPosting && !isEditing ? (
        <section className="post-section">
          {finalData.length > 0 ? (
            finalData?.map((post) => {
              const isCurrentUser = post.username === user?.username;
              const isUserFollowed = isFollowingUser(post.username);

              if (isCurrentUser || isUserFollowed) {
                return (
                  <Fragment key={post._id}>
                    <Post post={post} />
                    <hr className="post-break-hr" />
                  </Fragment>
                );
              } else {
                return null;
              }
            })
          ) : (
            <div className="noPost"> Create a post </div>
          )}
        </section>
      ) : (
        <section>
          <PostLoader />
        </section>
      )}
    </>
  );
};
