import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from '../(app)/(tabs)/_layout';
// import Explore from '../(app)/(tabs)/explore';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      {/* <Stack.Screen name="Explore" component={Explore} /> */}
    </Stack.Navigator>
  );
}

export { MainStackNavigator };
