import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const { email, password } = req.body;

  const client = await clientPromise;

  const db = client.db("database");

  if (req.method == "POST") {
    // Simple verification

    // Email regex: ^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$

    if (!email || !password)
      return res.status(400).json({ msg: "All fields are required" });

    db.collection("users")
      .findOne({ email })
      .then((user) => {
        if (!user) {
          return res.status(400).json({ msg: "User doesn't exists " });
        }

        if (user.password !== password) {
          return res.status(400).json({ msg: "Invalid password" });
        }

        return res.json({
          likedPokemon: user.likedPokemon,
          user: {
            id: user._id,
            name: user.name,
            email,
          },
        });
      });
  } else {
    return res.status(400).json({ msg: "Invalid request method " });
  }
}
