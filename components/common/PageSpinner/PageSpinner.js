import { Flex, Spinner } from "@chakra-ui/react";

export default function PageSpinner() {
  return (
    <Flex justify={"center"} align={"center"} h={"100vh"}>
      <Spinner color="#ffd30c" />
    </Flex>
  );
}
