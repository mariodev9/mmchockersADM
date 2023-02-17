import React from "react";
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
import Link from "next/link";

const NavLinks = [
  {
    title: "Inicio",
    icon: <Category />,
    link: "Home",
  },
  {
    title: "Productos",
    icon: <Producto />,
    link: "Productos",
  },
  {
    title: "Categorias",
    icon: <Category />,
    link: "Categorias",
  },
  {
    title: "Costos",
    icon: <Costo />,
    link: "Costos",
  },
];

export default function Layout({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box
        bg={"background.100"}
        w={"100%"}
        position={"fixed"}
        p="10px 30px"
        zIndex={99}
      >
        <Flex justify={"space-between"}>
          <Button onClick={() => onOpen()}>
            <MenuIcon />
          </Button>
          <Button onClick={() => logOut()} color={"#fff"}>
            Cerrar Sesion
          </Button>
        </Flex>
      </Box>
      <Drawer onClose={onClose} isOpen={isOpen} placement={"left"}>
        <DrawerOverlay />
        <DrawerContent bg={"primary.100"}>
          <DrawerCloseButton />
          <DrawerHeader>
            <LogoBlack width="227" height="28" />
          </DrawerHeader>
          <DrawerBody>
            {NavLinks.map((item, key) => (
              <Link key={item.title} href={item.link}>
                <Flex
                  key={item.title}
                  align={"center"}
                  m={"20px 0px"}
                  cursor={"pointer"}
                >
                  <Box mr="5px">{item.icon}</Box>

                  <Text fontSize={"2xl"} color={"white"}>
                    {item.title}
                  </Text>
                </Flex>
              </Link>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Box p="70px 30px">{children}</Box>
    </>
  );
}
