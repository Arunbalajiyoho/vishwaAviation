// import React from "react";
// import { View, Text, Image, StyleSheet,TouchableOpacity } from "react-native";
// import { Card, Title, Paragraph } from "react-native-paper";
// import { FONTS, SIZES, images, COLORS } from "../../constants";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { FontAwesome5, MaterialIcons, FontAwesome } from "@expo/vector-icons";
// import { useStateContext } from "../../context/StateContext/StateContext";

// const ProfileScreen = ({navigation}) => {
//   const { colors, isDarkMode } = useStateContext();

//   const styles = StyleSheet.create({
//     grandparent:{
//       flex: 1,
//       paddingVertical:SIZES.radius*2,
//       // paddingHorizontal:SIZES.base,

//     },
//     container: {

//       justifyContent: "center",
//       alignItems: "center",
//     },

//     imageCard: {
//       width: "100%",
//       aspectRatio: 1,
//       overflow: "hidden",
//     },

//     image: {
//       width: "100%",
//       height: "100%",
//       // borderRadius: 10,
//       borderBottomRightRadius:300
//     },

//     detailsCard: {
//       width: "80%",
//       marginTop: "-25%",
//       borderRadius: 10,
//       elevation: 4,
//       zIndex: 1,
//     },

//     text: {
//       marginTop: 16,
//       color: "black",
//     },
//     header: {
//       flexDirection: "row",
//       alignItems: "center",
//     },
//     heading: {
//       fontSize: SIZES.h2,
//       fontWeight: "bold",
//       marginLeft: SIZES.radius,
//     },
//     back: {
//       backgroundColor: colors.iconBackground,

//       padding: SIZES.radius,
//       borderRadius: 10,
//       color: COLORS.primary,
//     },
//   });

//   return (

//     <View style={styles.grandparent}>
//        <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={styles.back}
//         >
//           <FontAwesome5 name="chevron-left" size={16} color={colors.primary} />
//         </TouchableOpacity>

//         <View>
//           <Text style={styles.heading}>Profile</Text>
//         </View>
//       </View>
//     <View style={styles.container}>
//       {/* Image Card */}
//       <View style={styles.imageCard}>
//         <Image
//           style={styles.image}
//           source={{
//             uri:
//               "https://img.freepik.com/premium-photo/portrait-first-year-student-holding-textbook_13339-225793.jpg",
//           }}
//         />
//       </View>

//       {/* Student Information Card */}
//       <Card style={styles.detailsCard}>
//         <Card.Content>
//           <Title style={styles.text}>John Doe</Title>
//           <Paragraph style={styles.text}>Student ID: 12345</Paragraph>
//           <Paragraph style={styles.text}>Email: john.doe@example.com</Paragraph>
//           <Paragraph style={styles.text}>Father: Mr. Doe</Paragraph>
//           <Paragraph style={styles.text}>Mother: Mrs. Doe</Paragraph>
//           <Paragraph style={styles.text}>Location: City, Country</Paragraph>
//         </Card.Content>
//       </Card>
//     </View>
//     </View>
//   );
// };

// export default ProfileScreen;





import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import ImagePicker from "react-native-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/FontAwesome";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import * as Font from 'expo-font';

const ProfileScreen = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [phone, setPhone] = useState("");
  const [Address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDOB] = useState("");
  const [location, setLocation] = useState("");
  const [Passport, setPassport] = useState("");
  const [Father, setFather] = useState("");
  const [Mother, setMother] = useState("");
  validateForm;
  const [isFormValid, setIsFormValid] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    validateForm();
  }, [
    name,
    email,
    password,
    phone,
    Address,
    gender,
    dob,
    location,
    Passport,
    Father,
    Mother,
  ]);

  const validateForm = () => {
    let errors = {};

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };
  const handleImagePicker = () => {
    // Configure the image picker options
    const options = {
      title: "Select Avatar",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    // Show the image picker
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        // Set the selected image URI to the state
        setSelectedImage(response.uri);
      }
    });
  };

  const handleRegistration = () => {
    // Add your registration logic here
    console.log("Registering user:", {
      name,
      email,
      password,
      phone,
      Address,
      gender,
      dob,
      location,
      Passport,
      Father,
      Mother,
    });
  };





  const styles = StyleSheet.create({
    container: {
    
      marginTop: 20,
      alignItems: "center",
    },
    imageCard: {
      overflow: "hidden",
      marginTop: -10,
    },
  
    image: {
      width: 440,
      height: 390,
      borderBottomRightRadius: 460,
      paddingBottom: 50,
      opacity:0.5,
      shadowOpacity: 1,
      shadowColor: "#000",
    },
    Text: {
      color: "white",
      marginTop: 20,
      marginRight: 20,
    },
    card: {
      flex:1,
      backgroundColor: "#F2F2F2",
      borderRadius: 8,
      elevation: 3,
      shadowColor: "#000",
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      marginHorizontal: 16,
      marginVertical: 42,
      padding: 16,
      marginTop: -145,
      width: 330,
      justifyContent:"center",
     
    },
    circularImagePicker: {
      width: 140,
      height: 145,
      borderRadius: 12,
      alignSelf: "center",
      marginBottom: 20, // Adjust as needed
      overflow: "hidden",
      justifyContent: "center",
      alignItems: "center",
      marginTop: -95,
      borderColor: "white", // Set the border color
      borderWidth: 3.5, // Set the border width as needed
    },
    circularImage: {
      width: "100%",
      height: "100%",
    },
  
    title: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between-",
      marginBottom: 12,
    },
  
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 1,
      borderColor: "gray",
      borderRadius: 8,
      marginBottom: 10,
    },
    input: {
      flex: 1,
      height: 40,
      padding: 8,
    },
    icon: {
      position: "absolute",
      right: 10,
      top: 10,
    },
    button: {
      backgroundColor: "black",
      borderRadius: 8,
      paddingVertical: 10,
      alignItems: "center",
      marginBottom: 10,
      width: 150,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
    },
    error: {
      color: "red",
      fontSize: 20,
      marginBottom: 12,
    },
  });

  return (
    <KeyboardAwareScrollView>
      {/* Image Card */}
      <View style={styles.imageCard}>
        <Image
          style={styles.image}
          src="https://buffer.com/library/content/images/2023/10/free-images.jpg"
        />
      </View>
      <View style={styles.imageCard}>
        <TouchableOpacity
          style={styles.circularImagePicker}
          onPress={handleImagePicker}
        >
          {selectedImage ? (
            <Image style={styles.image} source={{ uri: selectedImage }} />
          ) : (
            <Text></Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        {/* ... your existing code ... */}

        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.circularImagePicker}
            onPress={handleImagePicker}
          >
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                style={styles.circularImage}
              />
            ) : (
              <Image
                src="https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=600" // Replace with the path to your default image
                style={styles.circularImage}
              />
            )}
          </TouchableOpacity>

          <View style={styles.iconContainer}>
          <Icon name="id-card" size={16} color="grey" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="ID:"
              value={id}
              onChangeText={setId}
            />
           
          </View>

          <View style={styles.iconContainer}>
            <TextInput 
              style={styles.input}
              placeholder="Name:"
              value={name}
              
              onChangeText={setName}
            />
            <MaterialIcons
              name="drive-file-rename-outline"
              size={22}
              color="grey"
              style={styles.icon}
            />
          </View>

          <View style={styles.iconContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email:"
              value={email}
              onChangeText={setEmail}
            />
            <Icon name="envelope" size={16} color="grey" style={styles.icon} />
          </View>

          <View style={styles.iconContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Entypo name="eye" size={21} color="grey" style={styles.icon} />
          </View>

          <View style={styles.iconContainer}>
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={phone}
              onChangeText={setPhone}
            />
            <Icon name="phone" size={19} color="grey" style={styles.icon} />
          </View>
          <View style={styles.iconContainer}>
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={Address}
              onChangeText={setAddress}
            />
            <Icon
              name="location-arrow"
              size={19}
              color="grey"
              style={styles.icon}
            />
          </View>
          <View style={styles.iconContainer}>
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={location}
              onChangeText={setLocation}
            />
            <Icon
              name="map-marker"
              size={19}
              color="grey"
              style={styles.icon}
            />
          </View>
          <View style={styles.iconContainer}>
            <TextInput
              style={styles.input}
              placeholder="Passport No"
              value={Passport}
              onChangeText={setPassport}
            />
            <Icon name="image" size={18} color="grey" style={styles.icon} />
          </View>
        </View>

        {/* ... more input fields ... */}

        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <TextInput
              style={styles.input}
              placeholder="Gender:                     "
              value={gender}
              onChangeText={setGender}
            />
            <Icon name="user" size={21} color="grey" style={styles.icon} />
          </View>
          <View style={styles.iconContainer}>
            <TextInput
              style={styles.input}
              placeholder="  DOB:                          "
              value={dob}
              onChangeText={setDOB}
            />
            <FontAwesome
              name="calendar"
              size={20}
              color="grey"
              style={styles.icon}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <TextInput
              style={styles.input}
              placeholder="Father's Name:        "
              value={Father}
              onChangeText={setFather}
            />
            <MaterialCommunityIcons
              name="face-man-outline"
              size={23}
              color="grey"
              style={styles.icon}
            />
          </View>
          <View style={styles.iconContainer}>
            <TextInput
              style={styles.input}
              placeholder="  Mother's Name:      "
              value={Mother}
              onChangeText={setMother}
            />
            <MaterialCommunityIcons
              name="face-woman-outline"
              size={21}
              color="grey"
              style={styles.icon}
            />
          </View>
        </View>

        {/* Image picker */}

        {/* LogOut Button */}
        <TouchableOpacity
          style={[styles.button, { opacity: isFormValid ? 1 : 0.5 }]}
          disabled={!isFormValid}
          onPress={handleRegistration}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        {Object.values(errors).map((error, index) => (
          <Text key={index} style={styles.error}>
            {error}
          </Text>
        ))}
      </View>
    </KeyboardAwareScrollView>
  );
};


export default ProfileScreen;
