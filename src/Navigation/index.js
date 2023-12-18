import React from "react";
import CreateNativeStackNavigator, {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import BottomTabs from "../Screens/BottomTabs";

import {
  HomeScreen,
  HelpScreen,
  SearchScreen,
  ProfileScreen,
  CertificateScreen,
  DetailsScreen,
  CollegeDetailsScreen,
  SplashScreen,
} from "../Screens";



const Navigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
     
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
       <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
       <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
       <Stack.Screen name="CollegeDetailsScreen" component={CollegeDetailsScreen} />
       <Stack.Screen name="HomeScreen" component={HomeScreen} />    
       <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="CertificateScreen" component={CertificateScreen} />
      <Stack.Screen name="HelpScreen" component={HelpScreen} />
     
    

    </Stack.Navigator>
  );
};

export default Navigation;
