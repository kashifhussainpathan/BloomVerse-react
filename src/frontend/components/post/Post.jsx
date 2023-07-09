/* eslint-disable react/prop-types */
import "./postStyles.css";
import { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "src/frontend/context/auth-context";
import { PostContext } from "src/frontend/context/post-context";
import { UserContext } from "src/frontend/context/user-context";

// Importing React Icons
import { RiBookmarkFill } from "react-icons/ri";
import { FiMoreHorizontal } from "react-icons/fi";
import { BiBookmark, BiEdit, BiComment } from "react-icons/bi";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineShareAlt,
  AiOutlineDelete,
} from "react-icons/ai";

// Importing Functions
import { isFollowingUser } from "src/backend/utils/postUtils";
import { isPostLikedFunc } from "src/backend/utils/postUtils";
import { getUserDetails } from "src/backend/utils/postUtils";
import { formatDate } from "src/backend/utils/postUtils";
import { getUserDetailsForExplore } from "src/backend/utils/postUtils";
import { toast } from "react-hot-toast";

export const Post = ({ post, explore, userProfile, bookmark }) => {
  const [activePost, setActivePost] = useState(false);
  const [showFollowUnfollow, setShowFollowUnfollow] = useState();
  const modalRef = useRef(null);

  const { userToken } = useContext(AuthContext);

  const {
    followHandler,
    unfollowHandler,
    UserProfileHandler,
    userState: { user },
  } = useContext(UserContext);

  const {
    state: { users, bookmarks },
    setEditMode,
    setEditPostId,
    updatedContent,
    setUpdatedContent,
    bookmarkHandler,
    likeHandler,
    dislikeHandler,
    deletePostHandler,
    removeFromBookmarkHandler,
  } = useContext(PostContext);

  const handleEditButtonClick = (post, postId) => {
    setUpdatedContent({
      ...updatedContent,
      content: post.content,
      mediaUrl: post.mediaUrl,
    });
    setEditMode(true);
    setEditPostId(postId);
  };

  const { _id, username, content, mediaUrl, likes, createdAt } = post;

  const isCurrentUser = username === user?.username;

  const isUserFollowed = isFollowingUser(user, username);

  const isPostLiked = isPostLikedFunc(user, likes);

  const userDetails =
    explore || userProfile || bookmark
      ? getUserDetailsForExplore(user, users, username)
      : getUserDetails(user, username);

  // Close the modal when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setActivePost(false);
        setShowFollowUnfollow(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div key={_id} className="post-container">
      <div className="post-header">
        <div className="user-post-details">
          <div className="user-post-details-img-name">
            <img
              src={userDetails?.avatarUrl}
              alt="Avatar"
              className="user-avatar"
            />
            <div className="user-details-on-post">
              {/* For other users */}
              {user?.username !== username && (
                <span className="post-fullname">
                  <Link
                    to="/userProfile"
                    onClick={() => UserProfileHandler(userDetails?._id)}
                  >
                    {userDetails?.firstName} {userDetails?.lastName}
                  </Link>
                </span>
              )}

              {/* For loggedIn user */}
              {user?.username === username && (
                <span className="post-fullname">
                  <Link to="/profile">
                    {userDetails?.firstName} {userDetails?.lastName}
                  </Link>
                </span>
              )}

              <span>@{username}</span>
            </div>
          </div>

          <div className="created-date">
            <span>{formatDate(createdAt)}</span>
          </div>
        </div>

        {/* More Icon */}
        <div className="more-icon">
          {isCurrentUser && (
            <FiMoreHorizontal
              onClick={(e) => {
                e.stopPropagation();
                setActivePost(!activePost);
              }}
            />
          )}

          {!isCurrentUser && (
            <FiMoreHorizontal
              onClick={(e) => {
                e.stopPropagation();
                setShowFollowUnfollow(!showFollowUnfollow);
              }}
            />
          )}

          <div
            ref={modalRef}
            className="edit-delete-buttons"
            style={{ display: !activePost ? "none" : "" }}
          >
            {isCurrentUser && (
              <div onClick={() => handleEditButtonClick(post, _id)}>
                <span>
                  <BiEdit />
                </span>
                <span className="edit">Edit </span>
              </div>
            )}
            {isCurrentUser && (
              <div onClick={() => deletePostHandler(_id, userToken)}>
                <span>
                  <AiOutlineDelete />
                </span>
                <span className="delete"> Delete</span>
              </div>
            )}
          </div>

          <div
            ref={modalRef}
            className="follow-unfollow"
            style={{ display: !showFollowUnfollow ? "none" : "" }}
          >
            {!isCurrentUser && (
              <div
                onClick={() => {
                  if (isUserFollowed) {
                    unfollowHandler(userDetails._id, userToken);
                  } else {
                    followHandler(userDetails._id, userToken);
                  }
                }}
              >
                {isUserFollowed ? "Unfollow" : "Follow"}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="post-content-wrapper">
        <div>
          <p className="content">{content}</p>
        </div>

        <div className="post-image">
          {mediaUrl === "" ? null : <img src={mediaUrl} alt="Post Image" />}
        </div>
      </div>

      {/* Post Buttons */}
      <div className="post-btns">
        {/* Like & Dislike Button */}

        {isPostLiked ? (
          <div className="like-dislike-button">
            <span>
              <AiFillLike onClick={() => dislikeHandler(_id, userToken)} />{" "}
            </span>

            <span>{likes.likeCount} </span>
          </div>
        ) : (
          <div className="like-dislike-button">
            <span>
              {" "}
              <AiOutlineLike
                className="bold-icons"
                onClick={() => likeHandler(_id, userToken)}
              />{" "}
            </span>

            <span>{likes.likeCount} </span>
          </div>
        )}

        {/* Comment button */}
        <BiComment onClick={() => toast.error("Feature coming soon!")} />

        {/* Bookmark & Remove From Bookmark Button */}
        {bookmarks?.includes(_id) ? (
          <RiBookmarkFill
            onClick={() => removeFromBookmarkHandler(_id, userToken)}
          />
        ) : (
          <BiBookmark onClick={() => bookmarkHandler(_id, userToken)} />
        )}

        {/* Share Button */}
        <AiOutlineShareAlt className="bold-icons" />
      </div>
    </div>
  );
};
