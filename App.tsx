import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Link } from "@react-navigation/native";

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

const RootStack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer linking={linking}>
      <RootStack.Navigator>
        <RootStack.Group>
          <RootStack.Screen name="Home" component={HomeScreen} />
          <RootStack.Screen name="Menu" component={HomeScreen} />
          <RootStack.Screen name="PDP" component={HomeScreen} />
          <RootStack.Screen name="NotFound" component={HomeScreen} />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;

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
function HomeScreen({ route }) {
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
}
