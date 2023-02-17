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

  return (
    <>
      <Flex justify={"space-between"} mt="30px">
        <Text fontSize={"20px"}>Ultimos productos</Text>
        <Link href={"/Productos"}> Ver todos</Link>
      </Flex>
      <NormalList>
        {latestProducts.map((item, key) => (
          <SingleRowProduct key={item.id} {...item} />
        ))}
      </NormalList>
    </>
  );
}
