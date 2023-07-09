/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext } from "react";
import { UserContext } from "src/frontend/context/user-context";
import { FollowingFollowersModal } from "../FollowingFollowersModal";

// Importing React Icons
import { LuCalendarDays } from "react-icons/lu";
import { BsLink } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi2";
import { AuthContext } from "src/frontend/context/auth-context";

export const ProfileComponent = ({
  profile,
  userProfile,
  editProfileButtonHandler,
}) => {
  const {
    bio,
    website,
    firstName,
    lastName,
    avatarUrl,
    username,
    coverUrl,
    createdAt,
    following,
    followers,
  } = userProfile || {};

  const { userToken } = useContext(AuthContext);

  const {
    userState: { user },
    followHandler,
    unfollowHandler,
    setShowFollowers,
    setShowFollowing,
    isProfileUpdatting,
    isCoverUpdatting,
  } = useContext(UserContext);

  function formatDate(date) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date ? new Date(date).toLocaleDateString(undefined, options) : "";
  }

  const isUserFollowedByLoggedInUser = user?.following?.find(
    (userDetails) => userDetails?._id === userProfile._id
  );

  return (
    <>
      <div className="user-profile-wrapper">
        {/* Cover Image */}
        <div className="user-profile__cover_img">
          <div className="user-profile-cover">
            {/* cover image */}

            {isCoverUpdatting ? (
              <img
                src="https://www.icegif.com/wp-content/uploads/loading-icegif-1.gif"
                alt="loading..."
              />
            ) : (
              <img src={coverUrl} alt="cover image" />
            )}
          </div>
        </div>

        {/* profile Image */}
        <div className="user-profile-img">
          <div>
            {isProfileUpdatting ? (
              <img
                src="https://www.icegif.com/wp-content/uploads/loading-icegif-1.gif"
                alt="loading..."
              />
            ) : (
              <img src={avatarUrl} alt="" />
            )}
          </div>

          {profile || user?.username === userProfile.username ? (
            <div>
              <button onClick={() => editProfileButtonHandler(userProfile)}>
                Edit Profile
              </button>{" "}
            </div>
          ) : (
            <div>
              {isUserFollowedByLoggedInUser ? (
                <button
                  onClick={() => unfollowHandler(userProfile?._id, userToken)}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() => followHandler(userProfile?._id, userToken)}
                >
                  Follow
                </button>
              )}
            </div>
          )}
        </div>

        {/* Profile Details */}
        <div className="user-profile-details-wrapper">
          <h3>
            {" "}
            {firstName} {lastName}{" "}
          </h3>
          <p className="user-profile__username"> @{username}</p>
          <p className="user-profile__bio">{bio}</p>
          <a href={website} target="black">
            <BsLink /> {website}
          </a>
          <p className="user-profile__createdDate">
            <LuCalendarDays /> Joined {formatDate(createdAt)}
          </p>

          {/* user-profile-following-followers */}
          <div className="user-profile__following_followers">
            <HiOutlineUsers />
            <div onClick={() => setShowFollowing(true)}>
              {" "}
              <span>{following?.length} </span> Following{" "}
            </div>
            <div onClick={() => setShowFollowers(true)}>
              {" "}
              <span>{followers?.length} </span> Followers{" "}
            </div>
          </div>
        </div>

        {/* To show following and followers on profile of user*/}
        <FollowingFollowersModal userProfile={userProfile} />
      </div>
    </>
  );
};
