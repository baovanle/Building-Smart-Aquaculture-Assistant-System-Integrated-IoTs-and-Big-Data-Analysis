// drawer
import CustomDrawerContent from "./Menu";
import { Dimensions, Image, } from "react-native";
// header for screens
// screens

import W from "../screens/W";
import PE from "../screens/PE";
import AA from "../screens/AA";
import CS from "../screens/CS";


import Pro from "../screens/Pro";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { nowTheme } from "../constants";
import Images from "../constants/Images";
import tabs from "../constants/tabs";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function HomeStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
      initialRouteName="Chấm công vào"
    >       
      <Stack.Screen
        name="Chấm công vào"
        component={PE}
        options={{
          header: ({ navigation, scene }) => (
            // <Header title="Chấm công vào" navigation={navigation} scene={scene} />
            <Image style={{              
                // height: 45,
                width: "100%",
                resizeMode: 'contain',       
            }} 
            source={Images.Logo} />
          ),
          cardStyle: { backgroundColor: "#FFFFFF", paddingTop: 50 }
        }}
      />   
      <Stack.Screen
        name="Chấm công ra"
        component={W}
        options={{
          header: ({ navigation, scene }) => (
            // <Header title="Chấm công vào" navigation={navigation} scene={scene} />
            <Image style={{              
                // height: 45,
                width: "100%",
                resizeMode: 'contain',       
            }} 
            source={Images.Logo} />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />      
    </Stack.Navigator>
  );
}


function PEStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
      initialRouteName="Chấm công vào"
    >       
      <Stack.Screen
        name="Chấm công vào"
        component={PE}
        options={{
          header: ({ navigation, scene }) => (
            // <Header title="Chấm công vào" navigation={navigation} scene={scene} />
            <Image style={{              
                // height: 45,
                width: "100%",
                resizeMode: 'contain',       
            }} 
            source={Images.Logo} />
          ),
          cardStyle: { backgroundColor: "#FFFFFF", paddingTop: 50 }
        }}
      />   
    </Stack.Navigator>
  );
}


function WStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
      initialRouteName="Chấm công ra"
    >       
      <Stack.Screen
        name="Chấm công ra"
        component={W}
        options={{
          header: ({ navigation, scene }) => (
            // <Header title="Chấm công vào" navigation={navigation} scene={scene} />
            <Image style={{              
                // height: 45,
                width: "100%",
                resizeMode: 'contain',       
            }} 
            source={Images.Logo} />
          ),
          cardStyle: { backgroundColor: "#FFFFFF",  paddingTop: 50  }
        }}
      />      
    </Stack.Navigator>
  );
}

function AAStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
      initialRouteName="Xem lịch sử chấm công"
    >       
      <Stack.Screen
        name="Xem lịch sử chấm công"
        component={AA}
        options={{
          header: ({ navigation, scene }) => (
            // <Header title="Chấm công vào" navigation={navigation} scene={scene} />
            <Image style={{              
                // height: 45,
                width: "100%",
                resizeMode: 'contain',       
            }} 
            source={Images.Logo} />
          ),
          cardStyle: { backgroundColor: "#FFFFFF", paddingTop: 50 }
        }}
      />      
    </Stack.Navigator>
  );
}

function CSStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
      initialRouteName="Đăng ký"
    >       
      <Stack.Screen
        name="Đăng ký"
        component={CS}
        options={{
          header: ({ navigation, scene }) => (
            // <Header title="Chấm công vào" navigation={navigation} scene={scene} />
            <Image style={{              
                // height: 45,                
                // paddingTop: "",                
                width: "100%",
                resizeMode: 'contain',       
            }} 
            source={Images.Logo} 
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF", paddingTop: 50 }
        }}
      />      
    </Stack.Navigator>
  );
}

function AppStack(props) {
  // console.log(props)
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: nowTheme.COLORS.PRIMARY,
        width: width * 0.8,
      }}
      screenOptions={{
        activeTintcolor: nowTheme.COLORS.WHITE,
        inactiveTintColor: nowTheme.COLORS.WHITE,
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden",
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal",
        },
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Onboarding"
        component={Pro}
        option={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
      <Stack.Screen name="PE" component={PEStack} />
      <Stack.Screen name="W" component={WStack} />
      <Stack.Screen name="AA" component={AAStack} />
      <Stack.Screen name="CS" component={CSStack} />
            
    </Stack.Navigator>
  );
}
