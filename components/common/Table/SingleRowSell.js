import React from "react";
import { Button, Tr, Td } from "@chakra-ui/react";

const TdRow = ({ children }) => (
  <Td borderColor={"#fff"} pt={2} pb={2}>
    {children}
  </Td>
);

export default function SingleRowSell({ id, totalPrice, paymentStatus, date }) {
  return (
    <Tr key={id} fontWeight={600}>
      <TdRow>{id}</TdRow>
      <TdRow>$ {totalPrice}</TdRow>
      <TdRow>{paymentStatus}</TdRow>
      <TdRow>{date}</TdRow>
    </Tr>
  );
}
