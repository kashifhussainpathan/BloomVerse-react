import { useContext } from "react";
import "./postLoader.css";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AuthContext } from "src/frontend/context/auth-context";

export const PostLoader = () => {
  const { theme } = useContext(AuthContext);

  return (
    <SkeletonTheme
      baseColor={theme === "light" ? "#ebebeb" : "#333"}
      highlightColor={theme === "light" ? "#f5f5f5" : "#202020"}
      enableAnimation="true"
    >
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
    </SkeletonTheme>
  );
};
