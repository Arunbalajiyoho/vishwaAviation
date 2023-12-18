import React from "react";
import { View, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useStateContext } from "../Context/StateContext";
import { COLORS, SIZES, icons } from "../Constents";

const SearchModel = ({ title, iconName }) => {
  const { colors } = useStateContext();

  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 60,
          backgroundColor: colors.cardBackground,
          alignItems: "center",
          justifyContent: "center",
          marginLeft: SIZES.base,
          flex: 1,
        }}
      >
        <Ionicons name={iconName} size={50} color={colors.textColor} />
        {/* Use the above line and replace "iconName" with the appropriate property from your data */}
        {/* Example: <Ionicons name={item.iconName} size={50} color={colors.textColor} /> */}
        {/* Adjust the size and color as needed */}
      </View>
    </View>
  );
};

export default SearchModel;
