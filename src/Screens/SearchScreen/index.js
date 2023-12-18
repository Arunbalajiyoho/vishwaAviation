import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FONTS, SIZES, images, COLORS } from "../../constants";
import { useStateContext } from "../../context/StateContext/StateContext";

const mockColleges = [
  {
    id: 1,
    name: "Aviation Institute of Technology",
    courses: ["Aviation", "Aerospace Engineering"],
    image: "https://pbs.twimg.com/media/Eg_cgbbVoAAKP61.jpg",
  },
  {
    id: 2,
    name: "Patron International",
    courses: ["Aerospace Engineering"],
    image: "https://i.pinimg.com/736x/7a/23/42/7a234202f3e6dc2bb5929b34e16fd32a.jpg",
  },
  {
    id: 3,
    name: "yoho International",
    courses: ["Aerospace Engineering"],
    image: "https://i.pinimg.com/736x/d4/b7/dd/d4b7ddbaae0537ae9d42a2b3c46c5024.jpg",
  },
  {
    id: 4,
    name: "Digiphonix International",
    courses: ["Aerospace Engineering"],
    image: "https://pbs.twimg.com/media/EhEoQnlU8AAuC3-.jpg",
  },
  // Add more colleges as needed
];


const SearchScreen = ({navigation}) => {
  const { colors } = useStateContext();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      // marginTop: 30,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: SIZES.radius,
      marginBottom: 10,
      marginTop: 10,
      paddingHorizontal: 10,
      backgroundColor: "#c2c5d1",
    },
    input: {
      flex: 1,
      paddingVertical: 8,
    },
    clearButton: {
      padding: 8,
    },
    searchButton: {
      backgroundColor: "blue",
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
      marginBottom: 10,
    },
    searchButtonText: {
      color: "white",
      fontWeight: "bold",
    },
    card: {
      backgroundColor: "#fff",
      // padding: 8,
      borderRadius: 8,
      marginBottom: 10,
      elevation: 3,
    },
    cardImage: {
      width: '100%',
      aspectRatio: 16 / 9, // You may adjust this aspect ratio based on your images
      borderRadius: 8,
      marginBottom: 10,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 5,
      paddingHorizontal:5,
    },
    cardContent: {
      fontSize: 16,
      paddingHorizontal:5,
      marginBottom: 10,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
    },
    heading: {
      fontSize: SIZES.h2,
      fontWeight: "bold",
      marginLeft: SIZES.radius,
    },
    back: {
      backgroundColor: colors.iconBackground,

      padding: SIZES.radius,
      borderRadius: 10,
      color: COLORS.primary,
    },
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    // Clear the search results if the search query is empty
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    // Filter colleges based on the search query
    const results = mockColleges.filter((college) => {
      const lowercaseQuery = searchQuery.toLowerCase();
      const matchesCollege = college.name
        .toLowerCase()
        .includes(lowercaseQuery);
      const matchesCourse = college.courses.some((course) =>
        course.toLowerCase().includes(lowercaseQuery)
      );
      return matchesCollege || matchesCourse;
    });

    setSearchResults(results);
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const handleClear = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.back}
        >
          <FontAwesome5 name="chevron-left" size={16} color="black" />
        </TouchableOpacity>

        <View>
          <Text style={styles.heading}>Search</Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        {searchQuery !== "" && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Icon name="clear" size={20} color="gray" />
          </TouchableOpacity>
        )}
      </View>
      {searchResults.length > 0 && (
        <>
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate("DetailsScreen")}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.cardImage}
                  resizeMode="contain"
                />
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardContent}>
                  {item.courses.length > 0
                    ? `Courses: ${item.courses.join(", ")}`
                    : "No courses available"}
                </Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}
    </View>
  );
};

export default SearchScreen;












// import React, { useState, useEffect } from "react";
// import { useStateContext } from '../../context/StateContext/StateContext';
// import {
//   View,
//   TextInput,
//   FlatList,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
// } from "react-native";
// import { SIZES,COLORS } from '../../constants';
// import Icon from "react-native-vector-icons/MaterialIcons";
// import { FontAwesome5 } from "@expo/vector-icons";

// const mockColleges = [
//   {
//     id: 1,
//     name: "Aviation Institute of Technology",
//     courses: ["Aviation", "Aerospace Engineering"],
//     image: "https://pbs.twimg.com/media/Eg_cgbbVoAAKP61.jpg",
//   },
//   {
//     id: 2,
//     name: "Patron International",
//     courses: ["Aerospace Engineering"],
//     image: "https://i.pinimg.com/736x/7a/23/42/7a234202f3e6dc2bb5929b34e16fd32a.jpg",
//   },
//   {
//     id: 3,
//     name: "yoho International",
//     courses: ["Aerospace Engineering"],
//     image: "https://i.pinimg.com/736x/d4/b7/dd/d4b7ddbaae0537ae9d42a2b3c46c5024.jpg",
//   },
//   {
//     id: 4,
//     name: "Digiphonix International",
//     courses: ["Aerospace Engineering"],
//     image: "https://pbs.twimg.com/media/EhEoQnlU8AAuC3-.jpg",
//   },
//   // Add more colleges as needed
// ];

// const SearchScreen = ({ navigation }) => {
//   const { colors } = useStateContext();
 
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       padding: 16,
//       marginTop: 30,
//     },
//     inputContainer: {
//       flexDirection: "row",
//       alignItems: "center",
//       borderWidth: 1,
//       borderColor: "#ccc",
//       borderRadius: SIZES.radius,
//       marginBottom: 10,
//       marginTop: 10,
//       paddingHorizontal: 10,
//       backgroundColor: "#c2c5d1",
//     },
//     input: {
//       flex: 1,
//       paddingVertical: 8,
//     },
//     clearButton: {
//       padding: 8,
//     },
//     searchButton: {
//       backgroundColor: "blue",
//       padding: 10,
//       borderRadius: 5,
//       alignItems: "center",
//       marginBottom: 10,
//     },
//     searchButtonText: {
//       color: "white",
//       fontWeight: "bold",
//     },
//     card: {
//       backgroundColor: "#fff",
//       // padding: 8,
//       borderRadius: 8,
//       marginBottom: 10,
//       elevation: 3,
//     },
//     cardImage: {
//       width: '100%',
//       aspectRatio: 16 / 9, // You may adjust this aspect ratio based on your images
//       borderRadius: 8,
//       marginBottom: 10,
//     },
//     cardTitle: {
//       fontSize: 18,
//       fontWeight: "bold",
//       marginBottom: 5,
//       paddingHorizontal:5,
//     },
//     cardContent: {
//       fontSize: 16,
//       paddingHorizontal:5,
//       marginBottom: 10,
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
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);

//   const handleSearch = () => {
//     // Filter colleges based on the search query
//     const results = mockColleges.filter((college) => {
//       const lowercaseQuery = searchQuery.toLowerCase();
//       const matchesCollege = college.name.toLowerCase().includes(lowercaseQuery);
//       const matchesCourse = college.courses.some((course) =>
//         course.toLowerCase().includes(lowercaseQuery)
//       );
//       return matchesCollege || matchesCourse;
//     });

//     setSearchResults(results);
//   };

//   const handleClear = () => {
//     if (searchQuery === "") {
//       // If the search query is empty, show all results
//       setSearchResults(mockColleges);
//     } else {
//       // If the search query is not empty, clear the search query and results
//       setSearchQuery("");
//       setSearchResults([]);
//     }
//   };

//   useEffect(() => {
//     // Initial search when the component mounts
//     handleSearch();
//   }, [searchQuery]);
//   return (
//     <View style={styles.container} >
//        <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
//           <FontAwesome5 name="chevron-left" size={16} color={colors.primary} />
//         </TouchableOpacity>

//         <View>
//           <Text style={styles.heading}>Search</Text>
//         </View>
//                 </View>
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Search..."
//           value={searchQuery}
//           onChangeText={(text) => setSearchQuery(text)}
//         />
//         {searchQuery !== "" && (
//           <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
//             <Icon name="clear" size={20} color="gray" />
//           </TouchableOpacity>
//         )}
//       </View>
//       {searchResults.length > 0 && (
//         <>
//           <FlatList
//             data={searchResults}
//             keyExtractor={(item) => item.id.toString()}
//             renderItem={({ item }) => (
//               <TouchableOpacity
//                 style={styles.card}
//                 onPress={() => console.log("Card pressed")}
//               >
//                 <Image
//                   source={{ uri: item.image }}
//                   style={styles.cardImage}
//                   resizeMode="contain"
//                 />
//                 <Text style={styles.cardTitle}>{item.name}</Text>
//                 <Text style={styles.cardContent}>
//                   {item.courses.length > 0
//                     ? `Courses: ${item.courses.join(", ")}`
//                     : "No courses available"}
//                 </Text>
//               </TouchableOpacity>
//             )}
//           />
//         </>
//       )}
//     </View>
//   );
// };

// export default SearchScreen;
