import { useContext, useState } from "react";
import { Link } from "react-router-dom";

// Importing css
import "./loginStyles.css";

// Importing image
import login from "src/assets/login.svg";
import logo from "src/assets/logo.png";

// Importing React Icons
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { AuthContext } from "src/frontend/context/auth-context";

export const Login = () => {
  const { loginInput, setLoginInput, loginHandler } = useContext(AuthContext);
  const [showPasswordInLogin, setShowPasswordInLogin] = useState(false);

  const loginInputHandler = (e) => {
    const { name, value } = e.target;
    setLoginInput({ ...loginInput, [name]: value });
  };

  const testCredentialsLogin = () => {
    setLoginInput({
      username: "kashifpathan",
      password: "kashifpathan",
    });
  };

  const togglePasswordVisibilityLogin = () => {
    setShowPasswordInLogin(!showPasswordInLogin);
  };

  return (
    <>
      <section className="auth-container">
        <div className="auth-main-wrapper">
          <div className="auth-header">
            {" "}
            <img src={logo} alt="" />
            <div>
              <h1>BloomVerse </h1>
              <span>The place to grow your reading passion. </span>
            </div>
          </div>

          <div className="auth-section">
            <div className="auth-container__img">
              <img src={login} alt="loginImg" />
              <p>A social media for bookworms and quote lovers. 🌱📖</p>
            </div>

            <div className="auth-wrapper">
              <h2>Login</h2>
              <form onSubmit={loginHandler}>
                <div className="auth-form-container">
                  <div className="input-text-group ">
                    <label>
                      Username<span className="color-text-error">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your username"
                      name="username"
                      value={loginInput.username || ""}
                      onChange={loginInputHandler}
                      required
                    />
                  </div>
                  <div className="input-text-group">
                    <label>
                      Password<span className="color-text-error">*</span>{" "}
                    </label>
                    <div className="password-input-container">
                      <input
                        type={showPasswordInLogin ? "text" : "password"}
                        placeholder="Enter your password"
                        name="password"
                        value={loginInput.password || ""}
                        onChange={loginInputHandler}
                        required
                      />
                      {showPasswordInLogin ? (
                        <AiOutlineEyeInvisible
                          className="password-toggle-icon"
                          onClick={togglePasswordVisibilityLogin}
                        />
                      ) : (
                        <AiOutlineEye
                          className="password-toggle-icon"
                          onClick={togglePasswordVisibilityLogin}
                        />
                      )}
                    </div>
                  </div>
                  <button
                    className="test-credentials-button button"
                    onClick={() => {
                      testCredentialsLogin();
                    }}
                  >
                    Login as guest
                  </button>
                  <button type="submit" className="login-button button">
                    Login
                  </button>
                  <div className="create-new-account">
                    <Link to="/signup">Create new account</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
