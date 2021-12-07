import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.scss";

import Grid from "../Components/Grid";
import AuthModal from "../Components/AuthModal";

export default function Home() {
  const [authModalType, setAuthModalType] = useState(null);

  return (
    <div className={styles.home}>
      <Head>
        <title>PokeShare</title>
      </Head>
      <AuthModal type={authModalType} close={() => setAuthModalType(null)} />
      <div className={styles.main}>
        <div className={styles.left}>
          <h1>
            Poke<span>Share</span>
          </h1>
          <p>Share your favourite pokemon with the rest of the world!</p>
          <Link href="/all">
            <button>SEE ALL</button>
          </Link>
        </div>
        <img
          src="/main_graphic.svg"
          alt="Main graphic of a person searching for his favourite pokemon"
        />
        <img
          src="/corner_circle.svg"
          alt="Graphic of a circle in a corner"
          className={styles.cornerCircle}
        />
      </div>
    </div>
  );
}
