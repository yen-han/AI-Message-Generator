import clientPromise from "../../lib/database";

const getMessages = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const client = await clientPromise;
      const db = client.db("messages");
      const messages = await db.collection("messages").find({}).toArray();

      res.json(messages);
      resolve();
    } catch (e) {
      console.error(e);
    }
  });
};
export default getMessages;
