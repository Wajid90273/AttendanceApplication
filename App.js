import React,{useContext} from "react";
import { Easing } from "react-native";
import {StatusBar} from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { createStackNavigator } from '@react-navigation/stack';
import {applyMiddleware, createStore} from 'redux';
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import themeReducer from "./stores/themeReducer";
import { MainLayout } from "./screens";
import { CourseListing } from "./screens";
// import {AuthContext} from '../navigations/AuthProvider'
// import FormButton from "../components/FormButton";
import CourseDetails from "./screens/Course/CourseDetails";
import Attendance from "./components/Attendance";
const Stack=createSharedElementStackNavigator();

const options={
  gestureEnabled:false,
  transitionSpec:{
    open:{
      animation:'timing',
      config:{duration:400,easing:Easing.inOut(Easing.ease)}
    },
    close:{
      animation:'timing',
      config:{duration:400,easing:Easing.inOut(Easing.ease)}
    }
  },
  cardStyleInterpolator:({current:{progress}})=>{
    return {
      cardStyle:{
        opacity:progress
      }
    }
  }
}


// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
// const store = createStoreWithMiddleware(themeReducer);

const store=createStore(
  themeReducer,
  applyMiddleware(thunk)
)
const App = () => {

   // const {user,logout}=useContext(AuthContext);
    return (
        <Provider store={store}>
        <NavigationContainer>
           {/* // <StatusBar hidden /> */}
           <StatusBar barStyle="light-content" />
            <Stack.Navigator
                screenOptions={{
                  useNativeDriver:true,
                    headerShown: false
                }}
                initialRouteName={'Dashboard'}
                detachInactiveScreens={false}
            >
                <Stack.Screen
                    name="Dashboard"
                    component={MainLayout}
                   
                />
                <Stack.Screen
                   name="CourseListing"
                   component={CourseListing}
                   options={()=> options}
                />
                <Stack.Screen
                   name="CourseDetails"
                   component={CourseDetails}
                />
                 <Stack.Screen
                   name="Attendance"
                   component={Attendance}
                />
            </Stack.Navigator>
        </NavigationContainer>
        </Provider>
    )
}

export default App





















