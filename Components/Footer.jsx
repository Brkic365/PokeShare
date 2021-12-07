import React from "react";
import styles from "../styles/Footer.module.scss";

function Footer() {
  return (
    <div className={styles.footer}>
      <p>
        Copyright © 2021 <span>PokeShare.</span> All rights reserved.
      </p>
    </div>
  );
}

export default Footer;
