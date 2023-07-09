import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import toast from "react-hot-toast";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("token");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [loginInput, setLoginInput] = useState({});
  const [signupInput, setSignupInput] = useState({
    avatarUrl:
      "https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-photo-400-205577532.jpg",
    coverUrl:
      "https://i.pinimg.com/originals/db/1b/cd/db1bcdcc64d0e7a4e148ce51744316f4.jpg",
    website: "https://github.com/kashifhussainpathan",
    bio: "Hey! I'm BloomVerse user",
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

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
      navigate("/");
      setSignupInput({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        cnfpassword: "",
      });
    } catch (e) {
      console.log(e.response.data);
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Logging in...");
    try {
      setIsLoggedIn(true);
      const { data } = await axios.post(`/api/auth/login`, loginInput);
      localStorage.setItem("user", JSON.stringify(data.foundUser));
      setTimeout(() => {
        localStorage.setItem("token", JSON.stringify(data.encodedToken));
        navigate("/");
      }, 1500);

      setLoginInput({ username: "", password: "" });
      toast.update(toastId, {
        type: "success",
        render: "Logged in successfully",
        isLoading: false,
      });
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Error", error);
      toast.update(toastId, {
        type: "error",
        render: "Login failed",
        isLoading: false,
      });
    }
  };

  const logoutHandler = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (theme === "light") {
      toast("Hello Darkness!", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  const value = {
    theme,
    setTheme,
    userToken,
    isLoggedIn,
    loginInput,
    setLoginInput,
    signupInput,
    setSignupInput,
    signupHandler,
    loginHandler,
    logoutHandler,
    toggleTheme,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
