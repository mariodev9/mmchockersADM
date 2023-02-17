import { Button, Flex, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getTotalProductsCount } from "../../firebase/services/products";

export default function TotalProducts() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    getTotalProductsCount(setCount);
  }, [count]);

  return (
    <>
      <Flex direction={"column"} justify={"center"}>
        {count ? (
          <>
            <Text>Productos totales: {count}</Text>
            <Text fontSize={"12px"} color={"gray"}>
              Este valor no se actualiza al instante
            </Text>
          </>
        ) : (
          <Spinner />
        )}
      </Flex>
    </>
  );
}
