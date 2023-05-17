import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
import { getSale } from "../../firebase/services/sales";
import { Box, Text, Flex, Spinner, VStack } from "@chakra-ui/react";
import {
  DoneIcon,
  PendingIcon,
  WrongIcon,
} from "../../components/common/iconos";
import {
  StatusPaymentBox,
  StatusShippingBox,
} from "../../components/common/Table/SingleRowSell";
import Image from "next/image";

const Wraper = ({ children }) => (
  <Box bg={"#fff"} w={"full"} p={"15px"} borderRadius={"15px"}>
    {children}
  </Box>
);

const WraperTitle = ({ children }) => (
  <Text fontSize={"25px"} fontWeight={600}>
    {children}
  </Text>
);

export default function SingleSellPage() {
  const router = useRouter();
  const { query } = router;
  const { id } = query;

  const [saleData, setSaleData] = useState();

  useEffect(() => {
    if (id) {
      getSale(setSaleData, id);
    }
  }, [id]);

  return (
    <Layout>
      <Text fontSize={"20px"}>Detalles de compra</Text>
      <Box mt={"20px"}>
        {saleData ? (
          <VStack align={"center"} spacing={5}>
            <Text w={"full"} align={"start"}>
              ID de compra: {query?.id} <br />
              ID corto: {query.id?.slice(0, 6)} <br />
            </Text>
            <Wraper>
              <WraperTitle>Informacion del comprador</WraperTitle>

              <Text>
                Nombre completo: {saleData.buyerData?.name}{" "}
                {saleData.buyerData.lastName} <br />
                DNI: {saleData.buyerData.dni} <br />
                E-mail: {saleData.buyerData.email} <br />
                Destino: {saleData.buyerData.adress}{" "}
                {saleData.buyerData.apartment &&
                  `apartamento: ${saleData.buyerData.apartment}`}
                {saleData.buyerData.adressNumber}, {saleData.buyerData.city}
                {", "}
                {saleData.buyerData.province} <br />
                Codigo Postal: {saleData.buyerData.postalCode}
              </Text>
            </Wraper>
            <Wraper>
              <WraperTitle>Productos comprados</WraperTitle>
              <Flex direction={"column"}>
                {saleData.cart.map((product) => (
                  <Flex key={product.id} justify={"space-between"} mt={"10px"}>
                    <Box width={"70px"} height={"70px"} pos={"relative"}>
                      <Image
                        src={product.images[0]}
                        alt={`image of ${product.name}`}
                        style={{ borderRadius: "2px" }}
                        layout="fill"
                        objectFit="cover"
                      />
                    </Box>
                    <Flex
                      width={"50%"}
                      direction={"column"}
                      justify={"space-between"}
                    >
                      <Text fontSize={"14px"} fontWeight={600}>
                        {product.name}
                      </Text>
                      <Text fontSize={"14px"} fontWeight={600}>
                        cantidad: {product.quantity}
                      </Text>
                    </Flex>
                    <Flex align={"end"} fontWeight={600}>
                      ${product.price}
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            </Wraper>

            <Wraper>
              <WraperTitle>Informacion de compra</WraperTitle>
              <Text mb={"5px"}>Total a pagar: $ {saleData.totalPayment}</Text>
              <Flex gap={5}>
                <Text>Estado del envio:</Text>
                <StatusShippingBox
                  saleId={id}
                  status={saleData.shippingStatus}
                />
              </Flex>
              <Flex gap={5} mt={"5px"}>
                <Text>Estado de compra:</Text>
                <StatusPaymentBox saleId={id} status={saleData.paymentStatus} />
              </Flex>
            </Wraper>
          </VStack>
        ) : (
          <Spinner />
        )}
      </Box>
    </Layout>
  );
}
