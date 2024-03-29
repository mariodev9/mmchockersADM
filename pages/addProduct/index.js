import { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Box,
  useToast,
  CheckboxGroup,
  Checkbox,
  Grid,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { addProduct } from "../../firebase/services/products";
import { uploadImages } from "../../firebase/services/image";
import Layout from "../../components/layout";
import Image from "next/image";
import useUser from "../../hooks/useUser";
import PageSpinner from "../../components/common/PageSpinner/PageSpinner";
import { useRouter } from "next/router";

export default function AddProductPage() {
  const [file, setFile] = useState("");
  const [images, setImages] = useState([]);
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    file && uploadImages(file, images, setImages);
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
    control,
    formState: { errors },
  } = useForm();

  const handleDeleteImg = (position) => {
    setImages(images.filter((item, index) => index != position));
    setFile("");
  };

  return (
    <>
      {user ? (
        <Layout>
          <form
            onSubmit={handleSubmit((data) => {
              addProduct(
                { images, ...data },
                succesfullCreated,
                errorCreatingProduct
              );
              // router.push("/dashboard");
            })}
          >
            <Flex direction={"column"} align={"center"}>
              {/* Imagenes */}
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
                      name="addPhoto"
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
                    <Button
                      bg={"red.600"}
                      onClick={() => handleDeleteImg(index)}
                    >
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

                {/* <FormControl>
                  <FormLabel>Stock </FormLabel>

                  <NumberInput
                    bg={"#fff"}
                    step={1}
                    maxW={100}
                    defaultValue={1}
                    min={0}
                    max={20}
                  >
                    <NumberInputField
                      {...register("stock", {
                        required: "This field is required",
                      })}
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl> */}

                {/* Categorias */}
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
                          <Checkbox value="BlackSite">Black Site</Checkbox>
                          <Checkbox value="Chokers">Chokers</Checkbox>
                        </Grid>
                      </CheckboxGroup>
                    )}
                  />
                </FormControl>

                {/* Medidas */}
                <FormControl>
                  <FormLabel>Medidas</FormLabel>
                  <Input bg={"#fff"} type="number" {...register("measures")} />
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
      ) : (
        <PageSpinner />
      )}
    </>
  );
}
