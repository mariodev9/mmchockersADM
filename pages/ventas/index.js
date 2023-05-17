import { useState, useEffect } from "react";
import Layout from "../../components/layout";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import NormalList from "../../components/common/list/NormalList";
import SingleRowSell from "../../components/common/Table/SingleRowSell";
import { getAllSales } from "../../firebase/services/sales";
import useUser from "../../hooks/useUser";
import PageSpinner from "../../components/common/PageSpinner/PageSpinner";

const TableHeadList = [
  "id",
  "nombre",
  "apellido",
  "precio total",
  "fecha",
  "estado del pago",
  "estado de envio",
  "ver detalles",
];

export default function VentasPage() {
  const [allSales, setSales] = useState();
  const user = useUser();

  useEffect(() => {
    getAllSales(setSales);
  }, []);

  return (
    <>
      {user ? (
        <Layout>
          <Box layerStyle={"primaryBox"}>
            <NormalList TableHeadList={TableHeadList}>
              {allSales &&
                allSales.map((sale) => (
                  <SingleRowSell key={sale.id} {...sale} />
                ))}
            </NormalList>
          </Box>
        </Layout>
      ) : (
        <PageSpinner />
      )}
    </>
  );
}
