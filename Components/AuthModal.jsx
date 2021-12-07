import React, { useState, useEffect } from "react";
import styles from "../styles/AuthModal.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { register, login } from "../redux/actions/authActions";

import { RiErrorWarningFill } from "react-icons/ri";

function AuthModal({ type, close }) {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.error);
  const user = useSelector((state) => state.auth.user);

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Everytime error state changes, we set the message to the current error state message
  // If the id is AUTH_ERROR, meaning that error was caused by auth API call
  useEffect(async () => {
    setErrorMsg(error && error.id === "AUTH_ERROR" ? error.msg : null);
  }, [error]);

  useEffect(async () => {
    close();
    setErrorMsg(null);
    setName(null);
    setEmail(null);
    setPassword(null);
  }, [user]);

  const signup = async () => {
    const newUser = {
      name,
      email,
      password,
    };

    dispatch(register(newUser));
  };

  const loginUser = () => {
    const user = {
      email,
      password,
    };

    dispatch(login(user));
  };

  return type != null ? (
    <div className={styles.modal}>
      <div className={styles.shadow} />
      <div className={styles.container}>
        <h1>{type === "signup" ? "Sign Up" : "Log In"}</h1>
        {errorMsg && (
          <div className={styles.error}>
            <RiErrorWarningFill size="2rem" />
            <p>{errorMsg}</p>
          </div>
        )}

        {type === "signup" && (
          <input
            placeholder="Name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          placeholder="E-mail Address"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={close}>
            CANCEL
          </button>
          <button onClick={type === "signup" ? signup : loginUser}>
            {type === "signup" ? "SIGN UP" : "LOG IN"}
          </button>
        </div>
      </div>
    </div>
  ) : null;
}

export default AuthModal;
