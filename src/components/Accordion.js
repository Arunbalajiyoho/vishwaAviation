import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { useStateContext } from "../context/StateContext/StateContext";
import { COLORS, SIZES, icons,FONTS } from "../constants";



const Accordion = ({ title, content }) => {
    const { colors, isDarkMode } = useStateContext();
  const [expanded, setExpanded] = useState(false);

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };
  const styles = StyleSheet.create({
    accordion: {
      
      borderColor: '#ccc',
      marginBottom: 10,
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
    //   backgroundColor: '#f1f1f1',
      backgroundColor: colors.cardBackground,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
     
      elevation: 1,
      shadowColor: colors.textColor,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 2,
     
      borderRadius: 5,
      height: 40,
      alignItems: "center",
      paddingHorizontal: SIZES.radius,
    },
    title: {
      // ...FONTS.h4,
      color: colors.textColor,
      // fontFamily:"ProximaNova-Regular",
      fontWeight:"600"
    },
    arrow: {
      fontSize: 18,
      color: colors.textColor,
    },
    content: {
      padding: 10,
      backgroundColor: colors.cardBackground,
      color: colors.textColor,
    },
  });
  return (
    <View style={styles.accordion}>
      <Pressable onPress={toggleAccordion}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.arrow}>{expanded ? '▼' : '▶'}</Text>
        </View>
      </Pressable>
      {expanded && <Text style={styles.content}>{content}</Text>}
    </View>
  );
};



export default Accordion;
