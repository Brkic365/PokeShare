import styles from "../styles/GridHolder.module.scss";

import Grid from "../Components/Grid";

export default function Search({ pokemon }) {
  return (
    <div className={styles.container}>
      <h3>
        {pokemon
          ? `Your favourite pokemon`
          : `You don't have a favourite pokemon yet? What are you waiting for?! Go like your favourite pokemon and come back!`}
      </h3>
      {pokemon && <Grid data={[pokemon]} />}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const term = ctx.query.term;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${term}`);

  const capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || "";

  try {
    const data = await res.json();

    const abilities = await Promise.all(
      data.abilities.map((abilityInfo) => abilityInfo.ability.name)
    );

    const countRaw = await fetch("http://localhost:3000/api/pokemon/getlikes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pokemonID: data.id }),
    });

    const count = await countRaw.json();

    const pokemon = {
      allTime: count.count,
      id: data.id || 0,
      name: capitalize(data.name) || "null",
      height: data.height || 0,
      weight: data.weight || 0,
      abilities,
      img: data.sprites?.other["official-artwork"].front_default || null,
    };

    return {
      props: {
        pokemon,
      },
    };
  } catch {
    return {
      props: {
        pokemon: null,
      },
    };
  }
};