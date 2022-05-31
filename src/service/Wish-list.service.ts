import { getDb } from "../gateway/mongo";

// Data Shape
interface Wish {
  name: string;
  type: string;
  isPossible: boolean;
  priority: 1 | 2 | 3;
}

// function to take the connection, it's async function because it's connect to a database
export const getWishesCollection = async () => {
  const db = await getDb();
  return db.collection<Wish>("wishes"); // It's a collection of Wish
};

// Create

export const createWish = async (wish: Wish) => {
  const col = await getWishesCollection();
  if (!wish.isPossible) {
    throw new Error("Wish is not possible");
  }
  const { insertedId } = await col.insertOne(wish); // take the insertedId inside the object
  return insertedId.toString();
};

// getting wishes from the database and put the collection in the array
export const getWishes = async () => {
  const col = await getWishesCollection();
  return col.find().toArray();
};
