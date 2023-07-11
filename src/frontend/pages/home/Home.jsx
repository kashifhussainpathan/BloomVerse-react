import { CreatePost } from "./components/createPost/createPost";
import { Feed } from "./components/feed/Feed";

export const Home = () => {
  return (
    <>
      <h3 className="page-header">Home</h3>

      <hr className="post-break-hr" />

      <div className="create-post">
        <CreatePost />
      </div>

      <div className="section-break" />

      <Feed />
    </>
  );
};
