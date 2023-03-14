import React from "react";
import {
  Button,
  Tr,
  Td,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  Box,
  FormControl,
  Input,
  VStack,
  FormLabel,
  Select,
  Text,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
} from "@chakra-ui/react";
import { Edit, Like } from "../common/iconos";
import { useForm } from "react-hook-form";
import DeleteButton from "../buttons/DeleteButton";
import AddPopularButton from "../buttons/AddPopularButton";
import { updateProduct } from "../../firebase/services/products";

export default function SingleRowProduct({
  id,
  name,
  price,
  category,
  popular,
  image,
  description,
}) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name,
      price,
      description,
    },
  });

  return (
    <>
      <Tr key={id}>
        <Td pt={2} pb={2}>
          {name}
        </Td>
        <Td pt={2} pb={2}>
          ${price}
        </Td>
        <Td pt={2} pb={2}>
          {category}
        </Td>
        <Td pt={2} pb={2}>
          <Button onClick={() => onOpen()}>
            <Edit />
          </Button>
        </Td>
        <Td pt={2} pb={2}>
          <DeleteButton productId={id} />
        </Td>
        <Td pt={2} pb={2}>
          <AddPopularButton productId={id} isLiked={popular} />
        </Td>
      </Tr>

      {/* Modal para Editar Producto */}
      <Modal isOpen={isOpen} onClose={onClose} size={"3xl"}>
        <ModalOverlay />
        <ModalContent color={"#fff"} bg={"background.100"}>
          <ModalHeader>Editar Producto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form
              onSubmit={handleSubmit((data) => {
                updateProduct(id, { ...data });
                // succesfullCreated,
                // errorCreatingProduct
                onClose();
              })}
            >
              <Flex direction={{ base: "column", tablet: "row" }}>
                <Flex w={"50%"} p={"0px 15px"} direction={"column"}>
                  {/* <Box
                    w={"full"}
                    h={"250px"}
                    bgImage={image}
                    bgPos={"center"}
                    bgRepeat={"no-repeat"}
                    bgSize={"cover"}
                  ></Box> */}
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
                    {/* {!image && (
                      <FormLabel htmlFor="productImage" cursor="pointer">
                        Agregar foto
                      </FormLabel>
                    )} */}
                  </FormControl>
                  {/* {file && !image && (
                    <Flex w="100%" h="100%" justify={"center"} align={"center"}>
                      <Spinner color="red" />
                    </Flex>
                  )} */}

                  {/* {image && (
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
                  )} */}
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
                      <option
                        selected={category === "Collares"}
                        value="Collares"
                      >
                        Collares
                      </option>
                      <option selected={category === "Cadenas"} value="Cadenas">
                        Cadenas
                      </option>
                      <option
                        selected={category === "Pulseras"}
                        value="Pulseras"
                      >
                        Pulseras
                      </option>
                    </Select>
                  </FormControl>

                  <Text color="red.600">{errors.category?.message}</Text>
                </VStack>
              </Flex>
              <Flex justify={"center"} py={"20px"}>
                <Button variant={"primary"} w={"full"} type="submit">
                  Guardar cambios
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
