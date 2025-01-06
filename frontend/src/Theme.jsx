

export const Design = (mode) => ({
  palette: {
    mode,
    primary: {
      main: "#918c76",
      contrastText: "#fff"
    },
    secondary: {
      main: "#60c6b4",
      contrastText: "#000"
    },
    tertiary: {
      main: "#cec5b2",
      contrastText: "#000"
    },
    quarternary: {
      main: "#e8e8e8",
      contrastText: "#000"
    },
    text: {
      primary: "#60c6b4",
      secondary: "#000"
      // primary: 'rgba(255,0,0,0.87)',
      // secondary: 'rgba(255,0,0,0.6)',
      // disabled: 'rgba(255,0,0,0.38)',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiFilledInput-root': {
            backgroundColor: '#C7C7C7FF', // Fondo predeterminado para el TextField filled
            borderRadius: '8px 8px 0px 0px', // Bordes redondeados
            '&:hover': {
              backgroundColor: '#CECCCCFF', // Fondo al hacer hover
            },
            '&.Mui-focused': {
              backgroundColor: '#dbcfbf', // Fondo cuando está enfocado
              borderColor: '#ff2d00', // Borde al enfocar
            },
            '&.Mui-disabled': {
              backgroundColor: '#000', // Fondo cuando está deshabilitado
            },
          },
          '& .MuiFilledInput-input': {
            color: '#333', // Color del texto
          },
          '& .MuiInputLabel-root': {
            color: '#666', // Color de la etiqueta
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#333', // Color de la etiqueta cuando está enfocado
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiFilledInput-root': {
            backgroundColor: '#C7C7C7FF', // Fondo predeterminado para el TextField filled
            borderRadius: '8px 8px 0px 0px', // Bordes redondeados
            '&:hover': {
              backgroundColor: '#CECCCCFF', // Fondo al hacer hover
            },
            '&.Mui-focused': {
              backgroundColor: '#dbcfbf', // Fondo cuando está enfocado
              borderColor: '#ff2d00', // Borde al enfocar
            },
            '&.Mui-disabled': {
              backgroundColor: '#000', // Fondo cuando está deshabilitado
            },
          },
          '& .MuiFilledInput-input': {
            color: '#333', // Color del texto
          },
          '& .MuiInputLabel-root': {
            color: '#666', // Color de la etiqueta
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#333', // Color de la etiqueta cuando está enfocado
          },
        },
      },
    },
  },
});




 // background: {
    //   body:"#f5f5f5",
    //   default: "#F5F5F5",
    //   menu: "#ffffff",
    //   paper: "#ffffff",
    //   cardPensum:  "#ffffff",
    //   cardCourse: "#ffffff",
    //   borderCardCourse: "#353535",
    //   couseSucces: "#8fff99",
    //   courseDenied: "#ff8f8f",
    //   iconCourseSucces: "green",
    //   iconCourseDenied: "#C20000",
    // },
    // text: {
    //   primary: grey[900],
    //   secondary: grey[800]
    // }