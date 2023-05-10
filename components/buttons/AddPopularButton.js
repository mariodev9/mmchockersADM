import React from "react";
import {
  Button,
  useDisclosure,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { Like } from "../common/iconos";
import { addProductToPopular } from "../../firebase/services/products";

export default function AddPopularButton({ isLiked, productId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const toast = useToast();

  const errorDeleteToast = () => {
    toast({
      title: "Ups! hubo un error",
      description: "No se pudo eliminar el producto.",
      status: "error",
      duration: 6000,
      isClosable: true,
      position: "top",
    });
  };

  const succesfullDeleteToast = () => {
    toast({
      title: "Eliminado",
      description: "Producto borrado con exito.",
      status: "success",
      duration: 6000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <>
      <Button onClick={onOpen} bg={"#FFFBEF"}>
        <Like isLiked={isLiked} />
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg={"background.100"}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {isLiked ? "Quitar" : "Agregar "}
              producto a Populares
            </AlertDialogHeader>

            <AlertDialogBody>
              {isLiked ? "Quitaras" : "Agregaras"}
              este producto a la seccion Populares
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button variant={"secondary"} ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                colorScheme="yellow"
                ml={3}
                onClick={() => {
                  addProductToPopular(productId, isLiked), onClose();
                }}
              >
                {isLiked ? "Quitar" : "Agregar"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
