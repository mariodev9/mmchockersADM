import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../firebaseConfig";

// Cambia el estado de pago entre: "Hecho" y "Pendiente"
export const changePaymentStatusSale = async (saleId, status) => {
  const productRef = doc(firestore, "sales", saleId);

  await updateDoc(productRef, { paymentStatus: status });
};

// Cambia el estado de envio entre: "No enviado", "En camino" y "Recibido"
export const changeShippingStatusSale = async (saleId, status) => {
  const productRef = doc(firestore, "sales", saleId);

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

export const getSale = async (saveData, id) => {
  const docRef = doc(firestore, "sales", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    saveData(docSnap.data());
  } else {
    console.log("No such document!");
  }
};
