import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../Screens/WelcomeScreen";
import RegistreScreen from "../Screens/RegistreScreen";
import UsuarioScreen from "../Screens/UsuarioScreen";
import LoginScreen from "../Screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "../Screens/types";


const Stack = createStackNavigator<RootStackParamList>();
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="RegistreScreen" component={RegistreScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="UsuarioScreen" component={UsuarioScreen} />
    </Stack.Navigator>
  );
}
const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Tab.Screen name="RegistreScreen" component={RegistreScreen} />
      <Tab.Screen name="LoginScreen" component={LoginScreen} />
      <Tab.Screen name="UsuarioScreen" component={UsuarioScreen} />
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
