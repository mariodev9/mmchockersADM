import { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Button,
  useDisclosure,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Box,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { addProduct } from "../../firebase/services/products";
import { uploadImages } from "../../firebase/services/image";
import Layout from "../../components/layout";
import Image from "next/image";

export default function AddProductPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [file, setFile] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    file && uploadImages(file, images, setImages);
  }, [file, images]);
  // }, [file]);

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

  const handleDeleteImg = (position) => {
    setImages(images.filter((item, index) => index != position));
    setFile("");
  };

  return (
    <Layout>
      <form
        onSubmit={handleSubmit((data) => {
          addProduct(
            { images, ...data },
            succesfullCreated,
            errorCreatingProduct
          );
          onClose();
        })}
      >
        <Flex direction={"column"} align={"center"}>
          <Flex
            w={{ base: "100%", tablet: "50%" }}
            p={"0px 15px"}
            direction={"column"}
          >
            <FormControl>
              <Flex
                direction={"column"}
                justify={"center"}
                border={"1px solid #666"}
                align={"center"}
                h={"200px"}
              >
                <Text textAlign={"center"} fontSize={"3xl"}>
                  Subir Imagenes
                </Text>
                <Text color={"#777"} textAlign={"center"}>
                  (JPG - JPEG - PNG)
                </Text>
                <FormLabel
                  mt={"10px"}
                  htmlFor="productImage"
                  cursor="pointer"
                  borderRadius={"10px"}
                  p={"8px 80px"}
                  bg={"green.300"}
                >
                  Subir
                </FormLabel>
                <Input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  name="Add photo"
                  id="productImage"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                  display="none"
                />
              </Flex>
            </FormControl>

            {images.map((image, index) => (
              <Box key={image} pos={"relative"} w={"full"} h={"250px"}>
                <Image
                  alt="product"
                  src={image}
                  layout="fill"
                  objectFit="cover"
                />
                <Button bg={"red.600"} onClick={() => handleDeleteImg(index)}>
                  X
                </Button>
              </Box>
            ))}
          </Flex>

          <VStack spacing={"15px"} w={{ base: "100%", tablet: "50%" }}>
            {/* Nombre del producto */}
            <FormControl id="name">
              <FormLabel>Nombre </FormLabel>
              <Input
                bg={"#fff"}
                type="text"
                {...register("name", {
                  required: "Campo obligatorio",
                })}
              />
              <Text color="red.600">{errors.name?.message}</Text>
            </FormControl>

            {/* Descripcion */}
            <FormControl>
              <FormLabel>Descripcion</FormLabel>
              <Input
                bg={"#fff"}
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

            {/* Precio */}
            <FormControl>
              <FormLabel>Precio </FormLabel>
              <Input
                bg={"#fff"}
                placeholder="$"
                type="number"
                {...register("price", {
                  required: "Campo obligatorio",
                })}
              />
              <Text color="red.600">{errors.price?.message}</Text>
            </FormControl>

            {/* Stock */}
            <FormControl>
              <FormLabel>Stock </FormLabel>
              <Input
                bg={"#fff"}
                placeholder="Numero de stock"
                type="number"
                {...register("stock", {
                  required: "Campo obligatorio",
                })}
              />
              <Text color="red.600">{errors.stock?.message}</Text>
            </FormControl>

            {/* Categoria */}
            <FormControl>
              <FormLabel>Categoria </FormLabel>
              <Select
                bg={"#fff"}
                cursor={"pointer"}
                {...register("category", {
                  required: "Campo obligatorio",
                })}
              >
                <option value="Collares">Collares</option>
                <option value="Cadenas">Cadenas</option>
                <option value="Pulseras">Pulseras</option>
                <option value="Billeteras">Billeteras</option>
              </Select>
              <Text color="red.600">{errors.category?.message}</Text>
            </FormControl>

            {/* Medidas */}
            <FormControl>
              <FormLabel>Medidas</FormLabel>
              <Input
                bg={"#fff"}
                type="number"
                {...register("measures", {
                  required: "Campo obligatorio",
                })}
              />
              <Text color="red.600">{errors.name?.message}</Text>
            </FormControl>

            {/* Colores */}
            <FormControl>
              <FormLabel>Colores</FormLabel>
              <Input
                bg={"#fff"}
                type="text"
                {...register("colors", {
                  required: "Campo obligatorio",
                })}
              />
              <Text color="red.600">{errors.description?.message}</Text>
            </FormControl>
          </VStack>
        </Flex>
        <Button mt={"20px"} variant={"primary"} w={"100%"} type="submit">
          Crear Nuevo Producto
        </Button>
      </form>
    </Layout>
  );
}
