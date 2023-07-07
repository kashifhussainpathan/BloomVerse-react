import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("token");

  const [loginInput, setLoginInput] = useState({});
  const [signupInput, setSignupInput] = useState({
    avatarUrl:
      "https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-photo-400-205577532.jpg",
    coverUrl:
      "https://i.pinimg.com/originals/db/1b/cd/db1bcdcc64d0e7a4e148ce51744316f4.jpg",
    website: "https://github.com/kashifhussainpathan",
    bio: "Hey! I'm BloomVerse user",
  });

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/auth/signup`, signupInput);
      localStorage.setItem("token", JSON.stringify(data.encodedToken));
      localStorage.setItem("user", JSON.stringify(data.createdUser));
      setLoginInput({
        username: signupInput.username,
        password: signupInput.password,
      });
      loginHandler();
      setSignupInput({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        cnfpassword: "",
      });
      navigate("/");
    } catch (e) {
      console.log(e.response.data);
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/auth/login`, loginInput);
      localStorage.setItem("token", JSON.stringify(data.encodedToken));
      localStorage.setItem("user", JSON.stringify(data.foundUser));

      setLoginInput({ username: "", password: "" });
      navigate("/");
    } catch (error) {
      console.log("Error", error);
    }
  };

  const logoutHandler = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const value = {
    userToken,
    loginInput,
    setLoginInput,
    signupInput,
    setSignupInput,
    signupHandler,
    loginHandler,
    logoutHandler,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
