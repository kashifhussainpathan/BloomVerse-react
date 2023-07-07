export const getUserDetails = (user, username) => {
  const details = user?.following?.find(
    (userFollowing) => userFollowing?.username === username
  );
  return details || user;
};

export const getUserDetailsForExplore = (user, users, username) => {
  if (user.username === username) {
    return user;
  }

  const details = users?.find(
    (userFollowing) => userFollowing?.username === username
  );
  return details;
};

export const isFollowingUser = (user, username) => {
  return user?.following?.some(
    (userFollowing) => userFollowing?.username === username
  );
};

export const isPostLikedFunc = (user, likes) => {
  return (
    likes?.likedBy?.filter(({ username }) => username === user?.username)
      ?.length !== 0
  );
};

export const formatDate = (date) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date ? new Date(date).toLocaleDateString(undefined, options) : "";
};

// export const getUserId = (users, username) =>
//   users?.find((userFollowing) => userFollowing?.username === username)?._id;
