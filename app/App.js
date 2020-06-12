import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from './components/splash';
import Home from './components/home';
import Selection from './components/selection';
import Prescriptionlist from './components/prescriptionlist';
import Presview from './components/presview';
import Menu from './components/menu';
import CameraPill from './components/camerapill';
import PatientProfile from './components/patientprofile';
import Scanqr from './components/scanqr';
import Body from './components/body';
import Temp from './components/temp';
import Pulse from './components/pulse';
import Oxygen from './components/oxygen';
import Weight from './components/weight';
import Steps from './components/steps';
import Gsr from './components/gsr';
import Prescreate from './components/prescreate';
import DocProfile from './components/docprofile';
import Docscan from './components/docscan';


const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen 
        name="Splash" 
        component={Splash}
        options={{ headerShown: false}} 
        /> 
        <Stack.Screen 
        name="Selection" 
        component={Selection}
        options={{ headerShown: false}} 
        /> 
        <Stack.Screen 
        name="Home" 
        component={Home}
        options={{ headerShown: false}} 
        /> 
         <Stack.Screen 
        name="Menu" 
        component={Menu}
        options={{ headerShown: false}} 
        /> 
        <Stack.Screen 
        name="Prescriptionlist" 
        component={Prescriptionlist}
        options={{ headerShown: false}} 
        /> 
        <Stack.Screen 
        name="Presview" 
        component={Presview}
        options={{ headerShown: false}} 
        /> 
        <Stack.Screen 
        name="CameraPill" 
        component={CameraPill}
        options={{ headerShown: false}} 
        /> 
        <Stack.Screen 
        name="PatientProfile" 
        component={PatientProfile}
        options={{ headerShown: false}} 
        /> 
        <Stack.Screen 
        name="Scanqr" 
        component={Scanqr}
        options={{ headerShown: false}} 
        /> 
        <Stack.Screen 
        name="Body" 
        component={Body}
        options={{ headerShown: false}} 
        /> 
         <Stack.Screen 
        name="Temp" 
        component={Temp}
        options={{ headerShown: false}} 
        /> 
        <Stack.Screen 
        name="Pulse" 
        component={Pulse}
        options={{ headerShown: false}} 
        /> 
        <Stack.Screen 
        name="Oxygen" 
        component={Oxygen}
        options={{ headerShown: false}} 
        /> 
        <Stack.Screen 
        name="Weight" 
        component={Weight}
        options={{ headerShown: false}} 
        /> 
        <Stack.Screen 
        name="Steps" 
        component={Steps}
        options={{ headerShown: false}} 
        /> 
         <Stack.Screen 
        name="Gsr" 
        component={Gsr}
        options={{ headerShown: false}} 
        /> 
         <Stack.Screen 
        name="Prescreate" 
        component={Prescreate}
        options={{ headerShown: false}} 
        /> 
         <Stack.Screen 
        name="Docprofile" 
        component={DocProfile}
        options={{ headerShown: false}} 
        /> 
        <Stack.Screen 
        name="Docscan" 
        component={Docscan}
        options={{ headerShown: false}} 
        />
        
        </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
