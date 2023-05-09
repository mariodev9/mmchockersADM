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
import { deleteProduct } from "../../firebase/services/products";
import { Trash } from "../common/iconos";

export default function DeleteButton({ productId }) {
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
      <Button onClick={onOpen} bg={"#FFE2E2"}>
        <Trash />
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg={"background.100"}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Eliminar Producto
            </AlertDialogHeader>

            <AlertDialogBody>
              Estas seguro? Luego no podras deshacer esta accion.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                colorScheme="red"
                onClick={() =>
                  deleteProduct(
                    productId,
                    succesfullDeleteToast,
                    errorDeleteToast
                  )
                }
                ml={3}
              >
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
