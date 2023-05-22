import {
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
} from "@chakra-ui/react";

export default function NormalList({ children, TableHeadList }) {
  return (
    <>
      <TableContainer color={"#000"} mt="15px">
        <Table variant="simple">
          <Thead>
            <Tr>
              {TableHeadList.map((item, key) => (
                <Th borderBottom={"2px"} borderColor={"gray.400"} key={item}>
                  <Text fontWeight={700} color={"gray.400"}>
                    {item}
                  </Text>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>{children}</Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
