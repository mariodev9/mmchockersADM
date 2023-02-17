import React from "react";
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
const TableHeadList = [
  "Nombre",
  "Precio",
  "Categoria",
  "Editar",
  "Eliminar",
  "Populares",
];

export default function NormalList({ children }) {
  return (
    <>
      <TableContainer color={"#fff"} layerStyle={"primaryBox"} mt="15px">
        <Table variant="simple">
          <Thead>
            <Tr>
              {TableHeadList.map((item, key) => (
                <Th key={item}>{item}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>{children}</Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
