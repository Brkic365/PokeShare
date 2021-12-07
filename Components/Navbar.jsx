import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.scss";

import AuthModal from "./AuthModal";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authActions";

import { motion } from "framer-motion";
import { useRouter } from "next/router";

import { AiOutlineClose } from "react-icons/ai";

function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();

  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const user = useSelector((state) => state.auth.user);
  const likedPokemon = useSelector((state) => state.auth.likedPokemon);

  const [authModalType, setAuthModalType] = useState(null);
  const [searching, setSearching] = useState(false);
  const [search, setSearch] = useState("");

  const searchVariantsText = {
    searching: { opacity: 0, display: "none", y: "200%" },
    notSearching: { opacity: 1, y: 0 },
  };

  const searchVariantsInput = {
    searching: { opacity: 1, y: 0 },
    notSearching: { opacity: 0, display: "none", y: "200%" },
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      router.push({ pathname: "search", query: { term: search } });
    } else if (e.key === "Escape") {
      setSearching(false);
    }
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.nav}>
      <AuthModal type={authModalType} close={() => setAuthModalType(null)} />
      <Link href="/">
        <h2>
          Poke<span>Share</span>
        </h2>
      </Link>
      <div className={styles.links}>
        <motion.p
          animate={searching ? "searching" : "notSearching"}
          variants={searchVariantsText}
          onClick={() => setSearching(true)}
        >
          Search
        </motion.p>
        <motion.div
          className={styles.search}
          animate={searching ? "searching" : "notSearching"}
          variants={searchVariantsInput}
        >
          <input
            placeholder="Search"
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearch(e.target.value)}
          />
          <AiOutlineClose onClick={() => setSearching(false)} />
        </motion.div>

        <Link href="/all">
          <p>All Pokemons</p>
        </Link>
        {!loggedIn ? (
          <>
            {" "}
            <p onClick={() => setAuthModalType("signup")}>Sign Up</p>
            <p onClick={() => setAuthModalType("login")}>Log In</p>
          </>
        ) : (
          <>
            <Link href={`/favourite?term=${likedPokemon}`}>
              <p>{user.name}'s Favourite Pokemon</p>
            </Link>
            <p onClick={logoutUser}>Log Out</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
