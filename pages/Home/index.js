import {
  Button,
  Text,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Flex,
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import useUser from "../../hooks/useUser";
import { logOut } from "../../firebase/services/auth";
import {
  Edit,
  Logo,
  MenuIcon,
  Trash,
  Producto,
  Category,
  Costo,
  LogoBlack,
} from "../../components/common/iconos";
import DashboardTop from "../../components/Dashboard/DashboardTop";
import Link from "next/link";
import LatestProducts from "../../components/Dashboard/LatestProducts";
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

export default function Home() {
  const user = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Layout>
        <DashboardTop title={"Inicio"} />
        <LatestProducts />
      </Layout>
    </>
  );
}
