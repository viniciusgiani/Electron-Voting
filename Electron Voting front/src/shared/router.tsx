import { createBrowserRouter } from "react-router-dom";
import RootComponent from "../components/RootComponent";
import LoginComponent from "../components/LoginComponent";
import HomeComponent from "../components/HomeComponent";

// Not used again because HashRouter works best 
// https://stackoverflow.com/questions/36505404/how-to-use-react-router-with-electron/50404777#50404777
export const router = createBrowserRouter([
    {
      path: "/main_window",
      element: <RootComponent />,
      errorElement: <HomeComponent />,
      children: [
        {
          path: "/main_window/login",
          element: <LoginComponent />,
        },
      ]
    },
    
]);

// location.assign('/main_window');