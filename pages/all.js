import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/GridHolder.module.scss";

import Grid from "../Components/Grid";

import { useRouter } from "next/router";

export default function All({ pokemons }) {
  const router = useRouter();

  const [pageArray, setPageArray] = useState(null);

  const generatePageArray = () => {
    const page = parseInt(router.query.page) || 1;

    if (page < 3) {
      setPageArray([1, 2, 3, 4, 5]);
      return;
    }

    const pageArrayTemp = [];

    for (let i = page - 2; i < page + 3; i++) {
      pageArrayTemp.push(i);
    }

    setPageArray(pageArrayTemp);
  };

  useEffect(() => {
    generatePageArray();
  }, [router.query.page]);

  return (
    <div className={styles.container}>
      <h3>All Pokemons</h3>
      <Grid data={pokemons} />
      <div className={styles.pageNumbers}>
        {pageArray &&
          pageArray.map((num) => {
            const page = router.query.page || 1;

            return (
              <Link href={`/all?page=${num}`}>
                <p style={{ opacity: num == page ? 1 : 0.3 }}>{num}</p>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const page = ctx.query.page;

  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page - 1) * 20}`
  );
  const data = await res.json();

  const capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || "";

  const pokemons = await Promise.all(
    data.results.map(async (result) => {
      const pokemonRes = await fetch(result.url);
      const pokemon = await pokemonRes.json();

      const abilities = await Promise.all(
        pokemon.abilities.map((abilityInfo) => abilityInfo.ability.name)
      );

      const protocol = ctx.req.headers["x-forwarded-proto"] || "http";
      const baseUrl = ctx.req ? `${protocol}://${ctx.req.headers.host}` : "";

      const countRaw = await fetch(baseUrl + "/api/pokemon/getlikes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pokemonID: pokemon.id }),
      });

      try {
        const count = await countRaw.json();
      } catch {
        const count = 0;
      }

      const newPokemon = {
        allTime: count.count || 0,
        id: pokemon.id || 0,
        name: capitalize(pokemon.name) || "null",
        height: pokemon.height || 0,
        weight: pokemon.weight || 0,
        abilities,
        img: pokemon.sprites?.other["official-artwork"].front_default || null,
      };

      return newPokemon || null;
    })
  );

  return {
    props: {
      pokemons,
    },
  };
};
