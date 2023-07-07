const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/traderkp/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "mypreset";

export const uploadProfileImageFile = async (
  profileImage,
  userDispatch,
  setIsProfileUpdating,
  editProfileHandler,
  userToken,
  updatedProfileDetails
) => {
  try {
    const file = profileImage;
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", "booksgram");

    userDispatch({ type: "PROFILE_EDIT_MODE", payload: false });

    setIsProfileUpdating(true);

    const response = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    await editProfileHandler(userToken, {
      ...updatedProfileDetails,
      avatarUrl: data.url,
    });
  } catch (err) {
    console.error("Error:", err);
  }
};

export const uploadProfileCoverFile = (
  coverImage,
  userDispatch,
  editProfileHandler,
  userToken,
  updatedProfileDetails,
  setIsCoverUpdatting
) => {
  const file = coverImage;
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", "booksgram");

  setIsCoverUpdatting(true);
  userDispatch({ type: "PROFILE_EDIT_MODE", payload: false });

  fetch(CLOUDINARY_URL, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      return editProfileHandler(userToken, {
        ...updatedProfileDetails,
        coverUrl: data.url,
      });
    })
    .catch((err) => console.error("error from catch", err));
};

export const uploadProfileCoverAndImageFile = async (
  coverImage,
  profileImage,
  userDispatch,
  userToken,
  updatedProfileDetails,
  setIsProfileUpdating,
  setIsCoverUpdatting,
  editProfileHandler
) => {
  try {
    const file = coverImage;
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", "booksgram");

    setIsCoverUpdatting(true);

    setIsProfileUpdating(true);

    userDispatch({ type: "PROFILE_EDIT_MODE", payload: false });

    const response = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    const updatedProfileDetailsWithCover = {
      ...updatedProfileDetails,
      coverUrl: data.url,
    };

    await uploadProfileImageFile(
      profileImage,
      userDispatch,
      setIsProfileUpdating,
      editProfileHandler,
      userToken,
      updatedProfileDetailsWithCover
    );
  } catch (err) {
    console.error("error from catch", err);
  }
};
