import React, { useState, useEffect } from "react";
import styles from "../styles/AuthModal.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../redux/actions/errorActions";

import { RiErrorWarningFill } from "react-icons/ri";

function ErrorModal() {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.error);

  const [errorMsg, setErrorMsg] = useState(null);

  // Everytime error state changes, we set the message to the current error state message
  // If the id is POKEMON_ERROR, meaning that error was caused by pokemon API call
  useEffect(async () => {
    setErrorMsg(error && error.id === "POKEMON_ERROR" ? error.msg : null);
  }, [error]);

  useEffect(() => {
    if (errorMsg) {
      const timeout = setTimeout(() => {
        setErrorMsg(null);
        dispatch(clearErrors());
      }, 2000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [errorMsg]);

  return errorMsg ? (
    <div className={styles.modal}>
      <div className={styles.shadow} />
      <div className={styles.container}>
        <div
          className={styles.error}
          style={{ backgroundColor: "white", color: "rgb(255, 65, 65)" }}
        >
          <RiErrorWarningFill size="2rem" />
          <p>{errorMsg}</p>
        </div>
      </div>
    </div>
  ) : null;
}

export default ErrorModal;
