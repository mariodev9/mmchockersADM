import { useState } from "react";
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
} from "@chakra-ui/react";
import { Edit, Like, LinkIcon, PhotoIcon, Trash } from "../common/iconos";
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
  images,
  description,
}) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [productImages, setProductImages] = useState(images);

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

  const handleDeleteImg = (position) => {
    setProductImages(productImages.filter((item, index) => index != position));
    // setFile("");
  };

  const TdRow = ({ children }) => (
    <Td borderColor={"#fff"} pt={2} pb={2}>
      {children}
    </Td>
  );

  return (
    <>
      <Tr key={id} fontWeight={600}>
        <TdRow>{name}</TdRow>

        <TdRow>$ {price}</TdRow>
        <TdRow>{category}</TdRow>
        <TdRow>
          <Button bg={"#EFF0FF"} onClick={() => onOpen()}>
            <Edit />
          </Button>
        </TdRow>
        <TdRow>
          <AddPopularButton productId={id} isLiked={popular} />
        </TdRow>
        <TdRow>
          <DeleteButton productId={id} />
        </TdRow>
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
                updateProduct(id, { productImages, ...data });
                onClose();
              })}
            >
              <Flex direction={{ base: "column", tablet: "row" }}>
                <Flex w={"50%"} p={"0px 15px"} direction={"column"}>
                  <Text fontSize={"2xl"}>Imagenes</Text>
                  {productImages.map((image, index) => (
                    <Flex
                      key={image}
                      m={"10px 0px"}
                      border={"2px solid #999"}
                      p={"8px 16px"}
                      borderRadius={"10px"}
                      justify={"space-between"}
                    >
                      <Flex>
                        <Box>
                          <PhotoIcon />
                        </Box>
                        <Text ml={"5px"}>Image {index + 1}</Text>
                      </Flex>
                      <Flex>
                        <Box mr={"10px"}>
                          <a
                            target="_blank"
                            href={image}
                            rel="noopener noreferrer"
                          >
                            <div>
                              <LinkIcon />
                            </div>
                          </a>
                        </Box>
                        <button onClick={() => handleDeleteImg(index)}>
                          <Trash stroke={"#999"} strokeWidth="2" />
                        </button>
                      </Flex>
                    </Flex>
                  ))}
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
                  </FormControl>
                </Flex>
                <VStack spacing={"15px"} w={"50%"}>
                  {/* Name input */}
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

                  {/* Description input */}
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

                  {/* Precio input */}
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

                  {/* Category input */}
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
                      <option
                        selected={category === "Billeteras"}
                        value="Billeteras"
                      >
                        Billeteras
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
