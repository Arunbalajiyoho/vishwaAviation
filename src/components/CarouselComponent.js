
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, Image, SafeAreaView, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const CarouselComponent = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.29.245:8000/api/profile-management/banner/getall');
        setResponseData(response.data.data.data);
      } catch (error) {
        setError(error);
      }
    };
   console.log(responseData)
    fetchData();
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts

 

  const data = [
    {
      id: 1,
      //   title: 'Biryani Paradise',
      description: "Delicious and aromatic biryani varieties.",
      image: "https://jtaviation.in/images/slider/JT-Website-Banner1.jpg",
    },
    {
      id: 2,
      //   title: 'Spicy Delights',
      description: "Experience the spiciest biryani in town.",
      image:
        "https://www.ncl-coll.ac.uk/media/amqerc2r/newcastle_college_aviation_3.jpg",
    },
    {
      id: 3,
      //   title: 'Hyderabadi Bites',
      description: "Authentic Hyderabadi biryani for foodies.",
      image:
        "https://www.asetsafety.ac.in/wp-content/uploads/2022/05/Aviatio.jpeg",
    },
  
    // Add more items with similar structure
  ];

  const renderItem = ({ item }) => (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Image style={{ width: '100%', height: 200, borderRadius: 20 }} source={{ uri: item.image }} />
      {/* <Text style={{ fontSize: 16, fontWeight: '600' }}>{item.title}</Text> */}
    </View>
  );

  const renderPagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {data.map((item, index) => (
          <View
            key={item.id}
            style={[
              styles.paginationDot,
              { backgroundColor: index === activeSlide ? 'black' : 'lightgray' },
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginHorizontal: 20 }}>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={380}
        itemWidth={340}
        itemHeight={450}
        autoplay={true}
        autoplayInterval={3000}
        activeSlideAlignment={'center'}
        loop={true}
        onSnapToItem={(index) => setActiveSlide(index)}
      />
      {renderPagination()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    marginTop:5,
    width: 8,
    height: 8,
    borderRadius: 5, // Half of the width to create a circle
    backgroundColor: 'lightgray',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#0E2246',
    borderStyle: 'dotted', // Set border style to 'dotted'
  },
});

export default CarouselComponent; 