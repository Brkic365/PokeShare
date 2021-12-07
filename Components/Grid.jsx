import React, { useState } from "react";
import styles from "../styles/Grid.module.scss";

import Pokemon from "./Pokemon";
import DetailsModal from "./DetailsModal";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import ErrorModal from "./ErrorModal";

function Grid({ data }) {
  const [pokemonDetails, setPokemonDetails] = useState(null);

  return (
    <div className={styles.grid}>
      <DetailsModal
        pokemon={pokemonDetails}
        close={() => setPokemonDetails(null)}
      />
      <ErrorModal />
      <SimpleBar style={{ maxHeight: "100%" }}>
        <div className={styles.pokemons}>
          {data &&
            data.map((pokemon) => {
              return (
                <Pokemon
                  key={pokemon.id}
                  pokemon={pokemon}
                  openDetails={(data) => setPokemonDetails(data)}
                />
              );
            })}
        </div>
      </SimpleBar>
    </div>
  );
}

export default Grid;
