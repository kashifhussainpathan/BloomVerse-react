import { useContext } from "react";
import { CreatePost } from "./createPost";
import { PostContext } from "src/frontend/context/post-context";

import { RxCross2 } from "react-icons/rx";

export const CreatePostModal = () => {
  const { setIsCreatePostModalOpen } = useContext(PostContext);

  return (
    <>
      <section className="create-post-modal">
        <div className="create-post-modal-wrapper">
          <CreatePost />

          <RxCross2
            className="create-post-modal-cancel-btn"
            onClick={() => setIsCreatePostModalOpen(false)}
          />
        </div>
      </section>
    </>
  );
};
