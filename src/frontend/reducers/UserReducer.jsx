export const UserReducer = (userState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "PROFILE_ID":
      return { ...userState, profileId: payload };

    case "PROFILE_EDIT_MODE":
      return { ...userState, profileEditMode: payload };

    case "UPDATE_PROFILE_DETAILS":
      return {
        ...userState,
        updatedProfileDetails: {
          ...userState.updatedProfileDetails,
          ...payload, // Update both bio and website properties
        },
      };
    case "FOLLOW":
      return {
        ...userState,
        user: payload,
      };
    case "UNFOLLOW":
      return {
        ...userState,
        user: payload,
      };

    case "SET-USER":
      return {
        ...userState,
        user: payload,
      };
    case "SEARCHED_USERS":
      return { ...userState, searchedUser: payload };

    case "INDIVIDUAL_USER":
      return { ...userState, userProfile: payload };

    default:
      throw new Error(`Unknown action type ${type} `);
  }
};
