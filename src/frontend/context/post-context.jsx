/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import { PostReducer } from "../reducers/PostReducer";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [createPost, setCreatePost] = useState({
    content: "",
    mediaUrl: "",
  });

  const [updatedContent, setUpdatedContent] = useState({
    content: "",
    mediaUrl: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editPostId, setEditPostId] = useState();
  const [isPosting, setIsPosting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

  const initialState = {
    posts: [],
    bookmarks: [],
    users: [],
    sortBy: "latest",
  };

  const [state, dispatch] = useReducer(PostReducer, initialState);

  const getPosts = async () => {
    try {
      const { data } = await axios.get("/api/posts");
      dispatch({ type: "POSTS_DATA", payload: data.posts });
    } catch (error) {
      console.log(error);
    }
  };

  const likeHandler = async (postId, token) => {
    try {
      const { data } = await axios.post(
        `/api/posts/like/${postId}`,
        {},
        {
          headers: { authorization: token },
        }
      );

      dispatch({ type: "POSTS_DATA", payload: data.posts });
    } catch (error) {
      console.log(error.response);
    }
  };

  const dislikeHandler = async (postId, token) => {
    try {
      const { data } = await axios.post(
        `/api/posts/dislike/${postId}`,
        {},
        {
          headers: { authorization: token },
        }
      );

      dispatch({ type: "POSTS_DATA", payload: data.posts });
    } catch (error) {
      console.log(error.response);
    }
  };

  const bookmarkHandler = async (postId, token) => {
    try {
      const { data } = await axios.post(
        `/api/users/bookmark/${postId}`,
        {},
        {
          headers: { authorization: token },
        }
      );
      dispatch({ type: "BOOKMARK_DATA", payload: data.bookmarks });
    } catch (error) {
      console.log(error);
    }
  };

  const getBookmarks = async (token) => {
    try {
      const { data } = await axios.get("/api/users/bookmark/", {
        headers: { authorization: token },
      });

      dispatch({ type: "BOOKMARK_DATA", payload: data.bookmarks });
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromBookmarkHandler = async (postId, token) => {
    try {
      const { data } = await axios.post(
        `/api/users/remove-bookmark/${postId}`,
        {},
        {
          headers: { authorization: token },
        }
      );
      dispatch({ type: "BOOKMARK_DATA", payload: data.bookmarks });
    } catch (error) {
      console.log(error);
    }
  };

  const createPostHandler = async (post, token) => {
    try {
      const { data } = await axios.post(
        "/api/posts",
        {
          postData: post,
        },
        {
          headers: { authorization: token },
        }
      );

      dispatch({ type: "CREATE_POST", payload: data.posts });
      setCreatePost({ content: "", mediaUrl: "" });
      setIsPosting(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePostHandler = async (postId, token) => {
    try {
      const { data } = await axios.delete(`/api/posts/${postId}`, {
        headers: { authorization: token },
      });

      console.log(data.posts);
      dispatch({ type: "POSTS_DATA", payload: data.posts });
    } catch (error) {
      console.log(error);
    }
  };

  const editPostHandler = async (postId, updatedContent, token) => {
    try {
      const { data } = await axios.post(
        `/api/posts/edit/${postId}`,
        {
          postData: updatedContent,
        },
        {
          headers: { authorization: token },
        }
      );
      dispatch({ type: "EDIT_POST", payload: data.posts });
      setEditMode(false);
      setEditPostId(null);
      setTimeout(() => {
        setIsEditing(false);
      }, 2000);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const value = {
    getPosts,
    state,
    dispatch,
    createPost,
    setCreatePost,
    likeHandler,
    updatedContent,
    editMode,
    setEditMode,
    isPosting,
    setIsPosting,
    isEditing,
    setIsEditing,
    editPostId,
    setEditPostId,
    setUpdatedContent,
    dislikeHandler,
    bookmarkHandler,
    getBookmarks,
    createPostHandler,
    deletePostHandler,
    editPostHandler,
    removeFromBookmarkHandler,
    isCreatePostModalOpen,
    setIsCreatePostModalOpen,
  };
  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
