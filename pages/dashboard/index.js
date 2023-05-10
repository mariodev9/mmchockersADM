import {
  Input,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
  useDisclosure,
  InputGroup,
  InputRightElement,
  Grid,
  GridItem,
  Flex,
  Text,
  VStack,
} from "@chakra-ui/react";
import useUser from "../../hooks/useUser";
import {
  Producto,
  Category,
  Costo,
  LogoBlack,
  SearchIcon,
} from "../../components/common/iconos";
import DashboardTop from "../../components/dashboard/DashboardTop";
import LatestProducts from "../../components/dashboard/LatestProducts";
import Layout from "../../components/layout";

const NavLinks = [
  {
    title: "Productos",
    icon: <Producto />,
  },
  {
    title: "Categorias",
    icon: <Category />,
  },
  {
    title: "Costos",
    icon: <Costo />,
  },
];

const BoxInformation = ({ children }) => (
  <GridItem
    p={"15px 10px"}
    borderRadius="15px"
    layerStyle={"informationWraper"}
    bg={"#fff"}
  >
    {children}
  </GridItem>
);

export default function Home() {
  const user = useUser();

  return (
    <>
      <Layout>
        <VStack spacing={10} align={"-moz-initial"}>
          <Flex align={"end"} justify={"space-between"}>
            <Text fontSize={"40px"} color="#000">
              Dashboard
            </Text>

            {/* <InputGroup mb={"10px"} w={"40%"}>
              <Input
                fontWeight={500}
                color={"#000"}
                bg={"#fff"}
                borderRadius={"full"}
                border={"none"}
                _placeholder={{ color: "#959595", fontWeight: 500 }}
                placeholder="Search product"
              />
              <InputRightElement>
                <SearchIcon />
              </InputRightElement>
            </InputGroup> */}
          </Flex>
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              desktop: "repeat(3, 1fr)",
            }}
            gap={6}
            color={"#000"}
          >
            <BoxInformation>
              <Text fontWeight={600} fontSize={"18px"}>
                Total spend in 2022
              </Text>
              <Text fontWeight={700} fontSize={"26px"}>
                $ 50.000
              </Text>
            </BoxInformation>
            <BoxInformation>
              <Text fontWeight={600} fontSize={"18px"}>
                Total savings in 2022{" "}
              </Text>
              <Text fontWeight={700} fontSize={"26px"}>
                $ 2.000
              </Text>
            </BoxInformation>
            <BoxInformation>
              <Text fontWeight={600} fontSize={"18px"}>
                Total sales
              </Text>
              <Text fontWeight={700} fontSize={"26px"}>
                2
              </Text>
            </BoxInformation>
          </Grid>
          <LatestProducts />
        </VStack>
      </Layout>
    </>
  );
}
