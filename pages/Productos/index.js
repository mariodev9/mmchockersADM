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
} from "@chakra-ui/react";
import { getAllProducts } from "../../firebase/services/products";
import SingleRowProduct from "../../components/products/SingleRowProduct";
import { Filter } from "../../components/common/iconos";
import DashboardTop from "../../components/dashboard/DashboardTop";
import Layout from "../../components/layout";
import { useForm } from "react-hook-form";

export default function Productos() {
  const [products, setProducts] = useState([]);
  const [productsFilter, setProductsFiltred] = useState([]);

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

    // Filtro por precio
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

    // Filtro por categorias
    filtredProducts = filtredProducts.filter(
      (product) => product.category === watchAllFields.categoryFilterValue
    );

    return filtredProducts;
  }

  function FilterProducts() {
    setProductsFiltred(getFilterProducts());
  }

  function CleanFilters() {
    setProductsFiltred(products);
  }

  return (
    <>
      <Layout>
        <DashboardTop title={"Todos los productos"} />
        <TableContainer color={"#fff"} layerStyle={"primaryBox"} mt="15px">
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
                      <Button ml={2} onClick={() => FilterProducts()}>
                        <Filter />
                      </Button>
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

                      <Button ml={2} onClick={() => FilterProducts()}>
                        <Filter />
                      </Button>
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
                      </Select>
                      <Button ml={2} onClick={() => FilterProducts()}>
                        <Filter />
                      </Button>
                    </InputGroup>
                    <Text>Categoria</Text>
                  </Flex>
                </Th>
                <Th />
                <Th />
                <Th pb={10}>
                  <Button variant={"outline"} onClick={() => CleanFilters()}>
                    Limpiar filtros
                  </Button>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {productsFilter.map((item, key) => (
                <SingleRowProduct key={item.id} {...item} />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Layout>
    </>
  );
}
