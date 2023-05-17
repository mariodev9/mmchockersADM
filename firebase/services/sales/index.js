import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../firebaseConfig";

// Cambia el estado de pago entre: "Hecho" y "Pendiente"
export const changePaymentStatusSale = async (sellId, status) => {
  const productRef = doc(firestore, "sales", sellId);

  await updateDoc(productRef, { paymentStatus: status });
};

// Cambia el estado de envio entre: "No enviado", "En camino" y "Recibido"
export const changeShippingStatusSale = async (sellId, status) => {
  const productRef = doc(firestore, "sales", sellId);

  await updateDoc(productRef, { shippingStatus: status });
};

// Obtiene todas las ventas
export const getAllSales = async (setSales) => {
  const q = query(collection(firestore, "sales"));
  const querySnap = await getDocs(q);
  onSnapshot(q, (querySnap) => {
    const { docs } = querySnap;
    const allProducts = docs.map((doc) => {
      const data = doc.data();
      const id = doc.id;
      return {
        ...data,
        id,
      };
    });
    setSales(allProducts);
  });
};
