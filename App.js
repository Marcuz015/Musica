import { NavigationContainer } from "@react-navigation/native";

import Play from "./pages/Play";
import Routes from './Routes/Routes'

export default function App() {
  return (
    <NavigationContainer>
      <Routes/>
    </NavigationContainer>
  );
}

