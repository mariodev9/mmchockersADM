import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  // ESTILOS GLOBALES
  styles: {
    global: {
      body: {
        bg: "#f3f3f3",
        color: "#fff",
      },
      a: {
        textDecoration: "none",
      },
    },
  },

  layerStyles: {
    informationWraper: {
      w: "100%",
      h: "130px",
      bg: "red",
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
      bg: "#fff",
      w: "full",
      p: "40px 20px",
      borderRadius: "15px",
    },
  },
  // COMPONENTES
  components: {
    Button: {
      baseStyle: {
        bg: "background.100",
        _hover: {
          bg: "none",
        },
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

        secondary: {
          bg: "none",
          _hover: { bg: "none" },
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
