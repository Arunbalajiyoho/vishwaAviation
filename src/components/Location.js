import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import { FONTS, SIZES, images, COLORS } from "../constants";
import { useStateContext } from "../context/StateContext/StateContext";
import { Entypo, FontAwesome } from '@expo/vector-icons';

const Location = () => {
  const { colors, isDarkMode } = useStateContext();

  const collegeLocation = {
    latitude: 12.966, // Replace with the actual latitude of Vels University
    longitude: 80.1423, // Replace with the actual longitude of Vels University
  };

  const collegeContact = {
    address: "Vels University, Chennai, India",
    phone: "+91 9585949851",
    email: "balajiarun533@gmail.com",
  };

  const handleLinkPress = (link) => {
    Linking.openURL(link);
  };

  const styles = StyleSheet.create({
    grandParent: {
      flex: 1,
      backgroundColor: colors.background,
      paddingVertical: SIZES.radius,
    },

    mapContainer: {
      height: 300,
      width: 330,
      margin: SIZES.base,
      borderRadius: SIZES.radius,
      overflow: "hidden",
      elevation: 3,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    contactContainer: {
      margin: SIZES.base,
    },
    contactText: {
      fontSize: SIZES.body2,
      color: COLORS.blue1,
      marginBottom: 8,
      textDecorationLine: "underline", // Underline the link
    },
  });

  return (
    <SafeAreaView style={styles.grandParent}>
      <ScrollView>
        <View style={styles.contactContainer}>
          <Text
            style={styles.contactText}
            onPress={() =>
              handleLinkPress(
                `geo:0,0?q=${encodeURIComponent(collegeContact.address)}`
              )
            }
          >
            <Entypo
              name="location-pin"
              size={20}
              color="black"
              style={styles.icon}
            />
            {collegeContact.address}
          </Text>
          <Text
            style={styles.contactText}
            onPress={() => handleLinkPress(`tel:${collegeContact.phone}`)}
          >
            <FontAwesome
              name="phone"
              size={20}
              color="black"
              style={styles.icon}
            />
            Phone: {collegeContact.phone}
          </Text>
          <Text
            style={styles.contactText}
            onPress={() => handleLinkPress(`mailto:${collegeContact.email}`)}
          >
            <Entypo name="email" size={20} color="black" style={styles.icon} />
            Email: {collegeContact.email}
          </Text>
        </View>

        <View style={styles.mapContainer}>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: collegeLocation.latitude,
              longitude: collegeLocation.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          >
            <Marker coordinate={collegeLocation} title="Vels University" />
          </MapView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Location;
