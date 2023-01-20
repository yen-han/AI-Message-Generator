import clientPromise from "../../lib/database";

const save = async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("messages");
    const message = await db.collection("messages").insertOne(req.body);
    res.json(message);
  } catch (e) {
    console.error(e);
  }
};
export default save;
