import React from "react";
import Layout from "../../components/layout";
import { Box } from "@chakra-ui/react";
import NormalList from "../../components/common/list/NormalList";
import SingleRowSell from "../../components/common/Table/SingleRowSell";

const TableHeadList = [
  "id",
  "nombre",
  "apellido",
  "precio total",
  "estado del pago",
  "fecha",
  "ver detalles",
];

export default function VentasPage({ data }) {
  const { sales } = data;
  return (
    <Layout>
      <Box layerStyle={"primaryBox"}>
        <NormalList TableHeadList={TableHeadList}>
          {sales.map((sale) => (
            <SingleRowSell key={sale.id} {...sale} />
          ))}
        </NormalList>
      </Box>
    </Layout>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.BASE_URL}/api/sales`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
