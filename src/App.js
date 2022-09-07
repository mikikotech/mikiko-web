import "./App.css";
import React from "react";
import { colors, CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme, useTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import Route from "./route/Route";

const theme = createTheme({
  palette: {
    primary: {
      main: "#34eb8f",
    },
    secondary: {
      main: green[500],
    },
    neutral: {
      main: colors.red[300],
    },
  },
  status: {
    danger: "#d1331b",
  },
});

const App = () => {
  const tema = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Route />
    </ThemeProvider>
  );
};

export default App;

// const App = () => {
//   const { isLoaded } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: "AIzaSyB8StifGXh7mysdscYjTkAlaotOn_H8oFs",
//   });

//   const [map, setMap] = React.useState(null);

//   const onLoad = React.useCallback(function callback(map) {
//     const bounds = new window.google.maps.LatLngBounds(center);
//     map.fitBounds(bounds);
//     setMap(map);
//   }, []);

//   const onUnmount = React.useCallback(function callback(map) {
//     setMap(null);
//   }, []);

//   return isLoaded ? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={14}
//       onLoad={onLoad}
//       onUnmount={onUnmount}
//     >
//       {/* Child components, such as markers, info windows, etc. */}
//       <></>
//     </GoogleMap>
//   ) : (
//     <></>
//   );
// };

// export default App;
