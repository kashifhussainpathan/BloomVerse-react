import "./postLoader.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const PostLoader = () => {
  return (
    <section className="post-loader-section">
      <div className="post-loader-user-details">
        <div className="post--loader-user">
          <div>
            <Skeleton count={1} circle width={50} height={50} />
          </div>

          <div>
            <Skeleton width={100} count={1} />
            <Skeleton width={80} count={1} />
          </div>
        </div>

        <div>
          <Skeleton width={10} count={1} />
        </div>
      </div>

      <div className="post-loader-content-wrapper">
        <div>
          <Skeleton count={1} />
        </div>

        <div>
          <Skeleton count={1} height={300} />
        </div>
      </div>

      <div className="post-loader-btns">
        <Skeleton count={1} width={25} height={20} />
        <Skeleton count={1} width={25} height={20} />
        <Skeleton count={1} width={25} height={20} />
      </div>
    </section>
  );
};
