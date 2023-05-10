import { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Center,
  Box,
  Select,
  Spinner,
  Image,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { addProduct } from "../../firebase/services/products";
import { uploadImages } from "../../firebase/services/image";
import TotalProducts from "./TotalProducts";
import { useRouter } from "next/router";

export default function DashboardTop({ title }) {
  const [file, setFile] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    file && uploadImages(file, images, setImages);
  }, [file]);
  // }, [file]);

  const router = useRouter();

  return (
    <>
      <Flex
        direction={{ base: "column", tablet: "row" }}
        gap={5}
        layerStyle={"primaryBox"}
        justify={"space-between"}
        align={"center"}
      >
        <Text fontSize={"30px"}>{title}</Text>
        <TotalProducts />
        <Button variant={"primary"} onClick={() => router.push("/addProduct")}>
          Agregar Producto
        </Button>
      </Flex>
    </>
  );
}
