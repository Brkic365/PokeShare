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

    const protocol = ctx.req.headers["x-forwarded-proto"] || "http";
    const baseUrl = ctx.req ? `${protocol}://${ctx.req.headers.host}` : "";

    const countRaw = await fetch(baseUrl + "/api/pokemon/getlikes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pokemonID: data.id }),
    });

    let count = 0;

    try {
      count = await countRaw.json();
    } catch {
      count = 0;
    }

    const pokemon = {
      allTime: count.count || 0,
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
