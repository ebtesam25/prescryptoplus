import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { skipPartiallyEmittedExpressions } from 'typescript';

let customFonts  = {
    'Avenir': require('../assets/fonts/Avenir.ttf'),
  };
  
export default class Menu extends React.Component  {
    state = {
      fontsLoaded: false,
    };
  
    async _loadFontsAsync() {
      await Font.loadAsync(customFonts);
      this.setState({ fontsLoaded: true });
    }
  
    componentDidMount() {
      this._loadFontsAsync();
    }
  
    render(){
        if (this.state.fontsLoaded) {
        return (
        <View style={styles.container}>
        <Image source={require('../assets/home.png')} style={styles.menu}></Image>
        <Text style={styles.hometxt} onPress={() => this.props.navigation.navigate('Home')}>HOME</Text>
        <Text style={styles.name}>John Doe</Text>
          
          <Text style={styles.h1} onPress={() => this.props.navigation.navigate('Temp')}>Temperature</Text>
          <Text style={styles.h1} onPress={() => this.props.navigation.navigate('Pulse')}>Pulse Rate</Text>
          <Text style={styles.h1} onPress={() => this.props.navigation.navigate('Oxygen')}>Oxygen</Text>
          <Text style={styles.h1} onPress={() => this.props.navigation.navigate('Weight')}>Weight</Text>
          <Text style={styles.h1} onPress={() => this.props.navigation.navigate('Steps')}>Steps</Text>
          <Text style={styles.h1} onPress={() => this.props.navigation.navigate('Gsr')}>GSR</Text>

          <Image source={require('../assets/menuback.png')} style={styles.menufoot}></Image>
        </View>
        );
        }
        else {
        return <AppLoading />;
        }
      }
    }

    const styles = StyleSheet.create({
        container: {
          height:'100%',
          position:'relative',
          backgroundColor: '#0a2463',
        },
        menu: {
            height:30,
            width:30,
            position:'absolute',
            top:'11%',
            left:'10%',
            zIndex:2,
        },
        name:{
            fontFamily:'Avenir',
            fontSize:45,
            position:'absolute',
            top:'10%',
            alignSelf:'center',
            right:'10%',
            color:'#247ba0',
        }, 
        hometxt:{
            fontSize:35,
            color:'transparent',
            zIndex:4,
            top:'10%',
        },
          h1:{
              fontSize:35,
              fontFamily:'Avenir',
              color:'#c0e1f0',
              zIndex:2,
              top:'18%',
              left:'12%',
          },
          menufoot:{
              height:'70%',
              width:'70%',
              resizeMode:'contain',
              position:'absolute',
              zIndex:1,
              alignSelf:'center',
              opacity:0.5,
              bottom:-100
          }

        
      });