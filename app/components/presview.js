import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

let customFonts  = {
    'Avenir': require('../assets/fonts/Avenir.ttf'),
    'Gilmer': require('../assets/fonts/Gilmer.otf'),
  };
  
export default class Presview extends React.Component  {
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
        const { name } = this.props.route.params;
        if (this.state.fontsLoaded) {
            
        return (
        <View style={styles.container}>
        <Image source={require('../assets/menu.png')} style={styles.menu}></Image>
        <Text style={{fontSize:30,top:'4%',color:'transparent',position:'absolute',zIndex:5}} onPress={() => this.props.navigation.navigate('Menu')}>MENU</Text>
        <Text style={styles.name}>John Doe</Text>
          <Image source={require('../assets/avatar.png')} style={styles.avatar}></Image>
          <Text style={{fontSize:30,top:'4%',color:'transparent',position:'absolute',zIndex:5, right:0}} onPress={() => this.props.navigation.navigate('PatientProfile')}>PROF</Text>
          <Text style={styles.h1}>{name}</Text>
          <Text style={styles.h2}>Doctor:</Text>
          <Text style={styles.h3}>Dr. Jane Doe</Text>
          <Text style={styles.h2}>Issued:</Text>
          <Text style={styles.h4}>06/01/2020</Text>

          <Image source={require('../assets/pillback.png')} style={styles.pillsback}></Image>
          <Image source={require('../assets/back_1.png')} style={styles.pillsback2}></Image>
            <Text style={styles.next}>NEXT</Text>
            <Text style={styles.date}>02</Text>
            <Text style={styles.month}>JUNE</Text>
            <Text style={styles.time}>17:00</Text>

            <Text style={styles.pill1}>Panadol</Text>
            <Image source={require('../assets/time.png')} style={styles.timeicon}></Image>
            <Text style={styles.timetxt}>Daily</Text>
            <Image source={require('../assets/dosage.png')} style={styles.dosage}></Image>
            <Text style={styles.dosagetxt}>1</Text>
            <Image source={require('../assets/refilcount.png')} style={styles.rcount}></Image>
            <Text style={styles.rcounttxt}>6</Text>
            <Text style={styles.cam1} onPress={() => this.props.navigation.navigate('CameraPill')}>C1</Text>

            <Image source={require('../assets/target.png')} style={styles.target}></Image>

            <Text style={styles.pill2}>Target</Text>
            <Image source={require('../assets/shoesm.png')} style={styles.timeicon2}></Image>
            <Text style={styles.timetxt2}>6000</Text>
            <Image source={require('../assets/pulsesm.png')} style={styles.dosage2}></Image>
            <Text style={styles.dosagetxt2}>50bpm</Text>
            <Image source={require('../assets/weightsm.png')} style={styles.rcount2}></Image>
            <Text style={styles.rcounttxt2}>120lbs</Text>

          <Text style={styles.btn}>VIEW QR</Text>
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
          width:'100%',
          position:'absolute',
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
          flist:{
            position:'absolute',
            top:'15%',
            left:'12%',
          },
          h1:{
              fontSize:25,
              fontFamily:'Avenir',
              position:'absolute',
              top:'15%',
              left:'5%',
          },
          h2:{
            fontSize:20,
            fontFamily:'Gilmer',
            zIndex:2,
            top:'20%',
            left:'7%',
            marginBottom:5,
        },
        h3:{
            fontSize:20,
            fontFamily:'Gilmer',
            zIndex:3,
            position:'absolute',
            top:'20%',
            left:'25%',
            marginBottom:5,
            color:'#247ba0',
        },
        h4:{
            fontSize:20,
            fontFamily:'Gilmer',
            zIndex:3,
            position:'absolute',
            top:'23.5%',
            left:'25%',
            marginBottom:5,
            color:'#247ba0',
        },
        next:{
            fontSize:25,
            fontFamily:'Gilmer',
            zIndex:3,
            position:'absolute',
            top:'33%',
            left:'20%',
            marginBottom:5,
            color:'#247ba0',
        },
        date:{
            fontSize:55,
            fontFamily:'Gilmer',
            zIndex:3,
            position:'absolute',
            top:'37%',
            left:'20%',
            marginBottom:5,
            color:'#247ba0',
        },
        month:{
            fontSize:25,
            fontFamily:'Gilmer',
            zIndex:3,
            position:'absolute',
            top:'43.5%',
            left:'20%',
            marginBottom:5,
            color:'#247ba0',
        },
        time:{
            fontSize:20,
            fontFamily:'Gilmer',
            zIndex:3,
            position:'absolute',
            top:'47%',
            left:'22%',
            marginBottom:5,
            color:'#247ba0',
        },
        pill1:{
            fontSize:25,
            fontFamily:'Gilmer',
            zIndex:4,
            position:'absolute',
            top:'33%',
            left:'42.5%',
            marginBottom:5,
            color:'#0a2463',
        },
        dosage:{
            height:25,
            width:25,
            position:'absolute',
            zIndex:4,
            top:'42%',
            left:'42%',
        },
        dosagetxt:{
            fontSize:25,
            fontFamily:'Gilmer',
            zIndex:3,
            position:'absolute',
            top:'41.5%',
            left:'50%',
            marginBottom:5,
            color:'#247ba0',
        },
        timeicon:{
            height:25,
            width:25,
            position:'absolute',
            zIndex:4,
            top:'38%',
            left:'42%',
        },
        timetxt:{
            fontSize:25,
            fontFamily:'Gilmer',
            zIndex:3,
            position:'absolute',
            top:'37.5%',
            left:'50%',
            marginBottom:5,
            color:'#247ba0',
        },
        rcount:{
            height:25,
            width:25,
            position:'absolute',
            zIndex:4,
            top:'46%',
            left:'42%',
            resizeMode:'contain',
        },
        rcounttxt:{
            fontSize:25,
            fontFamily:'Gilmer',
            zIndex:3,
            position:'absolute',
            top:'45.5%',
            left:'50%',
            marginBottom:5,
            color:'#247ba0',
        },
        cam1:{
            fontSize:30,
            position:'absolute',
            right:'15%',
            top:'51%',
            zIndex:5,
            color:'transparent',
        },
        target:{
            height:'25%',
            width:'25%',
            resizeMode:'contain',
            left:'14%',
            top:'52%',
        },
        pill2:{
            fontSize:25,
            fontFamily:'Gilmer',
            zIndex:4,
            position:'absolute',
            top:'62%',
            left:'42.5%',
            marginBottom:5,
            color:'#0a2463',
        },
        dosage2:{
            height:25,
            width:25,
            position:'absolute',
            zIndex:4,
            top:'71%',
            left:'42%',
            resizeMode:'contain',
        },
        dosagetxt2:{
            fontSize:25,
            fontFamily:'Gilmer',
            zIndex:3,
            position:'absolute',
            top:'70.5%',
            left:'50%',
            marginBottom:5,
            color:'#247ba0',
        },
        timeicon2:{
            height:25,
            width:25,
            position:'absolute',
            zIndex:4,
            top:'67%',
            left:'42%',
            resizeMode:'contain',
        },
        timetxt2:{
            fontSize:25,
            fontFamily:'Gilmer',
            zIndex:3,
            position:'absolute',
            top:'66.5%',
            left:'50%',
            marginBottom:5,
            color:'#247ba0',
        },
        rcount2:{
            height:25,
            width:25,
            position:'absolute',
            zIndex:4,
            top:'75%',
            left:'42%',
            resizeMode:'contain',
        },
        rcounttxt2:{
            fontSize:25,
            fontFamily:'Gilmer',
            zIndex:3,
            position:'absolute',
            top:'74.5%',
            left:'50%',
            marginBottom:5,
            color:'#247ba0',
        },
        cam2:{
            fontSize:30,
            position:'absolute',
            right:'15%',
            top:'80%',
            zIndex:5,
            color:'transparent',
        },
        pillsback:{
            position:'absolute',
            height:'80%',
            width:'80%',
            resizeMode:'contain',
            alignSelf:'center',
            top:'3%',
        },
        pillsback2:{
            position:'absolute',
            height:'80%',
            width:'80%',
            resizeMode:'contain',
            alignSelf:'center',
            top:'32%',
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