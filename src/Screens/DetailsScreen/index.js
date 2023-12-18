import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Animated,
  Modal,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, images, COLORS, icons } from "../../constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useStateContext } from "../../context/StateContext/StateContext";

const DetailsScreen = ({ navigation }) => {
  const { colors, isDarkMode } = useStateContext();

  const courses = [
    { name: "Aviation", seats: 10 },
    { name: "Computer Engineering", seats: 5 },
    { name: "Petroleum Engineering", seats: 26 },
    { name: "Electrical Engineering", seats: 40 },
  ];

  const collegeDescription =
    "Vels University is a prestigious institution known for its commitment to academic excellence and holistic development of students.";

  const collegeRatings = "4.5"; // Assume a rating out of 5

  const getBackgroundColor = (seats) => {
    if (seats <= 5) {
      return COLORS.red;
    } else if (seats < 15) {
      return COLORS.blue;
    } else if (seats > 25) {
      return COLORS.green;
    } else if (seats > 35) {
      return COLORS.gold;
    } else {
      return COLORS.white;
    }
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleCoursePress = (index) => {
    setSelectedCourse(courses[index]);
    setModalVisible(true);
  };

  const handleBackgroundPress = () => {
    setModalVisible(false);
    setSelectedCourse(null); // Clear the selected course
  };

  const styles = StyleSheet.create({
    grandParent: {
      flex: 1,
      backgroundColor: colors.background,

      paddingVertical: SIZES.radius,
    },
    college: {
      paddingHorizontal: SIZES.base,
      marginTop: 10,
      flexDirection: "row",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },

    collegename: {
      fontSize: SIZES.h2,
      fontWeight: "bold",
    },
    collegeDescription: {
      fontSize: SIZES.radius * 1,
      color: colors.text,
      textAlign: "justify",
      paddingHorizontal: SIZES.base,
      marginBottom: 10,
      marginTop: 10,
    },
    collegeRatings: {
      fontSize: SIZES.radius * 1,
      color: colors.text,
      textAlign: "center",
      marginBottom: 10,
      fontWeight: "bold",
    },
    image: {
      width: "100%",
      height: 200, // Adjust the height as needed
    },
    card: {
      marginHorizontal: SIZES.base,
      //  backgroundColor:"red"
    },
    detailsText: {
      fontSize: SIZES.body3,
      color: colors.text,
      marginBottom: 10,
    },
    courseItem: {
      backgroundColor: "white",
      borderRadius: SIZES.radius,
      marginBottom: 10,
      padding: SIZES.radius * 2,
      elevation: 3, // Add elevation for Android
      shadowColor: colors.shadow, // Add shadow color for iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      opacity: 0.9,
    },
    courseName: {
      fontSize: SIZES.h3,
      color: colors.text,
    },
    availableSeats: {
      fontSize: SIZES.body3,
      color: colors.text,
      fontWeight: "500",
    },
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
    },
    modalContent: {
      backgroundColor: "white",
      padding: 20,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      elevation: 16,
      shadowColor: colors.shadow, // Add shadow color for iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      width: "100%",
      // height:110,
    },
    // cancelIcon: {
    //   position: "absolute",
    //   top: 0,
    //   right: 0,
    //   bottom:10,
    // },

    // cancelIconWrapper: {
    //   top: 0,
    //   right: 0,
    //   bottom:20,
    //   backgroundColor: COLORS.lightGray, // Set the background color
    //   borderRadius: 20, // Adjust as needed
    //   padding: 5,
    //   flexDirection:"row",
    //   justifyContent:"flex-end"
    // },

    // cancelIcon: {
    //   fontSize: 24,
    //   color: COLORS.black,
    // },
  });

  return (
    <SafeAreaView style={styles.grandParent}>
      <ScrollView>
        <Image
          style={styles.image}
          source={{
            uri: "https://www.collegebatch.com/static/clg-gallery/vels-university-chennai-215168.jpg",
          }}
        />

        <View style={styles.college}>
          <View>
            <Text style={styles.collegename}>Vels University</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("CollegeDetailsScreen")}
          >
            <Text style={{ fontWeight: "bold", color: COLORS.blue1 }}>
              See All
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.collegeDescription}>{collegeDescription}</Text>
        <Text style={styles.collegeRatings}>Ratings: {collegeRatings}</Text>

        <View style={styles.card}>
          <Text
            style={{
              ...styles.detailsText,
              marginBottom: 10,
              fontSize: SIZES.h3,
              fontWeight: "bold",
            }}
          >
            Available Courses:
          </Text>

          {courses.map((course, index) => (
            <TouchableHighlight
              key={index}
              onPress={() => handleCoursePress(index)}
              underlayColor={COLORS.white}
              style={[
                styles.courseItem,
                selectedCourse &&
                  selectedCourse.name === course.name && {
                    backgroundColor: COLORS.blue1,
                  },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  display: "flex",
                }}
              >
                <Text style={styles.courseName}>{course.name}</Text>
                <Text
                  style={[
                    styles.availableSeats,
                    { color: getBackgroundColor(course.seats)},
                  ]}
                >
                  {course.seats} seats
                </Text>
              </View>
            </TouchableHighlight>
          ))}
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <TouchableWithoutFeedback onPress={handleBackgroundPress}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {selectedCourse && (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingBottom: 10,
                    }}
                  >
                    <Text style={styles.courseName}>
                      Course : {selectedCourse.name}
                    </Text>
                    <Text style={styles.availableSeats}>Seat:1</Text>
                  </View>
                )}
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.blue,
                    borderRadius: 16, // Adjust the border radius as needed
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                  }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    // Add logic for the "Proceed" button
                  }}
                >
                  <Text style={{ color: COLORS.white ,textAlign:"center",}}>Proceed</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsScreen;
