import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

let customFonts  = {
    'Avenir': require('../assets/fonts/Avenir.ttf'),
  };
  
export default class Body extends React.Component  {
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
          <Image source={require('../assets/homebody.png')} style={styles.body}></Image>
          <Text style={styles.h11}>120lbs</Text>
          <Text style={styles.h1}>WEIGHT</Text>
          <Text style={styles.h22}>97%</Text>
          <Text style={styles.h2}>OXYGEN{"\n"}SATURATION</Text>
          <Text style={styles.h33}>60bpm</Text>
          <Text style={styles.h3}>PULSE</Text>
          <Text style={styles.h44}>30ºC</Text>
          <Text style={styles.h4}>BODY{"\n"}TEMPERATURE</Text>
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
        body:{
          height:'80%',
          width:'80%',
          alignSelf:'center',
          position:'absolute',
          resizeMode:'contain',
          bottom:10,
        },
          h1:{
              fontSize:20,
              fontFamily:'Avenir',
              position:'absolute',
              zIndex:2,
              top:'44%',
              left:'12%',
          },
          h2:{
            fontSize:20,
            fontFamily:'Avenir',
            position:'absolute',
            zIndex:2,
            top:'25%',
            left:'10%',
        },
        h3:{
            fontSize:20,
            fontFamily:'Avenir',
            position:'absolute',
            zIndex:2,
            top:'45%',
            right:'20%',
        },
        h4:{
            fontSize:20,
            fontFamily:'Avenir',
            position:'absolute',
            zIndex:2,
            top:'28%',
            right:'6%',
        },
        h11:{
            fontSize:30,
            fontFamily:'Avenir',
            position:'absolute',
            zIndex:2,
            top:'40%',
            left:'12%',
        },
        h22:{
          fontSize:30,
          fontFamily:'Avenir',
          position:'absolute',
          zIndex:2,
          top:'21%',
          left:'10%',
      },
      h33:{
          fontSize:30,
          fontFamily:'Avenir',
          position:'absolute',
          zIndex:2,
          top:'40%',
          right:'20%',
      },
      h44:{
          fontSize:30,
          fontFamily:'Avenir',
          position:'absolute',
          zIndex:2,
          top:'23%',
          right:'22%',
      },

        
      });