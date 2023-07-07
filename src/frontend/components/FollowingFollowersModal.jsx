/* eslint-disable react/prop-types */
import { useContext } from "react";
import { UserContext } from "../context/user-context";

// React Icons
import { AiOutlineClose } from "react-icons/ai";
import { Followings } from "../pages/profile/components/Followings";

export const FollowingFollowersModal = ({ userProfile }) => {
  const {
    // userState: { user },
    showFollowers,
    setShowFollowers,
    showFollowing,
    setShowFollowing,
  } = useContext(UserContext);

  const { _id, following, followers } = userProfile || {};

  return (
    <section>
      {(showFollowing || showFollowers) && (
        <section className="following-modal">
          <div
            className="modal-background"
            onClick={() => setShowFollowing(false)}
          ></div>
          <div className="modal-container">
            <div className="modal-body">
              {showFollowing && following?.length > 0
                ? following?.map((userFollowing) => (
                    <Followings key={_id} user={userFollowing} following />
                  ))
                : showFollowing && (
                    <div className="no-following">
                      {" "}
                      You are not following anyone yet.
                    </div>
                  )}

              {showFollowers && followers?.length > 0
                ? followers?.map((userFollowers) => (
                    <Followings
                      key={userFollowers._id}
                      user={userFollowers}
                      followers
                    />
                  ))
                : showFollowers && (
                    <div className="no-following">
                      No one is following you yet.
                    </div>
                  )}
            </div>

            {/* Cross button */}
            <div
              onClick={() => {
                showFollowing
                  ? setShowFollowing(false)
                  : setShowFollowers(false);
              }}
              className="cross-button"
            >
              <AiOutlineClose />
            </div>
          </div>
        </section>
      )}
    </section>
  );
};
