import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

let customFonts  = {
    'Avenir': require('../assets/fonts/Avenir.ttf'),
  };
  
export default class Home extends React.Component  {
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
        <Image source={require('../assets/menu.png')} style={styles.menu}></Image>
        <Text style={{fontSize:30,top:'4%',color:'transparent',position:'absolute',zIndex:5}} onPress={() => this.props.navigation.navigate('Menu')}>MENU</Text>
        <Text style={styles.name}>John Doe</Text>
          <Image source={require('../assets/avatar.png')} style={styles.avatar}></Image>
          <Text style={{fontSize:30,top:'4%',color:'transparent',position:'absolute',zIndex:5, right:0}} onPress={() => this.props.navigation.navigate('PatientProfile')}>PROF</Text>
          <Image source={require('../assets/prescriptions.png')} style={styles.presc}></Image>
          <Text style={styles.h1} onPress={() => this.props.navigation.navigate('Prescriptionlist')}> Prescriptions</Text>
          <Image source={require('../assets/healthmon.png')} style={styles.health}></Image>
          <Text style={styles.h2} onPress={() => this.props.navigation.navigate('Body')}> Health Monitor</Text>
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
          backgroundColor: '#fff',
        },
        menu: {
            height:50,
            width:50,
            position:'absolute',
            top:'3%',
            left:'5%',
            zIndex:2,
        },
        name:{
            fontFamily:'Avenir',
            fontSize:35,
            position:'absolute',
            top:'4%',
            alignSelf:'center',
            color:'#0a2463',
        },
        avatar:{
            height:50,
            width:50,
            position:'absolute',
            top:'3%',
            right:'5%',
            zIndex:2,
        },  
        presc:{
          height:'80%',
          width:'80%',
          alignSelf:'center',
          position:'absolute',
          resizeMode:'contain',
        },
        health:{
            height:'80%',
            width:'80%',
            alignSelf:'center',
            position:'absolute',
            resizeMode:'contain',
            top:'35%',
          },
          h1:{
              fontSize:35,
              fontFamily:'Avenir',
              position:'absolute',
              zIndex:2,
              top:'28%',
              left:'12%',
          },
          h2:{
            fontSize:35,
            fontFamily:'Avenir',
            position:'absolute',
            zIndex:4,
            top:'63%',
            left:'12%',
        },

        
      });