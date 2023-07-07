// Importing Css
import "./editProfile.css";

import { useContext, useState } from "react";

import { avatarOptions } from "src/backend/db/avatarOptions";
import { AuthContext } from "src/frontend/context/auth-context";
import { UserContext } from "src/frontend/context/user-context";

// Importing react icons
import { BiCamera } from "react-icons/bi";

// Importing Functions
import { uploadProfileImageFile } from "src/backend/utils/profileUtils";
import { uploadProfileCoverFile } from "src/backend/utils/profileUtils";
import { uploadProfileCoverAndImageFile } from "src/backend/utils/profileUtils";

export const EditProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState();

  const {
    userState: { updatedProfileDetails },
    userDispatch,
    editProfileHandler,
    setIsProfileUpdating,
    setIsCoverUpdatting,
  } = useContext(UserContext);

  const { userToken } = useContext(AuthContext);

  const handleProfileUpdate = () => {
    editProfileHandler(userToken, updatedProfileDetails);
  };

  const handleBioChange = (e) => {
    userDispatch({
      type: "UPDATE_PROFILE_DETAILS",
      payload: { ...updatedProfileDetails, bio: e.target.value },
    });
  };

  const handleWebsiteChange = (e) => {
    userDispatch({
      type: "UPDATE_PROFILE_DETAILS",
      payload: { ...updatedProfileDetails, website: e.target.value },
    });
  };

  const handleProfileImageInput = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setProfileImagePreview(URL?.createObjectURL(file));
  };

  const handleProfileCoverInput = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
    setCoverImagePreview(URL?.createObjectURL(file));
  };

  const handleUpdateButtonClick = () => {
    if (profileImage && coverImage) {
      uploadProfileCoverAndImageFile(
        coverImage,
        profileImage,
        userDispatch,
        userToken,
        updatedProfileDetails,
        setIsProfileUpdating,
        setIsCoverUpdatting,
        editProfileHandler
      );
    } else if (profileImage) {
      uploadProfileImageFile(
        profileImage,
        userDispatch,
        setIsProfileUpdating,
        editProfileHandler,
        userToken,
        updatedProfileDetails
      );
    } else if (coverImage) {
      uploadProfileCoverFile(
        coverImage,
        userDispatch,
        editProfileHandler,
        userToken,
        updatedProfileDetails,
        setIsCoverUpdatting
      );
    } else {
      handleProfileUpdate();
    }
  };

  const handleAvatarOptionsClick = (avatar) => {
    setProfileImage(avatar);
    setProfileImagePreview(avatar);
  };

  return (
    <>
      <section className="edit-profile-section">
        <div className="edit-profile-wrapper">
          {/* Edit Profile */}

          {/* Profile cover */}
          <div className="edit-profile-cover">
            <div className="cover-container">
              {/* profile cover */}
              {coverImagePreview ? (
                <img src={coverImagePreview} alt="" />
              ) : (
                <img src={updatedProfileDetails.coverUrl} alt="coverUrl" />
              )}

              {/* Add profile cover Icon */}
              <div className="add-cover-icon">
                <label htmlFor="coverImg">
                  <BiCamera />
                  <input
                    id="coverImg"
                    type="file"
                    onChange={handleProfileCoverInput}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* profile Image */}

          <div className="edit-profile__img">
            <div className="image-container">
              {/* profile Image */}
              {profileImagePreview ? (
                <img src={profileImagePreview} alt="" />
              ) : (
                <img src={updatedProfileDetails.avatarUrl} alt="profileImg" />
              )}

              {/* Add profile Image Icon */}
              <div className="add-profileImg-icon">
                <label htmlFor="profileImg">
                  <BiCamera />
                  <input
                    id="profileImg"
                    type="file"
                    onChange={handleProfileImageInput}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Avatar Options */}
          <div className="avatar-options-wrapper">
            {avatarOptions.map((avatar, index) => (
              <div key={index} className="avatar-options">
                <img
                  src={avatar}
                  alt="avatar"
                  onClick={() => handleAvatarOptionsClick(avatar)}
                />{" "}
              </div>
            ))}
          </div>

          <div className="edit-profile__bio">
            <input
              type="text"
              value={updatedProfileDetails?.bio}
              onChange={handleBioChange}
            />
          </div>

          <div className="edit-profile__url">
            <input
              type="url"
              value={updatedProfileDetails?.website}
              onChange={handleWebsiteChange}
            />
          </div>

          <div className="edit-profile-btns">
            <button onClick={handleUpdateButtonClick}>Update</button>
            <button
              onClick={() =>
                userDispatch({ type: "PROFILE_EDIT_MODE", payload: false })
              }
            >
              Cancel
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
