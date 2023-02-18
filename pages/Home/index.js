import { useDisclosure } from "@chakra-ui/react";
import useUser from "../../hooks/useUser";
import { Producto, Category, Costo } from "../../components/common/iconos";
// import DashboardTop from "../../components/dashboard/DashboardTop";
import DashboardTop from "../../components/dashboard/DashboardTop";
import LatestProducts from "../../components/dashboard/LatestProducts";
import Layout from "../../components/layout";

const NavLinks = [
  {
    title: "Productos",
    icon: <Producto />,
  },
  {
    title: "Categorias",
    icon: <Category />,
  },
  {
    title: "Costos",
    icon: <Costo />,
  },
];

export default function Home() {
  const user = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Layout>
        <DashboardTop title={"Inicio"} />
        <LatestProducts />
      </Layout>
    </>
  );
}
