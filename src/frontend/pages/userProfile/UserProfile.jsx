import "./userProfileStyles.css";

import { useContext } from "react";
import { PostContext } from "src/frontend/context/post-context";
import { UserContext } from "src/frontend/context/user-context";

import { ProfileComponent } from "src/frontend/components/profileComponent/ProfileComponent";
import { UserPosts } from "src/frontend/components/userPosts";

export const UserProfile = () => {
  const {
    userState: { userProfile },
  } = useContext(UserContext);

  const {
    state: { posts },
  } = useContext(PostContext);

  const userPosts = posts.filter(
    (post) => post?.username === userProfile.username
  );

  return (
    <>
      <h3 className="page-header"> {userProfile.username}</h3>
      <hr className="post-break-hr" />
      <section className="user-profile-section">
        {/* Profile Details */}
        <ProfileComponent userProfile={userProfile} />

        {/* Users Posts Header */}
        <div className="user-profile-post-header">
          <h3>Posts</h3>
        </div>

        <hr className="post-break-hr" />

        {/* Users Posts  */}
        <UserPosts userPosts={userPosts} userProfile />
      </section>
    </>
  );
};
