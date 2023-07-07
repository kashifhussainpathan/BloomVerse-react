import "./profileStyles.css";

import { useContext } from "react";

import { UserContext } from "src/frontend/context/user-context";
import { UserPosts } from "../../components/UserPosts";
import { PostContext } from "src/frontend/context/post-context";
import { EditPost } from "../home/components/editPost/EditPost";
import { AuthContext } from "src/frontend/context/auth-context";
import { EditProfile } from "src/frontend/pages/profile/components/editProfile/EditProfile";
import { ProfileComponent } from "src/frontend/components/profileComponent/ProfileComponent";

import { AiOutlineLogout } from "react-icons/ai";

export const Profile = () => {
  const { logoutHandler } = useContext(AuthContext);

  const {
    userDispatch,
    userState: { user, profileEditMode },
  } = useContext(UserContext);

  const {
    state: { posts },
    editMode,
  } = useContext(PostContext);

  const editProfileButtonHandler = (user) => {
    userDispatch({ type: "PROFILE_ID", payload: user.id });
    userDispatch({ type: "PROFILE_EDIT_MODE", payload: true });
    userDispatch({
      type: "UPDATE_PROFILE_DETAILS",
      payload: {
        bio: user.bio,
        website: user.website,
        avatarUrl: user.avatarUrl,
        coverUrl: user.coverUrl,
      },
    });
  };

  const userPostsData = posts.filter(
    (post) => post?.username === user?.username
  );

  return (
    <>
      {editMode && <EditPost />}
      <div className="profile-header">
        <h3 className="page-header">Profile</h3>{" "}
        <span>
          {" "}
          <AiOutlineLogout onClick={logoutHandler} />
        </span>
      </div>

      <hr className="post-break-hr" />
      {profileEditMode ? <EditProfile /> : ""}
      {/* Profile Details */}
      <ProfileComponent
        profile
        userProfile={user}
        editProfileButtonHandler={editProfileButtonHandler}
      />
      {/* Users Posts */}
      <div className="user-profile-post-header">
        <h3>Posts</h3>
      </div>
      <hr className="post-break-hr" />
      {/* LoggedInUsers Posts */}
      <UserPosts userPosts={userPostsData} />
    </>
  );
};
