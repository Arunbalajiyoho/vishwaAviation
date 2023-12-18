import React from "react";
import { useState } from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import { ImageBackground, Image, Text } from "react-native";
import { useStateContext } from "../context/StateContext/StateContext";
import { SIZES, images, FONTS, COLORS } from "../constants";
import { LinearGradient } from "expo-linear-gradient";

const InstituteCard = ({ rating, name, img, hrs, km, price, index,details,address}) => {
  const star = require("../../assets/icons/star.png");
  const time = require("../../assets/icons/time.png");
  const pricing = require("../../assets/icons/pricing.png");

  const { colors, isDarkMode } = useStateContext();
  return (
    <View
      style={{
        // paddingHorizontal: SIZES.base,
        marginRight: index == 0 ? SIZES.radius : SIZES.radius,
        marginLeft: index == 0 ? SIZES.radius : null,
        width: 160,
        marginBottom: SIZES.padding,
        backgroundColor: "white",
        elevation: 2,
        borderRadius: 10,
      }}
    >
      <ImageBackground
        style={{
          width: "100%",
          height: 140,
          marginBottom: 5,
        }}
        imageStyle={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
        source={{ uri: img.uri }}
      >
        {/* <LinearGradient
          colors={["transparent", "black"]}
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "30%",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          <Text
            style={{
              ...FONTS.h3,
              // fontWeight:'bold',
              color: "white",
              fontFamily: "ProximaNova-Black",
              margin: 10,
              marginTop: 20,
            }}
          >
            90
          </Text>
        </LinearGradient> */}
      </ImageBackground>
      <View style={{ padding: 8 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text numberOfLines={2} style={{ ...FONTS.h3, flexShrink: 1, fontWeight: "bold"  }}>
            {name}
          </Text>
          <View
            style={{
              width: 35,
              height: 22,
              backgroundColor: "green",
              borderRadius: 5,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              padding: 2,
            }}
          >
            <Text style={{ color: "white", fontSize: 13, fontWeight: "bold", }}>
              {rating}
            </Text>
            <Image source={star} style={{ width: 10, height: 10,marginLeft:2 }} />
          </View>
        </View>

        <Text
          numberOfLines={1}
          style={{ fontSize: 13,  }}
        >
         {details}
        </Text>
        <Text
          numberOfLines={1}
          style={{ fontSize: 11,  }}
        >
          {address}
        </Text>
      </View>
    </View>
  );
};

export default InstituteCard;
