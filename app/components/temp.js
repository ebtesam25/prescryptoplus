import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import{LineChart} from 'react-native-chart-kit';

let customFonts  = {
    'Avenir': require('../assets/fonts/Avenir.ttf'),
  };
  
export default class Temp extends React.Component  {
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
          <Text style={styles.h1}>TEMPERATURE</Text>
          <Image source={require('../assets/temp.png')} style={styles.logo}></Image>
          <Image source={require('../assets/back.png')} style={styles.body}></Image>
          <Text style={styles.h2}>30ºC</Text>
          <Text style={styles.target}>TARGET: 95%</Text>

          <View style={styles.chart}>
            <LineChart
                data={{
                datasets: [
                    {
                    data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100
                    ]
                    ,color: () => '#c0e1f0', strokeWidth: 4},
                    {
                    data: [
                      95,
                      95,
                      95
                  ],color: () => '#1affd5', strokeWidth: 4}
                ]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={300}
                yAxisInterval={100} // optional, defaults to 1
                chartConfig={{
                backgroundColor: "#247ba0",
                backgroundGradientFrom: "#247ba0",
                backgroundGradientTo: "#247ba0",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#0a2463",
                    fill:"#c0e1f0"
                }
                }}
                bezier
                style={{
                marginVertical: -10,
                }}
            />
            </View>
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
        logo:{
            alignSelf:'center',
            height:200,
            width:200,
            position:'absolute',
            top:'20%',
        },
        body:{
          height:'100%',
          width:'100%',
          alignSelf:'center',
          position:'absolute',
          resizeMode:'contain',
          bottom:-250,
        },
          h1:{
              fontSize:20,
              fontFamily:'Avenir',
              position:'absolute',
              zIndex:2,
              top:'15%',
              alignSelf:'center',
          },
          h2:{
            fontSize:50,
            fontFamily:'Avenir',
            position:'absolute',
            zIndex:2,
            top:'55%',
            alignSelf:'center',
            color:'#fff'
        },
        target:{
          fontSize:30,
          fontFamily:'Avenir',
          position:'absolute',
          zIndex:2,
          top:'62%',
          alignSelf:'center',
          color: '#61CFE5'
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
       chart:{
           bottom:-45,
           position:'absolute',
       }

        
      });