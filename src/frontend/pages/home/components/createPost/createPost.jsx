import "./createPostStyle.css";

import { useContext, useState } from "react";

import { AuthContext } from "src/frontend/context/auth-context";
import { PostContext } from "src/frontend/context/post-context";
import { UserContext } from "src/frontend/context/user-context";

// Importing react icons
import { BiImageAdd } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineEmojiEmotions } from "react-icons/md";

// Importing Emoji Picker
import EmojiPicker from "emoji-picker-react";

// Import hot toast
import toast from "react-hot-toast";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/traderkp/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "mypreset";

export const CreatePost = () => {
  const { userToken } = useContext(AuthContext);

  const [imageInput, setImageInput] = useState();
  const [imagePreview, setImagePreview] = useState();
  const [emojiSectionOpened, setEmojiSectionOpened] = useState(false);

  const {
    createPostHandler,
    createPost,
    setCreatePost,
    setIsPosting,
    setIsCreatePostModalOpen,
  } = useContext(PostContext);

  const {
    userState: { user },
  } = useContext(UserContext);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCreatePost({ ...createPost, [name]: [value] });
  };

  const handleImageInput = (e) => {
    e.stopPropagation();
    const file = e.target.files[0];
    setImageInput(file);
    if (file) {
      setImagePreview(URL?.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };
  const uploadPostImageFile = () => {
    setIsPosting(true);
    const formData = new FormData();

    formData.append("file", imageInput);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", "booksgram");

    setImagePreview();
    setImageInput();

    fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        createPostHandler({ ...createPost, mediaUrl: data.url }, userToken);
      })
      .catch((err) => console.error("error from catch", err));

    setCreatePost({ content: "", mediaUrl: "" });
  };

  const postButtonClickHandler = () => {
    setIsCreatePostModalOpen(false);
    if (imageInput) {
      uploadPostImageFile();
    } else if (createPost.content === "") {
      toast.error("Write caption or add image.");
    } else {
      createPostHandler(createPost, userToken);
    }
  };

  const cancelImagePreviewHandler = () => {
    setImagePreview();
    setImageInput();
  };

  const handleEmojiClick = (emojiObject, event) => {
    event.stopPropagation();
    setCreatePost({
      ...createPost,
      content: createPost.content + emojiObject.emoji,
    });
  };

  return (
    <>
      <section className="create-post-section">
        <div className="create-post__avatar">
          <img src={user?.avatarUrl} alt="" />
        </div>

        <div className="create-post-input-section">
          <div className="create-post__textarea">
            <textarea
              type="text"
              name="content"
              placeholder="What is happening?"
              onChange={handleInput}
              value={createPost.content}
            />
          </div>

          <div className="image_input__preview__wrapper">
            <div className="image">
              {imagePreview && (
                <div>
                  {" "}
                  <img
                    src={imagePreview}
                    alt=""
                    className="image_input__preview"
                  />
                  <RxCross2 onClick={cancelImagePreviewHandler} />
                </div>
              )}
            </div>
          </div>

          <section className="input-img-emoji-btn-wrapper">
            <div className="create-post__input">
              <label htmlFor="media" className="create-post__label">
                <BiImageAdd className="create-post__icon" />
                <input
                  id="media"
                  type="file"
                  name="media"
                  accept="image/*"
                  onChange={handleImageInput}
                  className="create-post__file-input"
                  key={imageInput ? imageInput.name : "input-key"}
                />
              </label>

              <section className="emojiPicker-section">
                <MdOutlineEmojiEmotions
                  onClick={() => setEmojiSectionOpened(!emojiSectionOpened)}
                />
                <section
                  className="emojipicker"
                  style={{ display: !emojiSectionOpened ? "none" : "" }}
                >
                  <EmojiPicker
                    onEmojiClick={handleEmojiClick}
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

            <div>
              <button onClick={postButtonClickHandler}>Post</button>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};
