import clientPromise from "../../../lib/mongodb";
var mongoose = require("mongoose");

export default async function handler(req, res) {
  const { pokemonID } = req.body;

  const client = await clientPromise;

  const db = client.db("database");

  if (req.method == "POST") {
    if (!pokemonID) return res.status(400).json({ count: 0 });

    // Get pokemon counter
    const pokemonCount = await db
      .collection("pokemonCounter")
      .findOne({ pokemonID });

    if (pokemonCount) {
      return res.json({ count: pokemonCount.allTime });
    } else {
      return res.json({ count: 0 });
    }
  } else {
    return res.status(400).json({ count: 0 });
  }
}
