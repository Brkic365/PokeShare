import clientPromise from "../../../lib/mongodb";
var mongoose = require("mongoose");

export default async function handler(req, res) {
  const { userID, pokemonID, prevLiked } = req.body;

  const client = await clientPromise;

  const db = client.db("database");

  if (req.method == "POST") {
    if (!pokemonID)
      return res.status(400).json({ msg: "Pokemon ID is required" });

    // Update users favourite pokemon
    db.collection("users").update(
      { _id: mongoose.Types.ObjectId(userID) },
      {
        $set: {
          likedPokemon: null,
        },
      }
    );

    // Update number of times the pokemon has been liked
    db.collection("pokemonCounter").update(
      { pokemonID },
      {
        $inc: {
          allTime: -1,
        },
      },
      { upsert: true }
    );

    return res.json({ pokemonID });
  } else {
    return res.status(400).json({ msg: "Invalid request method " });
  }
}
