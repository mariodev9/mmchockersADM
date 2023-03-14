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
import { uploadImage } from "../../firebase/services/image";
import TotalProducts from "./TotalProducts";

export default function DashboardTop({ title }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    file && uploadImage(file, setImage);
  }, [file]);

  const toast = useToast();

  const succesfullCreated = () => {
    toast({
      title: "Nuevo producto!",
      description: "Has creado un nuevo producto con exito.",
      status: "success",
      duration: 6000,
      isClosable: true,
      position: "top",
    });
  };

  const errorCreatingProduct = () => {
    toast({
      title: "Ups no hubo un error",
      description: "No se pudo agregar el nuevo producto.",
      status: "error",
      duration: 6000,
      isClosable: true,
      position: "top",
    });
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleDeleteImg = () => {
    setImage("");
    setFile("");
  };

  return (
    <>
      <Flex
        layerStyle={"primaryBox"}
        justify={"space-between"}
        align={"center"}
      >
        <Text fontSize={"30px"}>{title}</Text>
        <TotalProducts />
        <Button variant={"primary"} onClick={onOpen}>
          Agregar Producto
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size={"3xl"}>
        <ModalOverlay />
        <ModalContent color={"#fff"} bg={"background.100"}>
          <ModalHeader>Agregar Producto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form
              onSubmit={handleSubmit((data) => {
                addProduct(
                  { image, ...data },
                  succesfullCreated,
                  errorCreatingProduct
                );
                onClose();
              })}
            >
              <Flex direction={{ base: "column", tablet: "row" }}>
                <Flex w={"50%"} p={"0px 15px"} direction={"column"}>
                  <Box
                    w={"full"}
                    h={"250px"}
                    bgImage={image}
                    bgPos={"center"}
                    bgRepeat={"no-repeat"}
                    bgSize={"cover"}
                  ></Box>
                  <FormControl>
                    <Input
                      type="file"
                      name="Add photo"
                      id="productImage"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                      }}
                      display="none"
                    />
                    {!image && (
                      <FormLabel htmlFor="productImage" cursor="pointer">
                        Agregar foto
                      </FormLabel>
                    )}
                  </FormControl>
                  {file && !image && (
                    <Flex w="100%" h="100%" justify={"center"} align={"center"}>
                      <Spinner color="red" />
                    </Flex>
                  )}

                  {image && (
                    <Box>
                      <Button
                        borderRadius="99px"
                        onClick={handleDeleteImg}
                        position="absolute"
                        bg="red.400"
                        zIndex="2"
                        _hover={{
                          bg: "gray",
                        }}
                      >
                        X
                      </Button>
                    </Box>
                  )}
                </Flex>
                <VStack spacing={"15px"} w={"50%"}>
                  <FormControl id="name">
                    <FormLabel>Nombre </FormLabel>
                    <Input
                      type="text"
                      {...register("name", {
                        required: "Campo obligatorio",
                      })}
                    />
                  </FormControl>
                  <Text color="red.600">{errors.name?.message}</Text>
                  <FormControl>
                    <FormLabel>Descripcion</FormLabel>
                    <Input
                      type="text"
                      {...register("description", {
                        required: "Campo obligatorio",
                        minLength: {
                          value: 10,
                          message: "Minimo debe tener 10 digitos",
                        },
                      })}
                    />
                  </FormControl>
                  <Text color="red.600">{errors.description?.message}</Text>

                  <FormControl>
                    <FormLabel>Precio </FormLabel>
                    <Input
                      placeholder="$"
                      type="number"
                      {...register("price", {
                        required: "Campo obligatorio",
                      })}
                    />
                  </FormControl>
                  <Text color="red.600">{errors.price?.message}</Text>

                  <FormControl>
                    <FormLabel>Categoria </FormLabel>
                    <Select
                      cursor={"pointer"}
                      {...register("category", {
                        required: "Campo obligatorio",
                      })}
                    >
                      <option value="Collares">Collares</option>
                      <option value="Cadenas">Cadenas</option>
                      <option value="Pulseras">Pulseras</option>
                    </Select>
                  </FormControl>

                  <Text color="red.600">{errors.category?.message}</Text>
                </VStack>
              </Flex>
              <Flex justify={"center"} py={"20px"}>
                <Button variant={"primary"} w={"60%"} type="submit">
                  Crear Nuevo Producto
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
