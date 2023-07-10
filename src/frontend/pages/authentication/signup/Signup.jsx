import "./signupStyles.css";

import { Link } from "react-router-dom";
import { useContext, useState } from "react";

// Importing image
import login from "src/assets/login.svg";
import logo from "src/assets/logo.png";

import { AuthContext } from "src/frontend/context/auth-context";

// Importing React Icons
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { Toaster } from "react-hot-toast";

export const Signup = () => {
  const { createAccountHandler, signupInput, setSignupInput } =
    useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  const signupInputHandler = (e) => {
    const { name, value } = e.target;
    setSignupInput({ ...signupInput, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 2000,
        }}
      />
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
              <img src={login} alt="" />
              <p>A social media for bookworms and quote lovers. 🌱📖</p>
            </div>

            <div className="auth-wrapper">
              <h2 className="auth-heading">Signup</h2>
              <form onSubmit={createAccountHandler}>
                <div className="auth-form-container">
                  <div className="input-text-group pb-1">
                    <label className="pb-05">
                      Firstname<span className="color-text-error">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your first name"
                      name="firstName"
                      value={signupInput.firstName}
                      onChange={signupInputHandler}
                      required
                    />
                  </div>
                  <div className="input-text-group">
                    <label className="">
                      Lastname<span className="color-text-error">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your email address"
                      name="lastName"
                      value={signupInput.lastName}
                      onChange={signupInputHandler}
                      required
                    />
                  </div>

                  <div className="input-text-group">
                    <label className="">
                      Username<span className="color-text-error">*</span>
                    </label>
                    <input
                      type="username"
                      placeholder="Username"
                      name="username"
                      value={signupInput.username}
                      onChange={signupInputHandler}
                      required
                    />
                  </div>

                  <div className="input-text-group">
                    <label className="">
                      Password<span className="color-text-error">*</span>{" "}
                    </label>
                    <div className="password-input-container">
                      {" "}
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        name="password"
                        value={signupInput.password}
                        onChange={signupInputHandler}
                        required
                      />
                      {showPassword ? (
                        <AiOutlineEyeInvisible
                          className="password-toggle-icon"
                          onClick={togglePasswordVisibility}
                        />
                      ) : (
                        <AiOutlineEye
                          className="password-toggle-icon"
                          onClick={togglePasswordVisibility}
                        />
                      )}
                    </div>
                  </div>
                  <div className="input-text-group">
                    <label className="">
                      Confirm password
                      <span className="color-text-error">*</span>{" "}
                    </label>
                    <div className="password-input-container">
                      <input
                        type="password"
                        placeholder="Confirm your password"
                        name="cnfpassword"
                        value={signupInput.cnfpassword}
                        onChange={signupInputHandler}
                        required
                      />
                    </div>
                  </div>
                  <button
                    className="create-new-account-btn button"
                    type={"submit"}
                  >
                    Create new account
                  </button>
                  <div className="create-new-account">
                    <Link to="/login">Already have an account ?</Link>
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
