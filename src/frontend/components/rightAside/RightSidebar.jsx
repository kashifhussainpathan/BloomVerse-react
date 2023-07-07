import "./rightSidebar.css";

import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";

// Importing Context
import { AuthContext } from "src/frontend/context/auth-context";
import { PostContext } from "src/frontend/context/post-context";
import { UserContext } from "src/frontend/context/user-context";

// importing react-icons
import { BiSearch } from "react-icons/bi";

export const RightSidebar = () => {
  const {
    followHandler,
    handleSearchUser,
    showSearchModal,
    setShowSearchModal,
    UserProfileHandler,
    userState: { user, searchedUser },
  } = useContext(UserContext);

  const {
    state: { users },
  } = useContext(PostContext);

  const { userToken } = useContext(AuthContext);

  const handleSearchByUsername = (e) => {
    setShowSearchModal(true);
    handleSearchUser(e.target.value);
  };

  const filteredUser = users?.filter((userInUsers) => {
    const isFollowing = user?.following?.some(
      (userinUserFollowing) =>
        userinUserFollowing.username === userInUsers.username
    );
    return !isFollowing;
  });

  return (
    <>
      <section className="Right-aside-section">
        {/* Search Section */}
        <div className="search-section">
          <div className="search-input-and-searchIcon">
            <input
              type="text"
              placeholder="Search Users..."
              onChange={handleSearchByUsername}
            />

            <BiSearch />
          </div>

          {showSearchModal && (
            <div className="search-users-show">
              {searchedUser.length > 0 ? (
                searchedUser.map(
                  ({ _id, avatarUrl, firstName, lastName, username }) =>
                    username !== user?.username && (
                      <div key={_id} className="searched-users">
                        <img src={avatarUrl} alt={username} />
                        <Link to="/userProfile">
                          <div
                            className="search-user-details"
                            onClick={() => UserProfileHandler(_id)}
                          >
                            <span>
                              {firstName} {lastName}
                            </span>
                            <span>@{username}</span>
                          </div>
                        </Link>
                      </div>
                    )
                )
              ) : (
                <div>No user found by this name..</div>
              )}
            </div>
          )}
        </div>

        <section className="follow-section">
          <h3>Who to follow</h3>
          {/* displaying users */}
          {filteredUser?.map(
            ({ _id, avatarUrl, firstName, lastName, username }) =>
              username !== user?.username ? (
                <Fragment key={_id}>
                  <div className="follow-container">
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
                      <button onClick={() => followHandler(_id, userToken)}>
                        Follow
                      </button>
                    </div>
                  </div>
                  <hr className="hr-below-users-suggestions" />
                </Fragment>
              ) : (
                ""
              )
          )}
        </section>
      </section>
    </>
  );
};
