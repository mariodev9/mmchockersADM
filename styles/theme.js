import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  // ESTILOS GLOBALES
  styles: {
    global: {
      body: {
        bg: "#171922",
        color: "#fff",
      },
      a: {
        textDecoration: "none",
      },
    },
  },

  breakpoints: {
    mobile: "360px",
    tablet: "834px",
    desktop: "1024px",
  },
  // COLORES
  colors: {
    primary: {
      100: "#212732",
    },
    secondary: {
      100: "#4FD1C5",
    },
    background: {
      100: "#171922",
    },
  },
  // LAYER
  layerStyles: {
    primaryBox: {
      bg: "primary.100",
      w: "full",
      p: "40px 20px",
      color: "white",
      borderRadius: "10px",
    },
  },
  // COMPONENTES
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
      },
      variants: {
        primary: {
          bg: "#4FD1C5",
          color: "#000",
          fontSize: "md",
          padding: "16px 24px",
          _hover: {
            bg: "#3ba0f9",
          },
        },
      },
    },
    // TEXT
    Text: {
      baseStyle: {
        fontWeight: "600",
      },
    },
    Td: {
      baseStyle: {
        paddingBottom: 2,
        paddingTop: 2,
      },
    },
    // CONTAINER
    Container: {
      variants: {
        main: {
          padding: "20px",
          maxWidth: "100%",
        },
      },
    },
  },
});
