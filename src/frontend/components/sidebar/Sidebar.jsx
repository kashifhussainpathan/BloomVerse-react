import "./sidebarStyles.css";
import { useContext, useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { UserContext } from "src/frontend/context/user-context";
import { AuthContext } from "src/frontend/context/auth-context";
import { PostContext } from "src/frontend/context/post-context";

// Importing React Icons
// import { CiLight } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import {
  MdOutlineExplore,
  MdOutlineDarkMode,
  MdOutlineWbSunny,
} from "react-icons/md";
import { HiOutlineBookmark } from "react-icons/hi";
import { AiOutlineHome, AiOutlinePlusCircle } from "react-icons/ai";

export const Sidebar = () => {
  const [userBottomModal, setUserBottomModal] = useState(false);
  const userBottomModalRef = useRef(null);

  const { setIsCreatePostModalOpen } = useContext(PostContext);

  const { logoutHandler, theme, toggleTheme } = useContext(AuthContext);

  const {
    userState: { user },
  } = useContext(UserContext);

  const activeNavLink = ({ isActive }) => {
    return isActive ? "aside-nav-link nav-link-active" : "aside-nav-link";
  };

  const showhideUserBottomModalHandler = () => {
    setUserBottomModal(!userBottomModal);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        userBottomModalRef.current &&
        !userBottomModalRef.current.contains(event.target)
      ) {
        setUserBottomModal(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <aside className="sidebar-container">
        <div className="sidebar-wrapper">
          {/* app logo */}
          <div className="logo">
            <img
              src="https://bookish-kp.vercel.app/static/media/logo.508d857b57084282a17d.png"
              alt=""
            />{" "}
            <h3> BloomVerse </h3>
          </div>

          {/* nav-items */}
          <section className="aside-nav">
            <div>
              <NavLink to="/" className={activeNavLink}>
                <AiOutlineHome className="home-bold-icon" />{" "}
                <span className="aside-nav-item-name"> Home</span>
              </NavLink>
            </div>

            <div>
              <NavLink to="/explore" className={activeNavLink}>
                <MdOutlineExplore className="explore-icon" />{" "}
                <span className="aside-nav-item-name"> Explore</span>{" "}
              </NavLink>
            </div>

            <div>
              <NavLink to="profile" className={activeNavLink}>
                {" "}
                <CgProfile className="profile-icon" />{" "}
                <span className="aside-nav-item-name">Profile </span>
              </NavLink>
            </div>

            <div>
              <NavLink to="/bookmark" className={activeNavLink}>
                {" "}
                <HiOutlineBookmark />
                <span className="aside-nav-item-name">Bookmark </span>
              </NavLink>
            </div>

            {/* theme modes */}
            {theme === "light" && (
              <div onClick={toggleTheme} value="dark" className="theme-toggle">
                <span>
                  <MdOutlineDarkMode />{" "}
                </span>
                <span className="aside-nav-item-name">Dark Mode </span>
              </div>
            )}
            {theme === "dark" && (
              <div onClick={toggleTheme} value="dark" className="theme-toggle">
                <span>
                  {" "}
                  <MdOutlineWbSunny />{" "}
                </span>
                <span className="aside-nav-item-name">Light Mode </span>
              </div>
            )}

            {/* Add new post button */}
            <div
              className="new-post"
              onClick={() => setIsCreatePostModalOpen(true)}
            >
              {" "}
              <span>
                <AiOutlinePlusCircle />{" "}
              </span>{" "}
              <span className="aside-nav-item-name">New Post</span>
            </div>
          </section>
        </div>

        {/* Showing profile on the bottom of sidebar */}
        <div
          className="user-bottom"
          ref={userBottomModalRef}
          onClick={showhideUserBottomModalHandler}
        >
          <img src={user?.avatarUrl} alt={user?.username} />
          <div className="user-details-bottom">
            <span className="aside-nav-item-name">
              {user?.firstName &&
                user.firstName.charAt(0).toUpperCase() +
                  user.firstName.slice(1)}{" "}
              {user?.lastName &&
                user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}
            </span>

            <span className="aside-nav-item-name">@{user?.username}</span>
          </div>

          {/* Logout Button */}
          {userBottomModal && (
            <div className="user-bottom-modal">
              <div onClick={logoutHandler}>
                <div>Logout</div> @{user?.username}
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
