import React from 'react';
import { Text, View, TouchableOpacity, Image,Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';




var imgdata=null;
var url=null;
var cUrl=null;
var pUrl=null;

//var base64Img =null;
export default class CameraPill extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    image: null,
    ref: null,
    res:'',
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  

  render() {
    const { hasCameraPermission } = this.state;
    const {ref} = this.state;
    let { image } = this.state;
    const takePicture = async () => {
   
            const options = {quality: 0.3, base64: true};
            imgdata = await this.camera.takePictureAsync(options);
            url=imgdata.uri;
            console.log('Image Captured');
            console.log(url);
            
            let base64Img = `data:image/jpg;base64,${imgdata.base64}`
      
            
           let cloudinary = 'https://api.cloudinary.com/v1_1/diywehkap/image/upload';
        
            let data = {
              "file": base64Img,
              "upload_preset": "hm4fkyir",
            }
            fetch(cloudinary, {
              body: JSON.stringify(data),
              headers: {
                'content-type': 'application/json'
              },
              method: 'POST',
            }).then(async r => {
              let data = await r.json()
              cUrl=data.secure_url;
              pUrl=cUrl.toString();
              console.log(pUrl);
              x=1;
              return pUrl
          }).then(fetch('http://78a340d08f3e.ngrok.io/pill_analysis2', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'cache-control': 'no-cache'
            },
            body: JSON.stringify({imgurl:pUrl})
          }).then(async r => {
            let ptype = await r;
            
            console.log(ptype.status);  
            console.log(ptype.body)
        }).catch(err=>console.log(err))
    ).catch(err=>console.log(err));
         

            Alert.alert(
              'Image Captured',
              'Your pill has been identified and noted',
              [
                {text: 'Okay', onPress:() => this.props.navigation.goBack()},
              ],
              { cancelable: false }
            )
           

            

            /*var pilldata = new FormData();
            pilldata.append('pill', {
                  uri: url, 
                  name: 'pill.jpg',
                  type: 'image/jpeg'
            });
            
            fetch('http://9bd177cf3ccb.ngrok.io/pill_analysis', {
              headers: {
                'content-type': 'multipart/form-data'
              },
              method: 'POST',
              body: pilldata
            }).then(async r => {
              console.log(pilldata);
              let ptype = await r;
              console.log(ptype.json());
              console.log('Pill Type!');
          }).catch(err=>console.log(err))*/
     
    };

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (

        
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 0.7 }} type={this.state.type} ref={ref => {this.camera = ref;}}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}>
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
              </TouchableOpacity>
            </View>
          </Camera>
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
         
          <Text style={{borderRadius:25, color:'#fff', position:'absolute',zIndex:4,bottom:100, fontFamily:'Avenir', alignSelf:'center', backgroundColor:'#247ba0', paddingVertical:10,paddingHorizontal:20}} onPress={() => takePicture()}>CAPTURE</Text>
        </View>
      );
    }
  }
}