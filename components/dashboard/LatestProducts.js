import { useState, useEffect } from "react";
import {
  Text,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Box,
} from "@chakra-ui/react";
import Link from "next/link";
import { listenLatestProducts } from "../../firebase/services/products";
import SingleRowProduct from "../products/SingleRowProduct";
import NormalList from "../common/list/NormalList";

export default function LatestProducts() {
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    listenLatestProducts(setLatestProducts);
  }, []);

  const TableHeadList = [
    "Nombre",
    "Precio",
    "Categoria",
    "Editar",
    "Populares",
    "Eliminar",
  ];

  return (
    <>
      <Box layerStyle={"primaryBox"} color={"#000"}>
        <Text fontSize={"30px"}>Ultimos productos</Text>

        <NormalList TableHeadList={TableHeadList}>
          {latestProducts.map((item, key) => (
            <SingleRowProduct key={item.id} {...item} />
          ))}
        </NormalList>
      </Box>
    </>
  );
}
