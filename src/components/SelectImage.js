import React, { Component } from 'react';
import firebase from 'firebase';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import Firestack from 'react-native-firestack';
import { 
  Image, 
  Platform,
  Text,
  View,
  PixelRatio,
  TouchableOpacity
} from 'react-native';
import { plantUpdate } from '../actions';

class SelectImage extends Component {
  
  state = { plantSource: null };

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: false
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source;

        if (Platform.OS === 'android') {
          source = { uri: response.uri, isStatic: true };
        } else {
          source = { uri: response.uri.replace('file://', ''), isStatic: true };
        }
       
        this.setState({
          plantSource: source
        });

        const configurationOptions = {
          debug: true
        };

        const firestack = new Firestack(configurationOptions);
        firestack.on('debug', msg => console.log('Received debug message', msg));

        firestack.storage.setStorageUrl(`${'jungle-49e02.appspot.com'}`);
        const filename = this.props.name;

        const { currentUser } = firebase.auth();
        firestack.storage.uploadFile(`user/${currentUser.uid}/${filename}`, source.uri, {
          contentType: 'image/jpeg',
          contentEncoding: 'base64',
        })
        .then(() => console.log('The file has been uploaded'))
        .catch(err => console.error('There was an error uploading the file', err));
      }
    });
  } 

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View style={[styles.plant, styles.plantContainer, { marginBottom: 20 }]}>
          { this.state.plantSource === null ? <Text>Select a Photo</Text> :
            <Image style={styles.plant} source={this.state.plantSource} />
          }
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  plantContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  plant: {
    borderRadius: 75,
    width: 150,
    height: 150
  }
};

const mapStateToProps = (state) => {
  const { name, uid } = state.plantForm;
  return { name, uid };
};

export default connect(mapStateToProps, { plantUpdate })(SelectImage);
