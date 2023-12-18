import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Image, View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import Screen1 from '../screen/Screen1';
import Screen2 from '../screen/Screen2';
import Screen3 from '../screen/Screen3';
import Screen4 from '../screen/Screen4';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation, ...props }) => {
  const navigateToProfile = () => {
    // Add logic to navigate to the profile screen
    // For example: navigation.navigate('ProfileScreen');
  };
  const handleRegisterPress = () => {
    // Add logic for handling Register button press
  };

  const handleLoginPress = () => {
    // Add logic for handling Login button press
  };

  return (
    
    
    <DrawerContentScrollView {...props}>
      {/* Profile Section */}
      <View onPress={navigateToProfile} style={{ padding: 16, flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={require('../assets/images/course_5.png')} // Replace with your profile image URL
          style={{ width: 60, height: 60, borderRadius: 25, marginLeft: -15,marginTop:-80 }}
        />
        <View>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Build your profile</Text>
          <Text style={{ color: 'grey' }}>Job opportunities waiting for you at Naukri</Text>


          {/* New buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleRegisterPress} style={{ ...styles.button, backgroundColor: '#1484CD' }}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.buttonSpacer} />
            <TouchableOpacity onPress={handleLoginPress} style={{ ...styles.button, backgroundColor: '#FF5733' }}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{ height: 1, backgroundColor: '#ECECEC', marginVertical: 10 }} />

      {/* Existing Drawer Items */}
      <DrawerItemList {...props} />

      {/* Additional Drawer Items or Actions */}
      <Text style={{ color: 'grey',marginTop:20 }}>               Version 19.1</Text>

    </DrawerContentScrollView>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 6,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -32,
    marginStart:-50    // Adjust the margin here to bring the buttons closer
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonSpacer: {
    width: 40, // Adjust the width to control the space between the buttons
  },
});

const DrawerScreen1 = () => {
  return (
    <Drawer.Navigator drawerContent={CustomDrawerContent}
   
    screenOptions={{
      drawerStyle: {
        width: '90%', // Set the width as per your requirement
      },
      }}>
      <Drawer.Screen name="search jobs" component={Screen1}  options={{
          drawerIcon: ({ color, size }) => (
            <AntDesign name="search1" size={22} color="grey" />
          ),
        }}/>
      <Drawer.Screen name="Chat for help(New)" component={Screen1}  options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="comment" size={18} color={'grey'} />
          ),
        }} />
      <Drawer.Screen name="Jobseeker services(paid)" component={Screen1}  options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="file-invoice" size={18} color={'grey'} />
          ),
        }} />
      <Drawer.Screen name="Naukri blog" component={Screen1} options={{
          drawerIcon: ({ color, size }) => (
            <AntDesign name="menufold" size={18} color="grey" />
          ),
        }} />
      <Drawer.Screen name="how Naukri work" component={Screen1} options={{
          drawerIcon: ({ color, size }) => (
            <AntDesign name="questioncircleo" size={18} color="grey" />
          ),
        }}/>
      <Drawer.Screen name="Write to us" component={Screen1}  options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="envelope" size={18} color={'grey'} />
          ),
        }}/>
      <Drawer.Screen name="About us" component={Screen1}  options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="info-outline" size={24} color="grey" />
          ),
        }}/>
    </Drawer.Navigator>
  );
};


const DrawerScreen2 = () => {
  return (
    <Drawer.Navigator drawerContent={CustomDrawerContent}
    screenOptions={{
      drawerStyle: {
        width: '90%', // Set the width as per your requirement
      },}}>
     <Drawer.Screen name="search jobs" component={Screen2}  options={{
          drawerIcon: ({ color, size }) => (
            <AntDesign name="search1" size={22} color="grey" />
          ),
        }}/>
      <Drawer.Screen name="Chat for help(New)" component={Screen2}  options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="comment" size={18} color={'grey'} />
          ),
        }} />
      <Drawer.Screen name="Jobseeker services(paid)" component={Screen2}  options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="file-invoice" size={18} color={'grey'} />
          ),
        }} />
      <Drawer.Screen name="Naukri blog" component={Screen2} options={{
          drawerIcon: ({ color, size }) => (
            <AntDesign name="menufold" size={18} color="grey" />
          ),
        }} />
      <Drawer.Screen name="how Naukri work" component={Screen2} options={{
          drawerIcon: ({ color, size }) => (
            <AntDesign name="questioncircleo" size={18} color="grey" />
          ),
        }}/>
      <Drawer.Screen name="Write to us" component={Screen2}  options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="envelope" size={18} color={'grey'} />
          ),
        }}/>
      <Drawer.Screen name="About us" component={Screen2}  options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="info-outline" size={24} color="grey" />
          ),
        }}/>
    </Drawer.Navigator>
  );
};

const DrawerScreen3 = () => {
  return (
    <Drawer.Navigator drawerContent={CustomDrawerContent}
    screenOptions={{
      drawerStyle: {
        width: '90%', // Set the width as per your requirement
      },}}>
       <Drawer.Screen name="search jobs" component={Screen3}  options={{
          drawerIcon: ({ color, size }) => (
            <AntDesign name="search1" size={22} color="grey" />
          ),
        }}/>
      <Drawer.Screen name="Chat for help(New)" component={Screen3}  options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="comment" size={18} color={'grey'} />
          ),
        }} />
      <Drawer.Screen name="Jobseeker services(paid)" component={Screen3}  options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="file-invoice" size={18} color={'grey'} />
          ),
        }} />
      <Drawer.Screen name="Naukri blog" component={Screen3} options={{
          drawerIcon: ({ color, size }) => (
            <AntDesign name="menufold" size={18} color="grey" />
          ),
        }} />
      <Drawer.Screen name="how Naukri work" component={Screen3} options={{
          drawerIcon: ({ color, size }) => (
            <AntDesign name="questioncircleo" size={18} color="grey" />
          ),
        }}/>
      <Drawer.Screen name="Write to us" component={Screen3}  options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="envelope" size={18} color={'grey'} />
          ),
        }}/>
      <Drawer.Screen name="About us" component={Screen3}  options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="info-outline" size={24} color="grey" />
          ),
        }}/>
    </Drawer.Navigator>
  );
};

const DrawerScreen4 = () => {
  return (
    <Drawer.Navigator drawerContent={CustomDrawerContent}
    screenOptions={{
      drawerStyle: {
        width: '90%', // Set the width as per your requirement
      },}}>
      <Drawer.Screen name="search jobs" component={Screen4}  options={{
          drawerIcon: ({ color, size }) => (
            <AntDesign name="search1" size={22} color="grey" />
          ),
        }}/>
      <Drawer.Screen name="Chat for help(New)" component={Screen4}  options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="comment" size={18} color={'grey'} />
          ),
        }} />
      <Drawer.Screen name="Jobseeker services(paid)" component={Screen4}  options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="file-invoice" size={18} color={'grey'} />
          ),
        }} />
      <Drawer.Screen name="Naukri blog" component={Screen4} options={{
          drawerIcon: ({ color, size }) => (
            <AntDesign name="menufold" size={18} color="grey" />
          ),
        }} />
      <Drawer.Screen name="how Naukri work" component={Screen4} options={{
          drawerIcon: ({ color, size }) => (
            <AntDesign name="questioncircleo" size={18} color="grey" />
          ),
        }}/>
      <Drawer.Screen name="Write to us" component={Screen4}  options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="envelope" size={18} color={'grey'} />
          ),
        }}/>
      <Drawer.Screen name="About us" component={Screen4}  options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="info-outline" size={24} color="grey" />
          ),
        }}/>
    </Drawer.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'grey',
        })}
      >
        <Tab.Screen
          name="Home"
          component={DrawerScreen1}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Entypo name="home" size={21} color={focused ? '#1778f2' : 'grey'} />
            ),
          }}
        />
        <Tab.Screen
          name="Applies"
          component={DrawerScreen2}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <FontAwesome5 name="location-arrow" size={18} color={focused ? '#1778f2' : 'grey'} />
            ),
          }}
        />
        <Tab.Screen
          name="Invites"
          component={DrawerScreen3}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="arrow-left-bold-box"
                size={23}
                color={focused ? '#1778f2' : 'grey'}
              />
            ),
          }}
        />
        <Tab.Screen name="Profile" component={DrawerScreen4} options={{ headerShown: false, tabBarIcon: ({ focused }) => (<FontAwesome5 name="user-alt" size={18} color={focused ? '#1778f2' : 'grey'} />),}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};




export default AppNavigator;