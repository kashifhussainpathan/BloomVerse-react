import "./editPost.css";

import { useContext, useState } from "react";
import { AuthContext } from "src/frontend/context/auth-context";
import { PostContext } from "src/frontend/context/post-context";
import { UserContext } from "src/frontend/context/user-context";

// React Icons
import { BiImageAdd } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineEmojiEmotions } from "react-icons/md";

// Importing Emoji Picker
import EmojiPicker from "emoji-picker-react";
import { toast } from "react-hot-toast";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/traderkp/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "mypreset";

export const EditPost = () => {
  const [choosedPostImage, setChoosedPostImage] = useState();
  const [postImagePreview, setPostImagePreview] = useState();
  const [emojiSectionOpenedInEditing, setEmojiSectionOpenedInEditing] =
    useState(false);

  const {
    setEditMode,
    editPostId,
    setIsEditing,
    editPostHandler,
    updatedContent,
    setUpdatedContent,
  } = useContext(PostContext);

  const { userToken } = useContext(AuthContext);

  const {
    userState: { user },
  } = useContext(UserContext);

  const PostUpdateHandler = () => {
    if (choosedPostImage) {
      uploadPostImageUpdateFile();
    } else if (
      updatedContent?.content === "" &&
      updatedContent?.mediaUrl === ""
    ) {
      toast.error("Write caption or add image.");
    } else {
      editPostHandler(editPostId, updatedContent, userToken);
    }
  };

  const cancelEditHandler = () => {
    setEditMode(false);
  };

  const uploadPostImageUpdateFile = () => {
    const file = choosedPostImage;
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", "booksgram");

    setIsEditing(true);
    setEditMode(false);

    fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        return editPostHandler(
          editPostId,
          {
            ...updatedContent,
            mediaUrl: data.url,
          },
          userToken
        );
      })
      .catch((err) => console.error("error from catch", err));
  };

  const imageInputHandler = (e) => {
    const file = e.target.files[0];
    setChoosedPostImage(file);
    setPostImagePreview(URL?.createObjectURL(file));
  };

  const RemovePostImageClickHandler = () => {
    setChoosedPostImage();
    setUpdatedContent({ ...updatedContent, mediaUrl: "" });
  };

  const EmojiUpdateHandler = (emojiObject, event) => {
    event.stopPropagation();
    setUpdatedContent({
      ...updatedContent,
      content: updatedContent.content + emojiObject.emoji,
    });
  };

  return (
    <section className="edit-post-section">
      <div className="edit-post-wrapper">
        {/* Edit Cancel Buttons */}
        <RxCross2
          onClick={cancelEditHandler}
          className="edit-post__cancel-btn"
        />

        <div className="edit-post-userAvatar-content">
          <img src={user.avatarUrl} alt="userAvatar" />
          <div className="edit-post__content">
            <textarea
              placeholder="What is happening ?"
              value={updatedContent.content}
              onChange={(e) =>
                setUpdatedContent({
                  ...updatedContent,
                  content: e.target.value,
                })
              }
            ></textarea>
          </div>
        </div>

        <div className="edit-post-details-wrapper">
          <div className="edit-post__img-container">
            <div className="edit-post__img">
              {postImagePreview && updatedContent.mediaUrl ? (
                <img src={postImagePreview} alt="postPreview" />
              ) : postImagePreview || updatedContent.mediaUrl ? (
                <img src={postImagePreview || updatedContent.mediaUrl} alt="" />
              ) : null}

              {postImagePreview || updatedContent.mediaUrl ? (
                <RxCross2 onClick={RemovePostImageClickHandler} />
              ) : null}
            </div>
          </div>

          <div className="edit-post__addPostImage">
            <div className="edit-post__addpostImageIcon">
              <label htmlFor="postImage">
                <BiImageAdd />
                <input
                  id="postImage"
                  type="file"
                  onChange={imageInputHandler}
                />
              </label>

              <section className="emojiPicker-section">
                <MdOutlineEmojiEmotions
                  onClick={() =>
                    setEmojiSectionOpenedInEditing(!emojiSectionOpenedInEditing)
                  }
                />
                <section
                  className="emojipicker"
                  style={{
                    display: !emojiSectionOpenedInEditing ? "none" : "",
                  }}
                >
                  <EmojiPicker
                    onEmojiClick={EmojiUpdateHandler}
                    searchDisabled={true}
                    width={350}
                    height={300}
                    size={10}
                    previewConfig={{ showPreview: false }}
                    fontSize=".25rem"
                  />
                </section>
              </section>
            </div>

            <button onClick={PostUpdateHandler}>Update</button>
          </div>
        </div>
      </div>
    </section>
  );
};
