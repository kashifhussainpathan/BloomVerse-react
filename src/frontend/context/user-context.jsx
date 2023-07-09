/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { PostContext } from "./post-context";
import { UserReducer } from "../reducers/UserReducer";
import { AuthContext } from "./auth-context";

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [isProfileUpdatting, setIsProfileUpdating] = useState(false);
  const [isCoverUpdatting, setIsCoverUpdatting] = useState(false);
  const [showSearchModalOnExplore, setShowSearchModalOnExplore] =
    useState(false);

  const initialState = {
    updatedProfileDetails: {
      bio: "",
      website: "",
      avatarUrl: "",
      coverUrl: "",
    },
    profileEditMode: false,
    profileId: "",
    searchedUser: [],
    userProfile: {},
    user: "",
  };

  const {
    state: { users },
    dispatch,
  } = useContext(PostContext);

  const { userToken } = useContext(AuthContext);

  const loggedInUser = JSON.parse(localStorage?.getItem("user"));

  const [userState, userDispatch] = useReducer(UserReducer, initialState);

  const getUsers = async () => {
    try {
      const { data } = await axios.get("/api/users");
      dispatch({ type: "USERS_DATA", payload: data.users });
    } catch (error) {
      console.log(error);
    }
  };

  const followHandler = async (followUserId, token) => {
    try {
      const { data } = await axios.post(
        `/api/users/follow/${followUserId}`,
        {},
        {
          headers: { authorization: token },
        }
      );

      userDispatch({ type: "FOLLOW", payload: data.user });
    } catch (error) {
      console.log(error.response);
    }
  };

  const unfollowHandler = async (unfollowUserId, token) => {
    try {
      const { data } = await axios.post(
        `/api/users/unfollow/${unfollowUserId}`,
        {},
        {
          headers: { authorization: token },
        }
      );

      userDispatch({ type: "UNFOLLOW", payload: data.user });
    } catch (error) {
      console.log(error.response);
    }
  };

  const editProfileHandler = async (token, profileDetails) => {
    try {
      const { data } = await axios.post(
        "/api/users/edit",
        {
          userData: profileDetails,
        },
        {
          headers: { authorization: token },
        }
      );

      setIsProfileUpdating(false);
      setIsCoverUpdatting(false);
      userDispatch({ type: "SET-USER", payload: data.user });
      userDispatch({ type: "UPDATE_PROFILE_DETAILS", payload: "" });
      userDispatch({ type: "PROFILE_EDIT_MODE", payload: false });
    } catch (error) {
      console.log(error);
    }
  };

  const UserProfileHandler = async (userId) => {
    try {
      const { data } = await axios.get(`/api/users/${userId}`);
      userDispatch({ type: "INDIVIDUAL_USER", payload: data.user });
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSearchUser = (userToFind) => {
    userToFind = userToFind.trim();
    if (userToFind !== "") {
      const searchedUser = users.filter(({ username }) =>
        username.toLowerCase().includes(userToFind.toLowerCase())
      );
      userDispatch({ type: "SEARCHED_USERS", payload: searchedUser });
    } else {
      setShowSearchModal(false);
      setShowSearchModalOnExplore(false);
    }
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState.user]);

  useEffect(() => {
    userDispatch({ type: "SET-USER", payload: loggedInUser });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userToken]);

  useEffect(() => {
    UserProfileHandler(userState?.userProfile?._id);
  }, [userState?.user]);

  const value = {
    getUsers,
    userState,
    loggedInUser,
    userDispatch,
    followHandler,
    unfollowHandler,
    handleSearchUser,
    editProfileHandler,
    showSearchModal,
    setShowSearchModal,
    UserProfileHandler,
    showFollowers,
    setShowFollowers,
    showFollowing,
    setShowFollowing,
    isProfileUpdatting,
    setIsProfileUpdating,
    isCoverUpdatting,
    setIsCoverUpdatting,
    showSearchModalOnExplore,
    setShowSearchModalOnExplore,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
