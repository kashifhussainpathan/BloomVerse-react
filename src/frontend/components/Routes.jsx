import { Route, Routes } from "react-router-dom";

// Importing Pages and Components
import { Home } from "../pages/home/Home";
import { Bookmark } from "../pages/bookmark/Bookmark";
import { Login } from "../pages/authentication/login/Login";
import { Signup } from "../pages/authentication/signup/Signup";
import { Profile } from "../pages/profile/Profile";
import { Explore } from "../pages/explore/Explore";
import { UserProfile } from "../pages/userProfile/UserProfile";

export const RoutesComponent = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};
