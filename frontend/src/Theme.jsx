

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
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            color: 'black', // Texto del campo de entrada
          },
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#cecccc', // Fondo predeterminado para el TextField outlined
          },
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
    MuiPickersDay: {
      styleOverrides: {
        root: {
          color: 'black', // Color de los números en el calendario
          '&.Mui-selected': {
            backgroundColor: 'black', // Fondo del día seleccionado
            color: 'white', // Color del texto del día seleccionado
          },
        },
      },
    },
    MuiPickersYear: {
      styleOverrides: {
        root: {
          color: 'black', // Color de los años
        },
      },
    },
    MuiPickersMonth: {
      styleOverrides: {
        root: {
          color: 'black', // Color de los meses
        },
      },
    },
  },
  MuiDatePicker: {
    styleOverrides: {
      root: {
        color: 'black', // Cambia el color del texto principal
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