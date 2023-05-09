import {
  collection,
  query,
  getDocs,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "../../../firebase/firebaseConfig";

export default async function handler(req, res) {
  // QUERY que obtiene todos las ventas
  const q = query(collection(firestore, "sales"));

  // ejecuto la QUERY
  const querySnap = await getDocs(q);

  // Devuelvo todos las ventas con su respectivo Id.
  onSnapshot(q, (querySnap) => {
    const { docs } = querySnap;

    const allSales = docs.map((doc) => {
      const data = doc.data();
      const id = doc.id;
      return {
        ...data,
        id,
      };
    });
    if (allSales) {
      res.status(200).json({ sales: allSales });
    } else {
      response.status(404).json({ message: `404 not found` });
    }
  });
}
