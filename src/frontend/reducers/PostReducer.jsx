export const PostReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "POSTS_DATA":
      return { ...state, posts: payload };

    case "BOOKMARK_DATA":
      return { ...state, bookmarks: payload };

    case "USERS_DATA":
      return { ...state, users: payload };

    case "CREATE_POST":
      return { ...state, posts: payload };

    case "EDIT_POST":
      return { ...state, posts: payload };

    case "SORT-BY":
      return { ...state, sortBy: payload };

    default:
      throw new Error(`Unknown action type ${type} `);
  }
};
