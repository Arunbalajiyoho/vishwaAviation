import { View, Text, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../HomeScreen";
import SearchScreen from "../SearchScreen";
import ProfileScreen from "../ProfileScreen";
import HelpScreen from "../HelpScreen";
import CertificateScreen from "../CertificateScreen";
import { Entypo } from "@expo/vector-icons";
import { SIZES, COLORS } from "../../constants";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useStateContext } from "../../context/StateContext/StateContext";
import { Fontisto } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Icon from "../../components/Icons";
import { Icons } from "../../components/Icons";
import { StyleSheet } from "react-native";
import ColorScreen from "../../components/ColorScreen";
import Colors from "../../constants/Colors";
import Styles from "../../Common/Style";
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';


import * as Animatable from "react-native-animatable";

import React, { useEffect, useRef } from "react";

const TabArr = [
  {
    route: "Home",
    label: "Home",
    type: Icons.Feather,
    icon: "home",
    component: HomeScreen,
    color: Colors.darkOverlayColor,
    alphaClr: Colors.skyBlue,
  },
  {
    route: "Certificate",
    label: "Download",
    type: Icons.Feather,
    icon: "download",
    component: CertificateScreen,
    color: Colors.darkOverlayColor,
    alphaClr: Colors.primaryAlpha,
  },
  {
    route: "HelpScreen",
    label: "Help",
    type: Icons.Feather,
    icon: "help-circle",
    component: HelpScreen,
    color: Colors.darkOverlayColor,
    alphaClr: Colors.primaryAlpha,
  },
  {
    route: "ProfileScreen",
    label: "Profile",
    type: Icons.FontAwesome5,
    icon: "user-graduate",
    component: ProfileScreen,
    color: Colors.darkOverlayColor,
    alphaClr: Colors.primaryAlpha,
  },
  // { route: 'Account', label: 'Account', type: Icons.FontAwesome, icon: 'user-circle-o', component: AccountScreen, color: Colors.primary, alphaClr: Colors.primaryAlpha },
];

const Tab = createBottomTabNavigator();

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const textViewRef = useRef(null);
  useEffect(() => {
    if (focused) {
      viewRef.current.animate({0: {scale: .5, rotate: '0deg'}, 1: {scale: 1.5, rotate: '360deg'}});
    } else {
      viewRef.current.animate({0: {scale: 1.5, rotate: '360deg'}, 1: {scale: 1, rotate: '0deg'}});
    }
  }, [focused])

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View
        ref={viewRef}
        duration={1000}
        style={styles.container}>
        <Icon type={item.type} name={item.icon} color={focused ? Colors.primary : Colors.darkOverlayColor} />
      </Animatable.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const BottomTabs = ({ navigation }) => {
  const { colors, toggleDarkMode } = useStateContext();

  const screenOptions1 = {
    tabBarStyle: {
      // backgroundColor:colors.background,
    },
    tabBarItemStyle: {
      borderRadius: 10,
    },
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 16
        }
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen key={index} name={item.route} component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />
            }}
          />
        )
      })}
    </Tab.Navigator>
  );
};
export default BottomTabs;
