/* eslint-disable react/prop-types */
import { Fragment } from "react";
import { useContext } from "react";
import { AuthContext } from "src/frontend/context/auth-context";
// import { PostContext } from "src/frontend/context/post-context";
import { UserContext } from "src/frontend/context/user-context";

export const Followings = ({ user, followers }) => {
  const { userToken } = useContext(AuthContext);

  const { unfollowHandler } = useContext(UserContext);

  const { _id, avatarUrl, firstName, lastName, username } = user;

  return (
    <>
      {/* displaying followings & followers */}
      <Fragment key={_id}>
        <div className="follow-container m-1">
          <div>
            {/* User-Profile-Avatar */}
            <div>
              <img src={avatarUrl} alt="user-avatar" />{" "}
            </div>
            {/* User's- name and username */}
            <div className="user-name_username">
              <span className="user-name">
                {" "}
                {firstName} {""}
                {lastName}
              </span>
              <span className="user-username">@{username}</span>
            </div>
          </div>
          <div>
            {!followers && (
              <button onClick={() => unfollowHandler(_id, userToken)}>
                Unfollow
              </button>
            )}
          </div>
        </div>
      </Fragment>
    </>
  );
};
