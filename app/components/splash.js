import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

let customFonts  = {
    'Avenir': require('../assets/fonts/Avenir.ttf'),
  };
  
export default class Splash extends React.Component  {
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
        <Image source={require('../assets/splashhead.png')} style={styles.header}></Image>
          <Image source={require('../assets/splash.png')} style={styles.logo}></Image>
          <Text style={styles.welcome} onPress={() => this.props.navigation.navigate('Selection')}>Welcome</Text>
          <Image source={require('../assets/splashfoot.png')} style={styles.footer}></Image>
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
          backgroundColor: '#f3fcff',
        },
        header:{
          height:'25%',
          width:'100%',
          top:'-2%',
        },
        logo:{
          height:'75%',
          width:'75%',
          resizeMode:'contain',
          zIndex:1,
          position:'absolute',
          alignSelf:'center',
          top:'10%',
        },
        welcome: {
            fontFamily:'Avenir',
            fontSize:100,
            position:'absolute',
            alignSelf:'center',
            top:'40%',
            zIndex:2,
            color:'transparent',
        },
        footer:{
          height:'110%',
          width:'120%',
          alignSelf:'center',
          position:'absolute',
          bottom:'-40%',
          resizeMode:'contain',
        }
      });