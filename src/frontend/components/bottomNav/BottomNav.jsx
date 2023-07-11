import { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./bottomNav.css";

// import react-icons;
import { RiBookmarkFill } from "react-icons/ri";
import { HiOutlineBookmark } from "react-icons/hi";
import { MdOutlineExplore, MdExplore } from "react-icons/md";
import { AiOutlineHome, AiOutlinePlusCircle, AiFillHome } from "react-icons/ai";

// Importing context
import { UserContext } from "src/frontend/context/user-context";
import { PostContext } from "src/frontend/context/post-context";

export const BottomNav = () => {
  const {
    userState: { user },
  } = useContext(UserContext);

  const { setIsCreatePostModalOpen } = useContext(PostContext);

  return (
    <aside className="bottom-nav">
      <div>
        <NavLink to="/">
          {location.pathname === "/" ? (
            <AiFillHome className="home-bold-icon" />
          ) : (
            <AiOutlineHome className="home-bold-icon" />
          )}
        </NavLink>
      </div>

      <div>
        <NavLink to="/explore">
          {location.pathname === "/explore" ? (
            <MdExplore className="explore-icon" />
          ) : (
            <MdOutlineExplore className="explore-icon" />
          )}
        </NavLink>
      </div>

      {/* Add new post button */}
      <div onClick={() => setIsCreatePostModalOpen(true)}>
        <AiOutlinePlusCircle className="home-bold-icon" />
      </div>

      <div>
        <NavLink to="/bookmark">
          {location.pathname === "/bookmark" ? (
            <RiBookmarkFill />
          ) : (
            <HiOutlineBookmark />
          )}
        </NavLink>
      </div>

      <div className="bottom-nav-avatar">
        <NavLink to="profile">
          <img src={user?.avatarUrl} alt={user?.username} />
        </NavLink>
      </div>
    </aside>
  );
};
