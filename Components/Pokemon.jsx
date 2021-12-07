import React, { useState, useEffect } from "react";
import styles from "../styles/Pokemon.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { like, dislike } from "../redux/actions/authActions";

import { useRouter } from "next/router";

function Pokemon({ pokemon, openDetails }) {
  const dispatch = useDispatch();
  const likedPokemon = useSelector((state) => state.auth.likedPokemon);

  const router = useRouter();

  const [prevLiked, setPrevLiked] = useState(likedPokemon);

  useEffect(() => {
    setPrevLiked(likedPokemon);
  }, [likedPokemon]);

  const likePokemon = (id) => {
    if (id === prevLiked) {
      dispatch(dislike(id));
    } else {
      dispatch(like(id, prevLiked));
    }

    router.replace(router.asPath);
  };

  return (
    <div className={styles.pokemon}>
      <img src={pokemon.img} alt="Image of a pokemon" />
      <h1>{pokemon.name}</h1>
      <div className={styles.allTime}>
        <p>All-time:</p>
        <h5>{pokemon.allTime || 0}</h5>
      </div>
      {/*
        <div className={styles.today}>
          <p>Today:</p>
          <h5>{pokemon.today || 0}</h5>
        </div>
      */}
      <div className={styles.bottom}>
        <button onClick={() => openDetails(pokemon)}>DETAILS</button>
        <svg
          onClick={() => likePokemon(pokemon.id)}
          xmlns="http://www.w3.org/2000/svg"
          width="2rem"
          height="2rem"
          viewBox="0 0 48.192 46.102"
        >
          <path
            id="Path_19"
            dataName="Path 19"
            d="M133.057,83.775l-13.8-2.005-6.167-12.5a1.74,1.74,0,0,0-3.119,0l-6.167,12.5-13.8,2.005a1.738,1.738,0,0,0-.962,2.967l9.982,9.732-2.358,13.742a1.736,1.736,0,0,0,2.521,1.831l12.34-6.488,12.34,6.488a1.738,1.738,0,0,0,2.521-1.831l-2.358-13.742,9.982-9.732a1.741,1.741,0,0,0-.962-2.967Z"
            transform="translate(-87.356 -67.183)"
            fill={pokemon.id === likedPokemon ? "#ffcb05" : "none"}
            stroke="#ffcb05"
            strokeWidth="4"
          />
        </svg>
      </div>
    </div>
  );
}

export default Pokemon;
