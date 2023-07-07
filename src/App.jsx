import "./App.css";
import { useContext } from "react";
import { useLocation } from "react-router-dom";

import { Sidebar } from "./frontend/components/sidebar/Sidebar";
import { RoutesComponent } from "./frontend/components/Routes";
import { RightSidebar } from "./frontend/components/rightAside/RightSidebar";
import { AuthContext } from "./frontend/context/auth-context";
import { Login } from "./frontend/pages/authentication/login/Login";
import { Signup } from "./frontend/pages/authentication/signup/Signup";
import { PostContext } from "./frontend/context/post-context";
import { CreatePostModal } from "./frontend/pages/home/components/createPost/CreatePostModal";

if (import.meta.env.DEV) {
  window.onerror = (event, source, lineno, colno, err) => {
    const ErrorOverlay = customElements.get("vite-error-overlay");
    if (!ErrorOverlay) {
      return;
    }
    const overlay = new ErrorOverlay(err);
    document.body.appendChild(overlay);
  };
}

function App() {
  const { isCreatePostModalOpen } = useContext(PostContext);
  const { userToken } = useContext(AuthContext);
  const location = useLocation();

  if (!userToken) {
    if (location.pathname === "/signup") {
      return <Signup />;
    } else {
      return <Login />;
    }
  }

  return (
    <>
      {isCreatePostModalOpen && <CreatePostModal />}

      <div className="Main-section">
        {/* Sidebar */}
        <section className="sidebar-section">
          {" "}
          <Sidebar />
        </section>

        {/* <hr className="vertical-hr" /> */}

        {/* Routes */}
        <section className="center-section">
          <RoutesComponent />
        </section>

        {/* <hr className="vertical-hr" /> */}

        {/* Right Side */}
        <section className="right-section">
          <RightSidebar />
        </section>
      </div>
    </>
  );
}

export default App;
