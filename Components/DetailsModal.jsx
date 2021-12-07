import React from "react";
import styles from "../styles/DetailsModal.module.scss";

import { AiOutlineClose } from "react-icons/ai";
import { HiSwitchHorizontal } from "react-icons/hi";

function DetailsModal({ pokemon, close }) {
  return pokemon != null ? (
    <div className={styles.modal}>
      <div className={styles.shadow} />
      <div className={styles.container}>
        <AiOutlineClose onClick={close} size="1.5rem" />
        <h1>{pokemon.name}</h1>
        <div className={styles.top}>
          <img src={pokemon.img} alt="Image of a pokemon" />
          <div className={styles.right}>
            <div className={styles.basic}>
              <p>
                Name: <span>{pokemon.name}</span>
              </p>
              <p>
                Weight:
                <span> {Math.round((pokemon.weight / 10) * 100) / 100} kg</span>
              </p>
              <p>
                Height:
                <span> {Math.round((pokemon.height / 10) * 100) / 100} m</span>
              </p>
            </div>

            <div className={styles.extra}>
              <div className={styles.abilities}>
                <p className={styles.title}>Abilities:</p>
                {pokemon.abilities &&
                  pokemon.abilities.map((ability, i) => {
                    return <p key={i}>{ability}</p>;
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default DetailsModal;
