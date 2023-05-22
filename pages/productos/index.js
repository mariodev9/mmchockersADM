import { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Flex,
  Text,
  Input,
  Select,
  InputGroup,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { getAllProducts } from "../../firebase/services/products";
import SingleRowProduct from "../../components/products/SingleRowProduct";
import { FilterIcon } from "../../components/common/iconos";
import DashboardTop from "../../components/dashboard/DashboardTop";
import Layout from "../../components/layout";
import { useForm } from "react-hook-form";
import useUser from "../../hooks/useUser";

export default function Productos() {
  const [products, setProducts] = useState([]);
  const [productsFilter, setProductsFiltred] = useState([]);

  const user = useUser();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const watchAllFields = watch();

  useEffect(() => {
    getAllProducts(setProducts, setProductsFiltred);
  }, []);

  function getFilterProducts() {
    let filtredProducts = products;

    function CategoryFilter(array, categoryName) {
      // Creamos un nuevo array donde almacenar los objetos que coincidan con la categoría
      const productsFilters = [];

      // Recorremos el array de objetos y verificamos si la categoría existe en el array de categorías
      array.forEach((objeto) => {
        if (objeto.category.includes(categoryName)) {
          productsFilters.push(objeto);
        }
      });

      // Devolvemos el array con los objetos filtrados
      return productsFilters;
    }

    filtredProducts = CategoryFilter(
      filtredProducts,
      watchAllFields.categoryFilterValue
    );

    // Filtro por precio

    // function PriceFilter(array, categoryName) {
    //   const objetosFiltrados = [];

    //   array.forEach((objeto) => {
    //     if (objeto.category.includes(categoryName)) {
    //       objetosFiltrados.push(objeto);
    //     }
    //   });

    //   return objetosFiltrados;
    // }

    // Filtro por precio Menor a:
    if (watchAllFields.priceFilterValue != 0) {
      filtredProducts = products.filter(
        (product) => product.price < watchAllFields.priceFilterValue
      );
    }

    // Filtro por nombre
    if (watchAllFields.nameFilterValue != "") {
      let word = watchAllFields.nameFilterValue;
      filtredProducts = filtredProducts.filter((product) =>
        product.name.includes(word)
      );
    }

    return filtredProducts;
  }

  function FilterProducts() {
    setProductsFiltred(getFilterProducts());
  }

  function CleanFilters() {
    setProductsFiltred(products);
  }

  const FilterButton = () => (
    <Button
      w={"40px"}
      p={"0px"}
      ml={2}
      bg={"#555"}
      onClick={() => FilterProducts()}
      _hover={{ bg: "#000" }}
    >
      <FilterIcon />
    </Button>
  );

  return (
    <>
      {user ? (
        <Layout>
          <DashboardTop title={"Todos los productos"} />
          <TableContainer color={"#000"} layerStyle={"primaryBox"} mt="15px">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>
                    <Flex direction={"column"} gap={3}>
                      <InputGroup>
                        <Input
                          placeholder="Filtrar por nombre"
                          {...register("nameFilterValue")}
                        />
                        <FilterButton />
                      </InputGroup>
                      <Text>Nombre</Text>
                    </Flex>
                  </Th>
                  <Th>
                    <Flex direction={"column"} gap={3}>
                      <InputGroup>
                        <Input
                          type={"number"}
                          {...register("priceFilterValue")}
                          placeholder="Filtrar por precio"
                        />

                        <FilterButton />
                      </InputGroup>
                      <Text>Precio</Text>
                    </Flex>
                  </Th>
                  <Th>
                    <Flex direction={"column"} gap={3}>
                      <InputGroup>
                        <Select
                          {...register("categoryFilterValue")}
                          defaultValue={"Cadenas"}
                        >
                          <option value="Cadenas">Cadenas</option>
                          <option value="Collares">Collares</option>
                          <option value="Pulseras">Pulseras</option>
                          <option value="Billeteras">Billeteras</option>
                          <option value="BlackSite">Black Site</option>
                          <option value="Chokers">Chokers</option>
                          <option value="Sets">Sets</option>
                        </Select>

                        <FilterButton />
                      </InputGroup>
                      <Text>Categoria</Text>
                    </Flex>
                  </Th>
                  <Th />
                  <Th />
                  <Th pb={10}>
                    <Button
                      variant={"secondary"}
                      _hover={{ color: "#000" }}
                      onClick={() => CleanFilters()}
                    >
                      Limpiar filtros
                    </Button>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {productsFilter.map((item) => (
                  <SingleRowProduct key={item.id} {...item} />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Layout>
      ) : (
        <Flex justify={"center"} align={"center"} h={"100vh"}>
          <Spinner color="#ffd30c" />
        </Flex>
      )}
    </>
  );
}
