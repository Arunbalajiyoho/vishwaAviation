import React, { useRef, useEffect,useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Animated ,
  Modal,
} from "react-native";
// import Header from "../../components/Header";
import { SafeAreaView,useSafeAreaInsets} from "react-native-safe-area-context";
import { FONTS, SIZES, images, COLORS } from "../../constants";
import { useStateContext} from "../../context/StateContext/StateContext";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import SearchScreen from "../SearchScreen";
import CarouselComponent from "../../components/CarouselComponent";
import dummyData from "../../components/dummyData";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import InstituteCard from '../../components/InstituteCard';
import * as Font from 'expo-font';
import Location from '../../components/Location';
import axios from 'axios';


function HomeScreen({ navigation }) {
  const { colors, isDarkMode } = useStateContext();
  const { top } = useSafeAreaInsets();
  // Set your progress value here (between 0 and 1)


  const Logo = require("../../../assets/images/Aviation.png");
  const slideAnim = useRef(new Animated.Value(-100)).current;

  const animations = {
    translateY: useRef(new Animated.Value(-100)).current,
    translateX: useRef(new Animated.Value(-100)).current,
    translateY2: useRef(new Animated.Value(100)).current,
    translateX2: useRef(new Animated.Value(100)).current,
  };

  const slideIn = () => {
    const animationsArray = [
      Animated.timing(animations.translateY, { toValue: 0, duration: 3000, useNativeDriver: false }),
      Animated.timing(animations.translateX, { toValue: 0, duration: 3000, useNativeDriver: false }),
      Animated.timing(animations.translateY2, { toValue: 0, duration: 3000, useNativeDriver: false }),
      Animated.timing(animations.translateX2, { toValue: 0, duration: 3000, useNativeDriver: false }),
    ];

    Animated.parallel(animationsArray).start();
  };

  useEffect(() => {
    slideIn();
  }, []); // Ru
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);

  const handleBoxPress = (boxNumber) => {
    setModalVisible(true);
    setSelectedBox(boxNumber);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedBox(null);
  };

  const styles = StyleSheet.create({
    grandParent: {
      flex: 1,
      // backgroundColor: colors.background,
      paddingHorizontal: SIZES.base,
      paddingVertical: SIZES.radius,
    },
    dashedLine: {
      marginTop: 6,
      // height: 1,
      borderWidth: 0.5,
      borderStyle: "dashed",
      borderColor: "grey",
    },
    row: {
      flexDirection: "row",
      marginVertical: 10,
      justifyContent: "space-evenly",
      marginTop: 30,
    },

    secondrow: {
      flexDirection: "row",
      marginVertical: 10,
      justifyContent: "space-evenly",
      // marginTop: 30,
    },
    iconContainer: {
      // flex: 1,

      alignItems: "center",
      backgroundColor: "#0E2246",

      padding: SIZES.radius * 3,
      // borderRadius: 50,
      color: COLORS.primary,
    },
    icon: {
      width: 50, // Adjust the width and height according to your icon size
      height: 50,
     
    },

    box: {
      width: 150, // Adjust the width as needed
      height: 150, // Adjust the height as needed
      backgroundColor: "#0E2246", // Adjust the background color as needed
      padding: 10,
      position: "relative", // Needed for absolute positioning within the box
      borderRadius: 20,
    },
   
    text: {
      position: "absolute", // Position the text absolutely within the box
      bottom: 40, // Adjust the bottom position as needed
      left: 25, // Adjust the left position as needed
      color: "white",  
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
    },
    name: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent:"space-between"
    },
  
    heading: {
      fontSize: SIZES.h3,
      fontWeight: "bold",
      marginLeft: SIZES.radius,
      color: colors.textColor,
    },
    heading1: {
      fontSize: SIZES.h4,
      fontWeight: "bold",
      marginLeft: SIZES.radius*2,
      color: colors.textColor,
    },
    
  });

  //axios
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.29.245:8000/api/courses/show');
        setResponseData(response.data.data.data);
      } catch (error) {
        setError(error);
      }
    };
    console.log(responseData)
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.grandParent}>
      <ScrollView showsVerticalScrollIndicator={false}>
       <View
          style={{
            flex: 1,
            // alignItems: "center",
            justifyContent: "center",
            marginLeft: SIZES.base,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Image
              style={{ width: "100%", height: 70, borderRadius: 50 }}
              source={Logo}
            />

          
          </View>
        </View> 


      

        <View style={styles.dashedLine} />

       

        <View style={{ paddingVertical: SIZES.radius }}>
          <CarouselComponent />
        </View>


        

      

          

        <View>

        <Animated.View style={{ ...styles.row, transform: [{ translateY: animations.translateY }] }}>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate("SearchScreen")}>
          <AntDesign name="idcard" size={28} color="white" />
          <Text style={styles.text}>Search by ID</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate("SearchScreen")}>
          <FontAwesome name="institution" size={28} color="white" />
          <Text style={styles.text}>Search by Institutes</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Second Row */}
      <Animated.View style={{ ...styles.secondrow, transform: [{ translateX: animations.translateX }] }}>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate("SearchScreen")}>
          <Entypo name="location" size={28} color="white" />
          <Text style={styles.text}>Search by Location</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box} onPress={() =>navigation.navigate("SearchScreen")}>
          <FontAwesome5 name="discourse" size={28} color="white" />
          <Text style={styles.text}>Search by  Courses</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* <Modal
      height={400}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View  style={{ backgroundColor: 'lightgrey', padding: 16, height: '50%',borderTopLeftRadius:20,borderTopRightRadius:100 }}>
         
            <Text>Modal Content for Box {selectedBox}</Text>
            <TouchableOpacity onPress={closeModal}>
              <Text>Close Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
      </View>

    
        <View>
          <View  style={{ paddingVertical: SIZES.radius }}>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>Courses</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} >
            {responseData?.map((item, index) => (
              <View 
              style={{marginTop:SIZES.radius,flex:1,alignItems:"center",width:100}}
              >
                <View
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 80,
                    marginRight: 16,
                    paddingHorizontal: SIZES.base,
                  }}
                >
                  <Image
                    source={{ uri: item.imageuri }}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 80,
                      marginRight: 10,
                      borderWidth: 3,
                      borderColor: "grey",
                    }}
                  />
                </View>

                <View style={styles.username}>
                <Text  style={{ ...FONTS.h3, flexShrink: 1, fontWeight: "bold"  }}>
                    {item.name}
                    </Text>
                </View>
              </View>
            ))}
          </ScrollView>

              

          <ScrollView
              style={{ marginTop: SIZES.radius*2 }}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {dummyData.coursecard.map((item, index) => (
                <InstituteCard
                  name={item.name}
                  hrs={item.hrs}
                  km={item.km}
                  price={item.price}
                  rating={item.rating}
                  img={item.img}
                  key={index}
                  details={item.details}
                  address={item.address}
                />
              ))}
            </ScrollView>








          <View style={{ paddingVertical: SIZES.radius }}>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>
              Top Colleges
            </Text>
          </View>

          {dummyData.value.map((item, index) => (
            <Pressable
              style={{
                backgroundColor: "white",
                elevation: 1,
                marginHorizontal: 10,
                borderRadius: 10,
                marginTop: 20,
              }}
            >
              <Image
                source={{ uri: item.imageuri }}
                style={{
                  height: 200,
                  width: "auto",
                  marginTop: 1,
                  borderRadius: 10,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 8,
                  paddingTop: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 500,
                  }}
                >
                  {item.title}
                </Text>
                <View
                  style={{
                    width: 40,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#3cb25a",
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 12,
                    }}
                  >
                    {item.rating}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  color: "#9197a5",
                  fontWeight: "400",
                  fontSize: 12,
                  paddingLeft: 8,
                  paddingTop: 3,
                }}
              >
                {item.description}
              </Text>
              <Text
                style={{
                  color: "#9197a5",
                  fontSize: 12,
                  paddingLeft: 8,
                  paddingBottom: 4,
                }}
              >
                {item.time}
              </Text>
              <View
                style={{
                  borderWidth: 0.4,
                  borderStyle: "dashed",
                  borderColor: "#8f8a8a",
                }}
              ></View>
              <Text
                style={{
                  color: "#7599ec",
                  fontWeight: 700,
                  paddingLeft: 8,
                  fontSize: 13,
                  paddingTop: 5,
                  paddingBottom: 5,
                }}
              >
                {item.offer}
              </Text>
            </Pressable>
          ))}
        </View>



      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;





