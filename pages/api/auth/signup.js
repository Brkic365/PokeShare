import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const { name, email, password } = req.body;

  const client = await clientPromise;

  const db = client.db("database");

  if (req.method == "POST") {
    // Simple verification

    // Email regex: ^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$

    if (!name || !email || !password)
      return res.status(400).json({ msg: "All fields are required" });

    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: "Password has to be atleast 6 characters long" });

    const exists = await db.collection("users").findOne({ email });

    const newUser = {
      name,
      email,
      password,
    };

    if (exists) {
      return res.status(400).json({ msg: "User already exists " });
    }

    db.collection("users")
      .insertOne(newUser)
      .then((userRes) => {
        return res.json({
          user: {
            id: userRes.insertedId,
            name,
            email,
          },
        });
      });
  } else {
    return res.status(400).json({ msg: "Invalid request method " });
  }
}
