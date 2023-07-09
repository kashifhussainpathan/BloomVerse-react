import "./App.css";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { Sidebar } from "./frontend/components/sidebar/Sidebar";
import { RoutesComponent } from "./frontend/components/Routes";
import { AuthContext } from "./frontend/context/auth-context";
import { PostContext } from "./frontend/context/post-context";
import { Login } from "./frontend/pages/authentication/login/Login";
import { Signup } from "./frontend/pages/authentication/signup/Signup";
import { RightSidebar } from "./frontend/components/rightAside/RightSidebar";
import { CreatePostModal } from "./frontend/pages/home/components/createPost/CreatePostModal";
import { BottomNav } from "./frontend/components/bottomNav/BottomNav";

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
  const { userToken, theme, isLoggedIn } = useContext(AuthContext);
  const location = useLocation();

  if (!userToken) {
    if (location.pathname === "/signup") {
      return <Signup />;
    } else {
      return <Login />;
    }
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    document.body.classList.toggle("dark-theme", theme === "dark");
  }, [theme]);

  return (
    <>
      {!isLoggedIn && (
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 2000,
          }}
        />
      )}
      {isCreatePostModalOpen && <CreatePostModal />}

      <div className="Main-section">
        {/* Sidebar */}
        <section className="sidebar-section">
          {" "}
          <Sidebar />
        </section>

        {/* Routes */}
        <section className="center-section">
          <RoutesComponent />
          {userToken && <BottomNav />}
        </section>

        {/* Right Side */}
        <section className="right-section">
          <RightSidebar />
        </section>
      </div>
    </>
  );
}

export default App;
