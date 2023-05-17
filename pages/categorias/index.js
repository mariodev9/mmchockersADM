import React from "react";
import Layout from "../../components/layout";
import useUser from "../../hooks/useUser";
import PageSpinner from "../../components/common/PageSpinner/PageSpinner";

export default function CategoriasPage() {
  const user = useUser();

  return (
    <>
      {user ? (
        <Layout>
          <h1>categorias page</h1>
        </Layout>
      ) : (
        <PageSpinner />
      )}
    </>
  );
}
