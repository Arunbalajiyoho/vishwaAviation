import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  PanResponder,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { TabBar, TabView } from "react-native-tab-view";
// import CourseCard2 from "../../Components/CourseCard2";
import { COLORS, FONTS, SIZES, images } from "../../constants";
// import { DummyData } from "../../Constents/dummyData";
import { useStateContext } from "../../context/StateContext/StateContext";
import dummyData from "../../components/dummyData";
import Location from "../../components/Location";
import Modal from "react-native-modal";
import { MaterialIcons } from "@expo/vector-icons";

const AnimatedIndicator = Animated.createAnimatedComponent(ActivityIndicator);
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const TabBarHeight = 48;
const HeaderHeight = 410;

const SafeStatusBar = Platform.select({
  ios: 44,
  android: StatusBar.currentHeight,
});
const tab1ItemSize = (windowWidth - 30) / 2;
const tab2ItemSize = (windowWidth - 30) / 2;
const tab3ItemSize = (windowWidth - 40) / 2;
const tab4ItemSize = (windowWidth - 50) / 2;

const PullToRefreshDist = 150;

const CollegeDetailsScreen = ({ navigation }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const dataCarousel = [
    {
      id: 1,
      title: "Biryani Paradise",
      description: "Delicious and aromatic biryani varieties.",
      image:
        "https://static.zollege.in/public/college_data/images/appImage/25911_VELS_APP.jpg?tr=h-250,w-400,c-force",
    },
    {
      id: 2,
      title: "Spicy Delights",
      description: "Experience the spiciest biryani in town.",
      image:
        "https://www.collegebatch.com/static/clg-gallery/vels-university-chennai-215171.jpg",
    },
    {
      id: 3,
      title: "Hyderabadi Bites",
      description: "Authentic Hyderabadi biryani for foodies.",
      image: "https://wallpapercave.com/dwp1x/wp11877178.jpg",
    },
    {
      id: 4,
      title: "Hyderabadi Bites",
      description: "Authentic Hyderabadi biryani for foodies.",
      image: "https://wallpapercave.com/dwp1x/wp6293134.jpg",
    },
    {
      id: 5,
      title: "Hyderabadi Bites",
      description: "Authentic Hyderabadi biryani for foodies.",
      image: "https://wallpapercave.com/dwp1x/wp11171963.jpg",
    },
    {
      id: 5,
      title: "Hyderabadi Bites",
      description: "Authentic Hyderabadi biryani for foodies.",
      image: "https://wallpapercave.com/dwp1x/wp8906479.jpg",
    },
    // Add more items with similar structure
  ];

 



  const { colors, isDarkMode } = useStateContext();
  const [like, setLike] = useState(false);
  const handlelike = () => {
    setLike(!like);
  };

  const [tabIndex, setIndex] = useState(0);
  const [routes] = useState([
    { key: "tab1", title: "ABOUT" },
    { key: "tab2", title: "GALLERY" },
    // { key: "tab3", title: "ABOUT" },
    { key: "tab4", title: "CONTACT" },
  ]);

  const [canScroll, setCanScroll] = useState(true);
  const [tab1Data] = useState(dummyData.about);
  const [tab2Data] = useState(dummyData.img);
  const [tab3Data] = useState(Array(40).fill(0));
  const [tab4Data] = useState(Array(1).fill(0));

  /**
   * ref
   */
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerScrollY = useRef(new Animated.Value(0)).current;
  // for capturing header scroll on Android
  const headerMoveScrollY = useRef(new Animated.Value(0)).current;
  const listRefArr = useRef([]);
  const listOffset = useRef({});
  const isListGliding = useRef(false); 
  const headerScrollStart = useRef(0);
  const _tabIndex = useRef(0);
  const refreshStatusRef = useRef(false);

  /**
   * PanResponder for header
   */
  const headerPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
      onStartShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation();
        syncScrollOffset();
        return false;
      },

      onMoveShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation();
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderEnd: (evt, gestureState) => {
        handlePanReleaseOrEnd(evt, gestureState);
      },
      onPanResponderMove: (evt, gestureState) => {
        const curListRef = listRefArr.current.find(
          (ref) => ref.key === routes[_tabIndex.current].key
        );
        const headerScrollOffset = -gestureState.dy + headerScrollStart.current;
        if (curListRef.value) {
          // scroll up
          if (headerScrollOffset > 0) {
            curListRef.value.scrollToOffset({
              offset: headerScrollOffset,
              animated: false,
            });
            // start pull down
          } else {
            if (Platform.OS === "ios") {
              curListRef.value.scrollToOffset({
                offset: headerScrollOffset / 3,
                animated: false,
              });
            } else if (Platform.OS === "android") {
              if (!refreshStatusRef.current) {
                headerMoveScrollY.setValue(headerScrollOffset / 1.5);
              }
            }
          }
        }
      },
      onShouldBlockNativeResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        headerScrollStart.current = scrollY._value;
      },
    })
  ).current;

  /**
   * PanResponder for list in tab scene
   */
  const listPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation();
        return false;
      },
      onShouldBlockNativeResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        headerScrollY.stopAnimation();
      },
    })
  ).current;

  /**
   * effect
   */
  useEffect(() => {
    scrollY.addListener(({ value }) => {
      const curRoute = routes[tabIndex].key;
      listOffset.current[curRoute] = value;
    });

    headerScrollY.addListener(({ value }) => {
      listRefArr.current.forEach((item) => {
        if (item.key !== routes[tabIndex].key) {
          return;
        }
        if (value > HeaderHeight || value < 0) {
          headerScrollY.stopAnimation();
          syncScrollOffset();
        }
        if (item.value && value <= HeaderHeight) {
          item.value.scrollToOffset({
            offset: value,
            animated: false,
          });
        }
      });
    });
    return () => {
      scrollY.removeAllListeners();
      headerScrollY.removeAllListeners();
    };
  }, [routes, tabIndex]);

  /**
   *  helper functions
   */
  const syncScrollOffset = () => {
    const curRouteKey = routes[_tabIndex.current].key;

    listRefArr.current.forEach((item) => {
      if (item.key !== curRouteKey) {
        if (scrollY._value < HeaderHeight && scrollY._value >= 0) {
          if (item.value) {
            item.value.scrollToOffset({
              offset: scrollY._value,
              animated: false,
            });
            listOffset.current[item.key] = scrollY._value;
          }
        } else if (scrollY._value >= HeaderHeight) {
          if (
            listOffset.current[item.key] < HeaderHeight ||
            listOffset.current[item.key] == null
          ) {
            if (item.value) {
              item.value.scrollToOffset({
                offset: HeaderHeight,
                animated: false,
              });
              listOffset.current[item.key] = HeaderHeight;
            }
          }
        }
      }
    });
  };

  const startRefreshAction = () => {
    if (Platform.OS === "ios") {
      listRefArr.current.forEach((listRef) => {
        listRef.value.scrollToOffset({
          offset: -50,
          animated: true,
        });
      });
      refresh().finally(() => {
        syncScrollOffset();
        // do not bounce back if user scroll to another position
        if (scrollY._value < 0) {
          listRefArr.current.forEach((listRef) => {
            listRef.value.scrollToOffset({
              offset: 0,
              animated: true,
            });
          });
        }
      });
    } else if (Platform.OS === "android") {
      Animated.timing(headerMoveScrollY, {
        toValue: -150,
        duration: 300,
        useNativeDriver: true,
      }).start();
      refresh().finally(() => {
        Animated.timing(headerMoveScrollY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }
  };

  const handlePanReleaseOrEnd = (evt, gestureState) => {
    // console.log('handlePanReleaseOrEnd', scrollY._value);
    syncScrollOffset();
    headerScrollY.setValue(scrollY._value);
    if (Platform.OS === "ios") {
      if (scrollY._value < 0) {
        if (scrollY._value < -PullToRefreshDist && !refreshStatusRef.current) {
          startRefreshAction();
        } else {
          // should bounce back
          listRefArr.current.forEach((listRef) => {
            listRef.value.scrollToOffset({
              offset: 0,
              animated: true,
            });
          });
        }
      } else {
        if (Math.abs(gestureState.vy) < 0.2) {
          return;
        }
        Animated.decay(headerScrollY, {
          velocity: -gestureState.vy,
          useNativeDriver: true,
        }).start(() => {
          syncScrollOffset();
        });
      }
    } else if (Platform.OS === "android") {
      if (
        headerMoveScrollY._value < 0 &&
        headerMoveScrollY._value / 1.5 < -PullToRefreshDist
      ) {
        startRefreshAction();
      } else {
        Animated.timing(headerMoveScrollY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  const onMomentumScrollBegin = () => {
    isListGliding.current = true;
  };

  const onMomentumScrollEnd = () => {
    isListGliding.current = false;
    syncScrollOffset();
    // console.log('onMomentumScrollEnd');
  };

  const onScrollEndDrag = (e) => {
    syncScrollOffset();

    const offsetY = e.nativeEvent.contentOffset.y;
    // console.log('onScrollEndDrag', offsetY);
    // iOS only
    if (Platform.OS === "ios") {
      if (offsetY < -PullToRefreshDist && !refreshStatusRef.current) {
        startRefreshAction();
      }
    }

    // check pull to refresh
  };

  const refresh = async () => {
    console.log("-- start refresh");
    refreshStatusRef.current = true;
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("done");
      }, 2000);
    }).then((value) => {
      console.log("-- refresh done!");
      refreshStatusRef.current = false;
    });
  };

  const renderCarousel = ({ item, index }) => {
    return (
      <View
        style={{
          marginVertical: SIZES.radius,
        }}
      >
        <View
          style={{
            flexDirection: "row",

            justifyContent: "center",
            alignItems: "center",
            // marginTop: SIZES.radius,
          }}
        >
          <View style={{ width: "100%" }}>
            <ImageBackground
              resizeMode="cover"
              source={{ uri: item.image }}
              style={{
                width: "100%",
                height: 250,
              }}
              // imageStyle={{ borderRadius: 15 }}
            >
              <LinearGradient
                colors={[COLORS.gray2, "transparent"]}
                style={{
                  width: "100%",
                  height: "30%",
                  // borderTopLeftRadius: 15,
                  // borderTopRightRadius: 15,
                }}
              >
                <TouchableOpacity
                  style={{ alignItems: "center", flexDirection: "row" }}
                  onPress={handlelike}
                >
                  <Image
                    src="https://www.ncl-coll.ac.uk/media/tnlnnyze/new-jet.jpg?anchor=center&mode=crop&width=687&height=415&rnd=133323370116770000"
                    style={{ height: 40, width: 40, margin: SIZES.base }}
                  />
                  <View>
                    <Text
                      numberOfLines={1}
                      style={{ ...FONTS.h3, color: COLORS.white }}
                    >
                      Vels Technology
                    </Text>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient
                colors={["transparent", COLORS.gray2]}
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  height: "30%",
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                }}
              ></LinearGradient>
            </ImageBackground>
          </View>
        </View>
      </View>
    );
  };

  /**
   * render Helper
   */
  const renderHeader = () => {
    const y = scrollY.interpolate({
      inputRange: [0, HeaderHeight],
      outputRange: [0, -HeaderHeight],
      extrapolateRight: "clamp",
      // extrapolate: 'clamp',
    });
    return (

      <Animated.View
        {...headerPanResponder.panHandlers}
        style={[styles.header, { transform: [{ translateY: y }] }]}
      >
        {/* <StatusBar /> */}

        <Carousel
          data={dataCarousel}
          renderItem={renderCarousel}
          sliderWidth={SIZES.width}
          itemWidth={SIZES.width}
          // itemHeight={SIZES.height /3}
          autoplay={true}
          autoplayInterval={5000}
          activeSlideAlignment={"start"}
          loop={true}
          onSnapToItem={(index) => setActiveSlide(index)}
        />
        <View style={{ margin: SIZES.base }}>
          <Text style={{ ...FONTS.h3, color: colors.textColor }}>
            Description
          </Text>
        </View>

        <View style={{ margin: SIZES.base }}>
          <Text
            numberOfLines={5}
            style={{
              //   fontFamily: "ProximaNova-Regular",
              fontSize: 12,
              fontWeight: "600",
              color: colors.textColor,
            }}
          >
            VELS Institute of Science, Technology and Advanced Studies (VISTAS)
            is a Deemed-to-be University (VELS University) that is approved by
            UGC (University Grants Commission), Ministry of Human Resource
            Development, AICTE (All India Council for Technical Education), BCI
            (Bar Council of India), PCI, NCTE, IRCLASS, Ministry ...
          </Text>
        </View>
      </Animated.View>
    );
  };

  const rednerTab1Item = ({ item, index }) => {
    return (
      <View style={{ margin: SIZES.base }}>
        <View>
          <Text style={{ ...FONTS.h2, fontWeight: "bold" }}>{item.title}</Text>

          <Text
            //   numberOfLines={5}
            style={{
              marginTop: 10,
              fontSize: 14,

              color: colors.textColor,
              textAlign: "justify",
            }}
          >
            {item.description}
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ ...FONTS.h2, fontWeight: "bold", marginTop: 10 }}>
            {item.subtitle}
          </Text>

          <Text
            //   numberOfLines={5}
            style={{
              fontSize: 14,
              //   fontWeight: "500",
              color: colors.textColor,
              textAlign: "justify",
              marginTop: 20,
            }}
          >
            {item.description1}
          </Text>
        </View>
      </View>
    );
  };

  const rednerTab2Item = ({ item, index }) => {
    return (
      <View
        style={{
          borderRadius: 16,
          marginLeft: index % 2 === 0 ? 0 : 10,
          width: tab2ItemSize,
          height: tab2ItemSize,
          backgroundColor: COLORS.gray3,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => setSelectedImage(item.imgs)}>
          <Image
            style={{
              borderRadius: 16,
              width: tab2ItemSize,
              height: tab2ItemSize,
            }}
            source={{ uri: item.imgs }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderModal = () => {
    return (
      <Modal
        visible={selectedImage !== null} // Adjust the prop name based on your application state
        onRequestClose={() => setSelectedImage(null)} // Handle Android hardware back button
      >
        <ScrollView 
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Image
            style={{ width: "80%", height: "80%", borderRadius: 16 }}
            source={{ uri: selectedImage }}
          />
          <TouchableOpacity
            onPress={() => setSelectedImage(null)}
            style={{
              position: "absolute",
              top: 20,
              right: 20, // Adjusted to the right side
              padding: 10,
              borderRadius: 8,
              backgroundColor: "rgba(0, 0, 0, 0.3)",
            }}
          >
            <MaterialIcons name="cancel" size={29} color="white" />
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    );
  };

  
  //   const rednerTab3Item = ({ item, index }) => {
  //     return (
  //       <View
  //         style={{
  //           borderRadius: 16,
  //           marginLeft: index % 2 === 0 ? 0 : 10,
  //           width: tab3ItemSize,
  //           height: tab3ItemSize,
  //           backgroundColor: COLORS.gray3,
  //           justifyContent: "center",
  //           alignItems: "center",
  //         }}
  //       >
  //         <Text style={{ ...FONTS.h3 }}>{index}</Text>
  //       </View>
  //     );
  //   };

  const rednerTab4Item = ({ item, index }) => {
    return (
      <View
        style={{
          flex: 1,
          borderRadius: 16,
          backgroundColor: colors.background,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Location />
      </View>
    );
  };
  const renderLabel = ({ route, focused }) => {
    return (
      <Text
        style={[
          styles.label,
          {
            opacity: focused ? 1 : 0.5,
            color: focused ? COLORS.blue : COLORS.gray,
          },
        ]}
      >
        {route.title}
      </Text>
    );
  };

  const renderScene = ({ route }) => {
    const focused = route.key === routes[tabIndex].key;
    let numCols;
    let data;
    let renderItem;
    switch (route.key) {
      case "tab1":
        numCols = 1;
        data = tab1Data;
        renderItem = rednerTab1Item;
        break;
      case "tab2":
        numCols = 2;
        data = tab2Data;
        renderItem = rednerTab2Item;
        break;
      case "tab3":
        numCols = 2;
        data = tab3Data;
        renderItem = rednerTab3Item;
        break;
      case "tab4":
        numCols = 1;
        data = tab4Data;
        renderItem = rednerTab4Item;
        break;
      default:
        return null;
    }
    return (
      <Animated.FlatList
        scrollToOverflowEnabled={true}
        // scrollEnabled={canScroll}
        {...listPanResponder.panHandlers}
        numColumns={numCols}
        ref={(ref) => {
          if (ref) {
            const found = listRefArr.current.find((e) => e.key === route.key);
            if (!found) {
              listRefArr.current.push({
                key: route.key,
                value: ref,
              });
            }
          }
        }}
        scrollEventThrottle={16}
        onScroll={
          focused
            ? Animated.event(
                [
                  {
                    nativeEvent: { contentOffset: { y: scrollY } },
                  },
                ],
                { useNativeDriver: true }
              )
            : null
        }
        onMomentumScrollBegin={onMomentumScrollBegin}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListHeaderComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={{
          paddingTop: HeaderHeight + TabBarHeight,
          paddingHorizontal: 10,
          minHeight: windowHeight - SafeStatusBar + HeaderHeight,
        }}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  const renderTabBar = (props) => {
    const y = scrollY.interpolate({
      inputRange: [0, HeaderHeight],
      outputRange: [HeaderHeight, 0],
      // extrapolate: 'clamp',
      extrapolateRight: "clamp",
    });
    return (
      <Animated.View
        style={{
          top: 0,
          zIndex: 1,
          position: "absolute",
          transform: [{ translateY: y }],
          width: "100%",
        }}
      >
        <TabBar
          scrollEnabled
          {...props}
          onTabPress={({ route, preventDefault }) => {
            if (isListGliding.current) {
              preventDefault();
            }
          }}
          style={styles.tab}
          renderLabel={renderLabel}
          indicatorStyle={styles.indicator}
        />
      </Animated.View>
    );
  };

  const renderTabView = () => {
    return (
      <TabView
        onSwipeStart={() => setCanScroll(false)}
        onSwipeEnd={() => setCanScroll(true)}
        onIndexChange={(id) => {
          _tabIndex.current = id;
          setIndex(id);
        }}
        navigationState={{ index: tabIndex, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        initialLayout={{
          height: 0,
          width: windowWidth,
        }}
      />
    );
  };

  const renderCustomRefresh = () => {
    // headerMoveScrollY
    return Platform.select({
      ios: (
        <AnimatedIndicator
          style={{
            top: -50,
            position: "absolute",
            alignSelf: "center",
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [-100, 0],
                  outputRange: [120, 0],
                  extrapolate: "clamp",
                }),
              },
            ],
          }}
          animating
        />
      ),
      android: (
        <Animated.View
          style={{
            transform: [
              {
                translateY: headerMoveScrollY.interpolate({
                  inputRange: [-300, 0],
                  outputRange: [150, 0],
                  extrapolate: "clamp",
                }),
              },
            ],
            backgroundColor: "#eee",
            height: 38,
            width: 38,
            borderRadius: 19,
            borderWidth: 2,
            borderColor: "#ddd",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            top: -50,
            position: "absolute",
          }}
        >
          <ActivityIndicator animating />
        </Animated.View>
      ),
    });
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: SIZES.padding,
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.background,
      height: HeaderHeight,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      backgroundColor: colors.background,
    },
    label: { ...FONTS.h3, color: COLORS.blue },
    tab: {
      elevation: 0,
      shadowOpacity: 0,
      backgroundColor: colors.cardBackground,
      height: TabBarHeight,
    },
    indicator: { backgroundColor: COLORS.blue },
  });
  return (
    <View style={styles.container}>
      {renderTabView()}
      {renderHeader()}
      {renderCustomRefresh()}
      {renderModal()}
    </View>
  );
};

export default CollegeDetailsScreen;
