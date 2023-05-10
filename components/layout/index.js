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
  DrawerFooter,
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
  DashboardIcon,
} from "../../components/common/iconos";
import Link from "next/link";

const NavLinks = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    link: "/dashboard",
  },
  {
    title: "Productos",
    icon: <Producto />,
    link: "/productos",
  },
  {
    title: "Ventas",
    icon: <Costo />,
    link: "/ventas",
  },
  {
    title: "Categorias",
    icon: <Category />,
    link: "/Categorias",
  },
  {
    title: "Gastos",
    icon: <Costo />,
    link: "/Gastos",
  },
];

function MobileNavbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        display={{ base: "block", desktop: "none" }}
        bg={"#fff"}
        w={"100%"}
        position={"fixed"}
        p="10px 30px"
        zIndex={99}
      >
        <Flex justify={"space-between"} align={"center"}>
          <Button bg={"#000"} onClick={() => onOpen()}>
            <MenuIcon />
          </Button>

          <Logo />
        </Flex>
      </Box>

      <Drawer onClose={onClose} isOpen={isOpen} placement={"left"}>
        <DrawerOverlay />
        <DrawerContent bg={"#fff"}>
          <DrawerCloseButton />
          <DrawerHeader>
            <Logo />
          </DrawerHeader>
          <DrawerBody>
            {NavLinks.map((item) => (
              <Link key={item.title} href={item.link}>
                <Flex
                  key={item.title}
                  align={"center"}
                  m={"20px 0px"}
                  cursor={"pointer"}
                >
                  <Box mr="5px">{item.icon}</Box>

                  <Text fontSize={"2xl"} color={"#000"}>
                    {item.title}
                  </Text>
                </Flex>
              </Link>
            ))}
          </DrawerBody>
          <DrawerFooter>
            <Button bg={"#000"} onClick={() => logOut()} color={"#fff"}>
              Cerrar Sesion
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default function Layout({ children }) {
  return (
    <>
      <MobileNavbar />
      <Flex>
        <Box
          w={{ base: "0px", desktop: "20%" }}
          display={{ base: "none", desktop: "block" }}
          h={"100vh"}
          p="30px 30px"
          bg={"#fff"}
          borderRight={"2px solid #f3f3f3"}
          color={"#000"}
        >
          <Text
            mb={"70px"}
            fontSize={"2xl"}
            fontWeight={700}
            textTransform={"uppercase"}
          >
            mmchokers
          </Text>
          {NavLinks.map((item, key) => (
            <Link key={item.title} href={item.link}>
              <Flex
                key={item.title}
                align={"center"}
                m={"20px 0px"}
                cursor={"pointer"}
              >
                <Box w={"35px"} mr="5px">
                  {item.icon}
                </Box>

                <Text fontSize={"xl"}>{item.title}</Text>
              </Flex>
            </Link>
          ))}
        </Box>

        <Box
          w={{ base: "100%", desktop: "80%" }}
          color={"#000"}
          px=" 30px"
          py={{ base: "80px", tablet: "30px" }}
        >
          {children}
        </Box>
      </Flex>
      {/* Drawee */}
    </>
  );
}
