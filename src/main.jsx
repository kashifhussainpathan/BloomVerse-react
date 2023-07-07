import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { makeServer } from "./server";

import App from "./App.jsx";
import { AuthContextProvider } from "./frontend/context/auth-context";
import { PostProvider } from "./frontend/context/post-context";
import { UserProvider } from "./frontend/context/user-context";

// Call make Server
makeServer();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <PostProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </PostProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
