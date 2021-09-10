import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Link } from "@react-navigation/native";

import { createDrawerNavigator } from "@react-navigation/drawer";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Main = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Group>
        <RootStack.Screen name="Home" component={GenericScreen} />
        <RootStack.Screen name="Menu" component={GenericScreen} />
        <RootStack.Screen name="PDP" component={GenericScreen} />
        <RootStack.Screen name="NotFound" component={GenericScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer linking={linking}>
      <MyDrawer />
    </NavigationContainer>
  );
};

export default App;

// ────────────────────────────────────────────────────────────────────────────────

// https://reactnavigation.org/docs/drawer-navigator#api-definition

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: true }}>
      <Drawer.Screen name="Article" component={Main} />
      <Drawer.Screen name="Drawer" component={DrawerScreen} />
    </Drawer.Navigator>
  );
};

// ────────────────────────────────────────────────────────────────────────────────

const DrawerScreen = ({ route }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 40 }}>{route.name}</Text>
    </View>
  );
};

// ────────────────────────────────────────────────────────────────────────────────

const links = [
  { screen: "Home" },
  { screen: "Menu", params: { restaurantSlug: "auspicious-restaurant" } },
  {
    screen: "PDP",
    params: {
      restaurantSlug: "auspicious-restaurant",
      productSlug: "redoubtable-product",
    },
  },
];

const GenericScreen = ({ route }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 40 }}>{route.name}</Text>

      <View
        style={{
          padding: 30,
          margin: 30,
          borderWidth: 1,
          borderColor: "tomato",
        }}
      >
        <Text>LINKS</Text>
        {links.map((link) => (
          // eslint-disable-next-line react-native/no-raw-text
          <Link key={link.screen} to={link}>
            * Go to {link.screen}
          </Link>
        ))}
      </View>
    </View>
  );
};

// ────────────────────────────────────────────────────────────────────────────────

type RootStackParamList = {
  Home: undefined;
  Menu: { restaurantSlug: string };
  PDP: { restaurantSlug: string; productSlug: string };
  NotFound: undefined;
};
const linking = {
  prefixes: ["https://mychat.com", "mychat://"],
  config: {
    screens: {
      Home: { path: "" },
      Menu: { path: ":restaurantSlug/menu" },
      PDP: {
        path: ":restaurantSlug/:productSlug",
      },
      NotFound: { path: "*" },
    },
  },
};
