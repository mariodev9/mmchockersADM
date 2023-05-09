import { useToast } from "@chakra-ui/react";
import {
  collection,
  query,
  getDocs,
  Timestamp,
  addDoc,
  orderBy,
  onSnapshot,
  where,
  deleteDoc,
  doc,
  limit,
  getCountFromServer,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../firebaseConfig";

export const addProduct = (
  { images, name, description, price, category, measures, colors },
  succesfullCreated,
  errorCreatingProduct
) => {
  try {
    const docRef = addDoc(collection(firestore, "products"), {
      images,
      name,
      description,
      price: parseInt(price),
      category,
      createdAt: Timestamp.fromDate(new Date()),
      popular: false,
      measures,
      colors,
    }).then(succesfullCreated());
  } catch (error) {
    errorCreatingProduct();
  }
};

export const deleteProduct = async (
  productId,
  succesfullDeleteToast,
  errorDeleteToast
) => {
  try {
    await deleteDoc(doc(firestore, "products", productId));
    succesfullDeleteToast();
  } catch (error) {
    errorDeleteToast();
  }
};

export const listenLatestProducts = async (getProducts) => {
  const q = query(
    collection(firestore, "products"),
    orderBy("createdAt", "desc"),
    limit(5)
  );
  const querySnap = await getDocs(q);
  onSnapshot(q, (querySnap) => {
    const { docs } = querySnap;
    const lastProducts = docs.map(mapFromFirebaseToProductObject);
    getProducts(lastProducts);
  });
};

export const getAllProducts = async (setProducts, setProductsFiltred) => {
  const q = query(
    collection(firestore, "products"),
    orderBy("createdAt", "desc")
  );
  const querySnap = await getDocs(q);
  onSnapshot(q, (querySnap) => {
    const { docs } = querySnap;
    const allProducts = docs.map(mapFromFirebaseToProductObject);
    setProducts(allProducts);
    setProductsFiltred(allProducts);
  });
};

export const mapFromFirebaseToProductObject = (doc) => {
  const data = doc.data();
  const id = doc.id;
  const { createdAt } = data;

  return {
    ...data,
    id,
    createdAt: +createdAt.toDate(),
  };
};

export const getTotalProductsCount = async (setCount) => {
  const coll = collection(firestore, "products");
  const snapshot = await getCountFromServer(coll);
  let totalCount = snapshot.data().count;
  setCount(totalCount);
};

export const addProductToPopular = async (productId, isLiked) => {
  const productRef = doc(firestore, "products", productId);

  await updateDoc(productRef, {
    popular: !isLiked,
  });
};

export const updateProduct = async (productId, data) => {
  // console.log(data, "la data tiene las imagenes actualizadas?");
  const productRef = doc(firestore, "products", productId);

  await updateDoc(productRef, {
    ...data,
  });
};
