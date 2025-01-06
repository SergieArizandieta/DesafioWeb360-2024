import { grey } from "@mui/material/colors";


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
    text: {
      primary: grey[900],
      secondary: grey[800]
    }
  }
});

