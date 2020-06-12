import React from 'react';
import { StyleSheet, Text, TextInput, View, Image, Dimensions, KeyboardAvoidingView } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

let customFonts  = {
    'Avenir': require('../assets/fonts/Avenir.ttf'),
    'Gilmer': require('../assets/fonts/Gilmer.otf'),
  };
  
export default class Prescreate extends React.Component  {
    constructor(props){
        super(props);
        this.state = {
            fontsLoaded: false,
          };
    }
    
  
    async _loadFontsAsync() {
      await Font.loadAsync(customFonts);
      this.setState({ fontsLoaded: true });
    }
  
    componentDidMount() {
      this._loadFontsAsync();
    }
  
    render(){
        //const { name } = this.props.route.params;
        if (this.state.fontsLoaded) {
            
        return (
        <View style={styles.container}>
        <Image source={require('../assets/menu.png')} style={styles.menu}></Image>
        
        <Text style={styles.name}>Dr. Jane Doe</Text>
          <Image source={require('../assets/avatar.png')} style={styles.avatar}></Image>
          <Text style={{fontSize:30,top:'4%',color:'transparent',position:'absolute',zIndex:5, right:0}} onPress={() => this.props.navigation.navigate('Docprofile')}>PROF</Text>
          <Text style={styles.h1}>Prescription</Text>
          <Text style={styles.h2}>Patient:{"\n"}Patient ID:</Text>
          <Text style={styles.h3}>John Doe{"\n"}10000012</Text>

          <Image source={require('../assets/prescriptionback.png')} style={styles.pillsback}></Image>
          <Image source={require('../assets/targetback.png')} style={styles.pillsback2}></Image>
            

            <TextInput placeholder = "Drug Name   "  style={styles.pill1}></TextInput>
            <Image source={require('../assets/time.png')} style={styles.timeicon}></Image>
            <TextInput placeholder = "Dosage  " style={styles.timetxt}></TextInput>
            <Image source={require('../assets/dosage.png')} style={styles.dosage}></Image>
            <TextInput placeholder = "Quantity   " style={styles.dosagetxt}></TextInput>
            <Image source={require('../assets/refilcount.png')} style={styles.rcount}></Image>
            <TextInput placeholder = "Refill   " style={styles.rcounttxt}></TextInput>
            


            <Text style={styles.pill2}>Target</Text>
            <Image source={require('../assets/shoesm.png')} style={styles.timeicon2}></Image>
            <TextInput  placeholder = "Steps  " style={styles.timetxt} style={styles.timetxt2}></TextInput>
            <Image source={require('../assets/pulsesm.png')} style={styles.dosage2}></Image>
            <TextInput placeholder = "Pulse   " style={styles.dosagetxt2}></TextInput>
            <Image source={require('../assets/weightsm.png')} style={styles.rcount2}></Image>
            <TextInput placeholder = "Weight   " style={styles.rcounttxt2}></TextInput>
            

          <Text style={styles.btn}>SUBMIT</Text>
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
        position:'absolute',
        height:Dimensions.get("window").height,
        width:'100%',
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
          zIndex:3,
        },
       
          h1:{
              fontSize:25,
              fontFamily:'Avenir',
              position:'absolute',
              top:'15%',
              left:'5%',
              zIndex:1,

          },
          h2:{
            fontSize:20,
            fontFamily:'Gilmer',
            position:'absolute',
            zIndex:1,
            top:'20%',
            left:'7%',
            marginBottom:10,
        },
        h3:{
            fontSize:20,
            fontFamily:'Gilmer',
            zIndex:1,
            position:'absolute',
            top:'20%',
            left:'35%',
            marginBottom:5,
            color:'#247ba0',
        },
        pill1:{
            fontSize:25,
            fontFamily:'Gilmer',
            zIndex:4,
            position:'absolute',
            top:'33%',
            left:'20%',
            marginBottom:5,
            color:'#0a2463',
        },
        dosage:{
            height:25,
            width:25,
            resizeMode:'contain',
            position:'absolute',
            zIndex:4,
            top:'42%',
            left:'22%',
        },
        dosagetxt:{
            fontSize:25,
            fontFamily:'Gilmer',
            zIndex:3,
            position:'absolute',
            top:'41.5%',
            left:'30%',
            marginBottom:5,
            color:'#247ba0',
        },
        timeicon:{
            height:25,
            width:25,
            position:'absolute',
            zIndex:4,
            top:'38%',
            left:'22%',
        },
        timetxt:{
            fontSize:25,
            fontFamily:'Gilmer',
            zIndex:3,
            position:'absolute',
            top:'37.5%',
            left:'30%',
            marginBottom:5,
            color:'#247ba0',
        },
        rcount:{
            height:25,
            width:25,
            position:'absolute',
            zIndex:4,
            top:'46%',
            left:'22%',
        },
        rcounttxt:{
            fontSize:25,
            fontFamily:'Gilmer',
            zIndex:3,
            position:'absolute',
            top:'45.5%',
            left:'30%',
            marginBottom:5,
            color:'#247ba0',
        },
    
        pill2:{
            fontSize:25,
            fontFamily:'Gilmer',
            zIndex:4,
            position:'absolute',
            top:'62%',
            left:'21.5%',
            marginBottom:5,
            color:'#0a2463',
        },
        dosage2:{
            height:25,
            width:25,
            resizeMode:'contain',
            position:'absolute',
            zIndex:4,
            top:'71%',
            left:'22%',
        },
        dosagetxt2:{
            fontSize:25,
            fontFamily:'Gilmer',
            zIndex:3,
            position:'absolute',
            top:'70.5%',
            left:'30%',
            marginBottom:5,
            color:'#247ba0',
        },
        timeicon2:{
            height:25,
            width:25,
            resizeMode:'contain',
            position:'absolute',
            zIndex:4,
            top:'67%',
            left:'22%',
        },
        timetxt2:{
            fontSize:25,
            fontFamily:'Gilmer',
            zIndex:3,
            position:'absolute',
            top:'66.5%',
            left:'30%',
            marginBottom:5,
            color:'#247ba0',
        },
        rcount2:{
            height:25,
            width:25,
            resizeMode:'contain',
            position:'absolute',
            zIndex:4,
            top:'75%',
            left:'22%',
        },
        rcounttxt2:{
            fontSize:25,
            fontFamily:'Gilmer',
            zIndex:3,
            position:'absolute',
            top:'74.5%',
            left:'30%',
            marginBottom:5,
            color:'#247ba0',
        },
 
        pillsback:{
            position:'absolute',
            height:'80%',
            width:'80%',
            resizeMode:'contain',
            alignSelf:'center',
            top:'3%',
            zIndex:3,
        },
        pillsback2:{
            position:'absolute',
            height:'80%',
            width:'80%',
            resizeMode:'contain',
            alignSelf:'center',
            top:'32%',
            zIndex:2,
        },
        btn:{
            fontSize:15,
            fontFamily:'Gilmer',
            zIndex:4,
            position:'absolute',
            top:'90%',
            alignSelf:'center',
            marginBottom:5,
            backgroundColor:'#247ba0',
            borderRadius:30,
            paddingHorizontal:20,
            paddingVertical:10,
            color:'white',
        },

        
      });