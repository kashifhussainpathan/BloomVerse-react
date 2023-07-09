import { NavLink } from "react-router-dom";
import "./bottomNav.css";

// import react-icons;
import { MdOutlineExplore } from "react-icons/md";
import { HiOutlineBookmark } from "react-icons/hi";
import { AiOutlineHome, AiOutlinePlusCircle } from "react-icons/ai";
import { useContext } from "react";
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
          <AiOutlineHome className="home-bold-icon" />
        </NavLink>
      </div>

      <div>
        <NavLink to="/explore">
          <MdOutlineExplore className="explore-icon" />
        </NavLink>
      </div>

      {/* Add new post button */}
      <div onClick={() => setIsCreatePostModalOpen(true)}>
        {" "}
        <AiOutlinePlusCircle className="home-bold-icon" />{" "}
      </div>

      <div>
        <NavLink to="/bookmark">
          {" "}
          <HiOutlineBookmark />
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
