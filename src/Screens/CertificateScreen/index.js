import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SIZES } from "../../constants";

import { FontAwesome5, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Circle } from "react-native-svg";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import CircularProgress from 'react-native-circular-progress-indicator';

const CertificateScreen = ({ studentName, counselingDate, collegeName }) => {
  const Logo = require("../../../assets/images/Aviation.png");

  const [fill, setFill] = useState(0);

  useEffect(() => {
    // Update the fill value over time (example)
    const interval = setInterval(() => {
      setFill((prevFill) => (prevFill < 100 ? prevFill + 1 : 0));
    }, 100);

    return () => clearInterval(interval);
  }, []);

 
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={Logo}
      />
      <Text style={styles.title}>Certificate of Attendance</Text>
      <Text style={styles.subtitle}>This is to certify that</Text>
      <Text style={styles.name}>{studentName}</Text>
      <Text style={styles.details}>
        successfully attended the counseling session held on {counselingDate} and
        has selected the college:
      </Text>
      <Text style={styles.collegeName}>{collegeName}</Text>
      <Text style={styles.footer}>Date: {new Date().toDateString()}</Text>
    </View>

//     <View>
     

//      <AnimatedCircularProgress
//       size={80}
//       value={60}
//       width={5}
//       fill={fill}
//       tintColor="#00e0ff"
//       backgroundColor="#3d5875"
//     />


// <CircularProgress value={65} />
// <CircularProgress
//   value={60}
//   radius={50}
//   duration={2000}
//   progressValueColor={'black'}
//   maxValue={200}
 
//   titleColor={'white'}
//   titleStyle={{fontWeight: 'bold'}}
// />
// <CircularProgress
//   value={60}
//   activeStrokeWidth={12}
//   progressValueColor={'#ecf0f1'}
// />

    
//     </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: "100%",
    height: 70,
    borderRadius: 50,
    marginBottom: SIZES.radius * 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  collegeName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  footer: {
    fontSize: 14,
    marginTop: 20,
  },
});

export default CertificateScreen;
