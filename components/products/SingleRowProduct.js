import { useState, useEffect } from "react";
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
  CheckboxGroup,
  Checkbox,
  Grid,
} from "@chakra-ui/react";
import { Edit, Like, LinkIcon, PhotoIcon, Trash } from "../common/iconos";
import { Controller, useForm } from "react-hook-form";
import DeleteButton from "../buttons/DeleteButton";
import AddPopularButton from "../buttons/AddPopularButton";
import { updateProduct } from "../../firebase/services/products";
import { uploadImages } from "../../firebase/services/image";

export default function SingleRowProduct({
  id,
  name,
  price,
  category,
  popular,
  images,
  description,
  colors,
  measures,
}) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [productImages, setProductImages] = useState(images);
  const [file, setFile] = useState("");

  useEffect(() => {
    file && uploadImages(file, productImages, setProductImages);
  }, [file]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name,
      price,
      description,
      colors,
      measures,
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
                updateProduct(id, { images: productImages, ...data });
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
                    <FormLabel
                      m={"10px 0px"}
                      cursor="pointer"
                      htmlFor="uploadProductImage"
                    >
                      <Box
                        borderRadius={"10px"}
                        p={"10px 0px"}
                        w={"100%"}
                        bg={"secondary.100"}
                      >
                        <Text color={"#000"} textAlign={"center"}>
                          Subir imagen
                        </Text>
                      </Box>
                    </FormLabel>

                    {/* hide input file */}
                    <Input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      name="addPhoto"
                      id="uploadProductImage"
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
                    <Text color="red.600">{errors.name?.message}</Text>
                  </FormControl>

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
                    <Text color="red.600">{errors.description?.message}</Text>
                  </FormControl>

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
                    <Text color="red.600">{errors.price?.message}</Text>
                  </FormControl>

                  {/* Medidas */}
                  <FormControl>
                    <FormLabel>Medidas </FormLabel>
                    <Input
                      placeholder="Medidas"
                      type="number"
                      {...register("measures", {
                        required: "Campo obligatorio",
                      })}
                    />
                    <Text color="red.600">{errors.measures?.message}</Text>
                  </FormControl>

                  {/* Colores */}
                  <FormControl>
                    <FormLabel>Colores </FormLabel>
                    <Input
                      placeholder="Elige los colores. Ej: Blanco / Negro"
                      type="text"
                      {...register("colors", {
                        required: "Campo obligatorio",
                      })}
                    />
                    <Text color="red.600">{errors.colors?.message}</Text>
                  </FormControl>

                  {/* Category input */}
                  {/* <FormControl>
                    <FormLabel>Categoria </FormLabel>
                    <Select
                      color={"#000"}
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
                    <Text color="red.600">{errors.category?.message}</Text>
                  </FormControl> */}

                  <FormControl>
                    <Controller
                      name="category"
                      control={control}
                      render={({ field: { ref, ...rest } }) => (
                        <CheckboxGroup {...rest}>
                          <Grid templateColumns={"repeat(3, 1fr)"}>
                            <Checkbox value="Collares">Collares</Checkbox>
                            <Checkbox value="Cadenas">Cadenas</Checkbox>
                            <Checkbox value="Pulseras">Pulseras</Checkbox>
                            <Checkbox value="Billeteras">Billeteras</Checkbox>
                            <Checkbox value="Sets">Sets</Checkbox>
                            <Checkbox value="Black Site">Black Site</Checkbox>
                          </Grid>
                        </CheckboxGroup>
                      )}
                    />
                  </FormControl>
                </VStack>
              </Flex>
              <Flex justify={"center"} py={"20px"}>
                <Button
                  fontSize={"20px"}
                  variant={"primary"}
                  w={"full"}
                  p={"30px 0px"}
                  type="submit"
                >
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
