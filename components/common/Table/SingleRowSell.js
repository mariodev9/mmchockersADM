import React from "react";
import { Tr, Td, Text, Flex, Button } from "@chakra-ui/react";
import { ArrowLeftIcon, DoneIcon, PendingIcon, WrongIcon } from "../iconos";
import { useRouter } from "next/router";
import {
  changePaymentStatusSale,
  changeShippingStatusSale,
} from "../../../firebase/services/sales";

const TdRow = ({ children }) => (
  <Td borderColor={"#fff"} pt={2} pb={2}>
    {children}
  </Td>
);

// El estado de envio tiene 3 opciones: No enviado, Enviado y Recibido
// El usuario clickea la caja para cambiar de estado,
// El cambio de estados es en BUCLE: NOT_SEND => SENT => RECEIVED => NOT_SENT ...
export const StatusShippingBox = ({ saleId, status }) => {
  // Refactor Flex Component

  const SHIPPING_STATE = {
    NOT_SENT: -1,
    SENT: 0,
    RECEIVED: 1,
  };

  return (
    <>
      {status === SHIPPING_STATE.NOT_SENT ? (
        <Flex
          cursor={"pointer"}
          onClick={() => changeShippingStatusSale(saleId, (status = 0))}
          justify={"center"}
          gap={2}
          borderRadius={"5px"}
          p={"5px 10px"}
          bg={"#FFDDDF"}
        >
          <WrongIcon />

          <Text align={"center"} color={"#FFAEB3"}>
            No enviado
          </Text>
        </Flex>
      ) : status === SHIPPING_STATE.SENT ? (
        <Flex
          cursor={"pointer"}
          onClick={() => changeShippingStatusSale(saleId, (status = 1))}
          justify={"center"}
          gap={2}
          borderRadius={"5px"}
          p={"5px"}
          bg={"#FFF9DF"}
        >
          <PendingIcon stroke={"#FFD526"} />
          <Text align={"center"} color={"#FFD526"}>
            En camino
          </Text>
        </Flex>
      ) : (
        <Flex
          cursor={"pointer"}
          onClick={() => changeShippingStatusSale(saleId, (status = -1))}
          justify={"center"}
          gap={2}
          borderRadius={"5px"}
          p={"5px"}
          bg={"#EDF9E7"}
        >
          <DoneIcon />

          <Text align={"center"} color={"#82A36E"}>
            Recibido
          </Text>
        </Flex>
      )}
    </>
  );
};

export const StatusPaymentBox = ({ saleId, status }) => {
  // Refactor Flex Component

  return (
    <>
      {status === "Done" ? (
        <Flex
          cursor={"pointer"}
          onClick={() => changePaymentStatusSale(saleId, (status = "Pending"))}
          justify={"center"}
          gap={2}
          borderRadius={"5px"}
          p={"5px"}
          bg={"#EDF9E7"}
        >
          <DoneIcon />

          <Text align={"center"} color={"#82A36E"}>
            Hecho
          </Text>
        </Flex>
      ) : (
        <Flex
          cursor={"pointer"}
          onClick={() => changePaymentStatusSale(saleId, (status = "Done"))}
          justify={"center"}
          gap={2}
          borderRadius={"5px"}
          p={"5px"}
          bg={"#F0FDFE"}
        >
          <PendingIcon />
          <Text align={"center"} color={"#6EA6B3"}>
            Pendiente
          </Text>
        </Flex>
      )}
    </>
  );
};

export default function SingleRowSell({
  id,
  totalPayment,
  paymentStatus,
  shippingStatus,
  date,
  buyerData,
}) {
  const router = useRouter();

  return (
    <Tr key={id} fontWeight={600}>
      <TdRow>{id.slice(0, 6)}</TdRow>
      <TdRow>{buyerData.name}</TdRow>
      <TdRow>{buyerData.lastName}</TdRow>

      {/* cambiar a totalAmount */}
      <TdRow>$ {totalPayment}</TdRow>

      <TdRow>{date}</TdRow>
      <TdRow>
        <StatusPaymentBox saleId={id} status={paymentStatus} />
      </TdRow>
      <TdRow>
        <StatusShippingBox saleId={id} status={shippingStatus} />
      </TdRow>
      <TdRow>
        <Button
          bg={"#333"}
          _hover={{ bg: "#000" }}
          onClick={() => router.push(`ventas/${id}`)}
        >
          <ArrowLeftIcon stroke={"#fff"} />
        </Button>
      </TdRow>
    </Tr>
  );
}
