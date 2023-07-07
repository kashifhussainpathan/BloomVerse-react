import "./bookmarkStyle.css";

import { Fragment } from "react";
import { useContext, useEffect } from "react";
import { Post } from "src/frontend/components/post/Post";

import { AuthContext } from "src/frontend/context/auth-context";
import { PostContext } from "src/frontend/context/post-context";
import { UserContext } from "src/frontend/context/user-context";

export const Bookmark = () => {
  const {
    state: { posts, bookmarks },
    getBookmarks,
  } = useContext(PostContext);

  const { userToken } = useContext(AuthContext);

  const {
    userState: { user },
  } = useContext(UserContext);

  const bookmarksArray = posts?.filter(({ _id }) => bookmarks.includes(_id));

  useEffect(() => {
    getBookmarks(userToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <h3 className="page-header">Bookmark</h3>
      <hr className="post-break-hr" />
      {bookmarksArray.length > 0 ? (
        bookmarksArray?.map((post) => {
          return (
            <Fragment key={post._id}>
              <Post post={post} bookmark />
              <hr className="post-break-hr" />
            </Fragment>
          );
        })
      ) : (
        <div className="bookmark-empty">Bookmark is empty</div>
      )}
    </>
  );
};
