import React from "react";
import { Tr, Td, Text, Flex, Button } from "@chakra-ui/react";
import { ArrowLeftIcon, DoneIcon, PendingIcon } from "../iconos";
import { useRouter } from "next/router";

const TdRow = ({ children }) => (
  <Td borderColor={"#fff"} pt={2} pb={2}>
    {children}
  </Td>
);

const StatusBox = ({ status }) => (
  <>
    {status === "Done" ? (
      <Flex
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

export default function SingleRowSell({
  id,
  totalPayment,
  paymentStatus,
  date,
  buyerData,
}) {
  const router = useRouter();

  return (
    <Tr key={id} fontWeight={600}>
      <TdRow>{id}</TdRow>
      <TdRow>{buyerData.name}</TdRow>
      <TdRow>{buyerData.lastName}</TdRow>

      {/* cambiar a totalAmount */}
      <TdRow>$ {totalPayment}</TdRow>
      <TdRow>
        <StatusBox status={paymentStatus} />
      </TdRow>
      <TdRow>{date}</TdRow>
      <TdRow>
        <Button onClick={() => router.push(`ventas/${id}`)}>
          <ArrowLeftIcon />
        </Button>
      </TdRow>
    </Tr>
  );
}
