import "./explore.css";

import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { Post } from "src/frontend/components/post/Post";

import { PostContext } from "src/frontend/context/post-context";
import { UserContext } from "src/frontend/context/user-context";

export const Explore = () => {
  const {
    state: { posts },
    updatedContent,
    setUpdatedContent,
    setEditMode,
    setEditPostId,
  } = useContext(PostContext);

  const {
    userState: { user, searchedUser },
    UserProfileHandler,
    handleSearchUser,
    showSearchModalOnExplore,
    setShowSearchModalOnExplore,
  } = useContext(UserContext);

  const handleEditButtonClick = (content, postId) => {
    setUpdatedContent({ ...updatedContent, content });
    setEditMode(true);
    setEditPostId(postId);
  };

  const isCurrentUser = (post) => user.username === post?.username;

  const handleSearchByUsername = (e) => {
    setShowSearchModalOnExplore(true);
    handleSearchUser(e.target.value);
  };

  return (
    <>
      <div className="explore-page-header">
        <h3 className="page-header">Explore</h3>

        <div className="explore-page-search">
          <input
            type="text"
            placeholder="Search Users..."
            onChange={handleSearchByUsername}
          />

          <div>
            {showSearchModalOnExplore && (
              <div className="explore-search-users-show">
                {searchedUser.length > 0 ? (
                  searchedUser.map(
                    ({ _id, avatarUrl, firstName, lastName, username }) =>
                      username !== user?.username && (
                        <div
                          key={_id}
                          className="searched-users"
                          onClick={() => setShowSearchModalOnExplore(false)}
                        >
                          <img src={avatarUrl} alt={username} />
                          <Link to="/userProfile">
                            <div
                              className="explore-search-user-details"
                              onClick={() => UserProfileHandler(_id)}
                            >
                              <span>
                                {firstName} {lastName}
                              </span>
                              <span>@{username}</span>
                            </div>
                          </Link>
                        </div>
                      )
                  )
                ) : (
                  <div>No user found by this name..</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <hr className="post-break-hr" />
      {posts?.map(
        (post) =>
          !isCurrentUser(post) && (
            <Fragment key={post._id}>
              <Post
                post={post}
                handleEditButtonClick={handleEditButtonClick}
                explore
              />
              <hr className="post-break-hr" />
            </Fragment>
          )
      )}
    </>
  );
};
