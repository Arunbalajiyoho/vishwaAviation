import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES, images } from "../../constants";
import { useStateContext } from "../../context/StateContext/StateContext";

const SplashScreen = ({ navigation }) => {
  const { isDarkMode, colors } = useStateContext();
  const Logo = require("../../../assets/images/Aviation.png");

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("BottomTabs");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.blue1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: SIZES.radius,
      }}
    >
      <StatusBar
        style={isDarkMode ? "light" : "dark"}
        backgroundColor={colors.background}
      />
      <Image
        style={{ height: 150, width: 150 }}
        resizeMode="contain"
        source={Logo}
      />
      <Text style={{ color: colors.textColor, ...FONTS.h1 }}>
       Aviation
      </Text>
      <Text
        style={{
          color: colors.textColor,
          ...FONTS.h5,
          textAlign: "center",
          marginTop: SIZES.base,
          paddingHorizontal: SIZES.base,
        }}
      >
        Grow your your knowledge with YOHO Marketplace. Start your career with
        us
      </Text>
    </SafeAreaView>
  );
};

export default SplashScreen;
