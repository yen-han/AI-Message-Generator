import clientPromise from "../../lib/database";

const deleteMessage = async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("messages");

    const message = await db
      .collection("messages")
      .deleteOne({ id: req.body.id });

    res.json(message);
  } catch (e) {
    console.error(e);
  }
};
export default deleteMessage;
