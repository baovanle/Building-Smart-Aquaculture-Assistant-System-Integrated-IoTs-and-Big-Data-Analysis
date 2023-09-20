import axios from 'axios'
import { Camera, CameraType, FlashMode } from 'expo-camera'
import * as FaceDetector from 'expo-face-detector'
import Constants from 'expo-constants'
import { DeviceMotion } from 'expo-sensors'
import React, { Fragment, useState } from 'react'
import ReactNative, {
  BackHandler,
  Image,
  SafeAreaView,
  ScrollView,
  LogBox,
  Pressable,
  Modal,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ImageBackground,
  RefreshControl,
  ActivityIndicator,
  Platform
} from 'react-native'

import { Button } from '../components'
import { Card } from 'react-native-elements'
import Images from '../constants/Images'

import { Block, theme, Text as GText } from 'galio-framework'
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator'
import moment from 'moment'
import * as FileSystem from 'expo-file-system'
import { connect } from 'react-redux'

import { fetchPE } from '../store/actions/aiaqua'
import * as Device from 'expo-device'
import * as Progress from 'react-native-progress'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { w3cwebsocket as W3CWebSocket } from 'websocket'

import * as tf from '@tensorflow/tfjs'
// import * as posedetection from '@tensorflow-models/pose-detection'
// import * as faceDetection from '@tensorflow-models/face-landmarks-detection'
import * as faceDetection from '@tensorflow-models/face-detection'
import * as ScreenOrientation from 'expo-screen-orientation'
import {
  bundleResourceIO,
  cameraWithTensors
} from '@tensorflow/tfjs-react-native'
import Svg, { Circle, Rect } from 'react-native-svg'
import { ExpoWebGLRenderingContext } from 'expo-gl'
import base64 from 'react-native-base64'
import { Buffer } from 'buffer'
import * as MediaLibrary from 'expo-media-library'
import * as jpeg from 'jpeg-js'

import { Amplify, Auth, Storage } from 'aws-amplify'
import awsconfig from './aws-exports'
import { useNavigation } from '@react-navigation/native';

Amplify.configure(awsconfig)

const { width } = Dimensions.get('screen')

class PE extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      dataPE: []
    }
  }

  render () {
    const { isLoading, dataPE } = this.state

    const { navigation, route } = this.props

    if (isLoading) {
      // return <View />
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator
            style={{ width: 300, height: 300 }}
            color={'black'}
          />
        </View>
      )
    } else if (!isLoading) {
      return (
        <View flex style={styles.container}>        
          <Block flex space='between' style={styles.padded}>          
            <ScrollView
              style={{
                flex: 1
              }}
              contentContainerStyle={{
                // width: width * 1.5,
                // height: 500,
                // paddingHorizontal: 10
              }}            
            >
              <Button
            textStyle={{ fontFamily: 'montserrat-regular', fontSize: 18, color: 'black' }}
            style={styles.buttonA}
            onPress={() => navigation.navigate('Onboarding', { isReload: false })}
          >
            Pond Environment
          </Button>
              <Card
                containerStyle={styles.containerCard}
                wrapperStyle={{
                  width: width - theme.SIZES.BASE * 2
                }}
              >
                <Card.Title
                  style={[
                    styles.titleCard,
                    {
                      padding: 15,
                      backgroundColor: '#00906D',
                      color: 'white'
                    }
                  ]}
                >
                  TEMPERATURE
                </Card.Title>
                <Card.Divider />
                {/* <View style={{ flex: 1, flexDirection: "row"}}> */}
                <Block row>
                  <View style={{ flex: 0.5 }}>
                    <Button
                      textStyle={{
                        fontFamily: 'montserrat-regular',
                        fontSize: 36,
                        color: 'blue'
                      }}
                      style={styles.buttonB}
                    >
                      {dataPE[0].temperature_c + "°C"}
                    </Button>
                  </View>
                  <View style={{ flex: 0.5 }}>
                    <Image
                      source={Images.temperature}
                      style={{
                        height: 150,
                        width: 150,
                        resizeMode: 'contain'
                      }}
                    />
                  </View>
                </Block>
                {/* </View> */}
              </Card>
              <Card
                containerStyle={styles.containerCard}
                wrapperStyle={{
                  width: width - theme.SIZES.BASE * 2
                }}
              >
                <Card.Title
                  style={[
                    styles.titleCard,
                    {
                      padding: 15,
                      backgroundColor: '#00906D',
                      color: 'white'
                    }
                  ]}
                >
                  pH
                </Card.Title>
                <Card.Divider />
                {/* <View style={{ flex: 1, flexDirection: "row"}}> */}
                <Block row>
                  <View style={{ flex: 0.5 }}>
                    <Button
                      textStyle={{
                        fontFamily: 'montserrat-regular',
                        fontSize: 36,
                        color: 'blue'
                      }}
                      style={styles.buttonB}
                    >
                      {dataPE[0].ph}
                    </Button>
                  </View>
                  <View style={{ flex: 0.5 }}>
                    <Image
                      source={Images.ph}
                      style={{
                        height: 150,
                        width: 150,
                        resizeMode: 'contain'
                      }}
                    />
                  </View>
                </Block>
                {/* </View> */}
              </Card>
              <Card
                containerStyle={styles.containerCard}
                wrapperStyle={{
                  width: width - theme.SIZES.BASE * 2
                }}
              >
                <Card.Title
                  style={[
                    styles.titleCard,
                    {
                      padding: 15,
                      backgroundColor: '#00906D',
                      color: 'white'
                    }
                  ]}
                >
                  TURBIDITY
                </Card.Title>
                <Card.Divider />
                {/* <View style={{ flex: 1, flexDirection: "row"}}> */}
                <Block row>
                  <View style={{ flex: 0.5 }}>
                    <Button
                      textStyle={{
                        fontFamily: 'montserrat-regular',
                        fontSize: 36,
                        color: 'blue'
                      }}
                      style={styles.buttonB}
                    >
                      {dataPE[0].turbidity_ntu}
                    </Button>
                  </View>
                  <View style={{ flex: 0.5 }}>
                    <Image
                      source={Images.turbidity}
                      style={{
                        height: 150,
                        width: 150,
                        resizeMode: 'contain'
                      }}
                    />
                  </View>
                </Block>
                {/* </View> */}
              </Card>
              <Block
                                style={{
                                  backgroundColor: 'rgba(0,0,0,0)',
                                  marginBottom: 8
                                }}
                              >
                                <Block style={styles.options}>
                                  <Block style={[styles.defaultStyle, {}]}>
                                    <View
                                      style={{
                                        borderBottomColor: 'black',
                                        borderBottomWidth: 2
                                      }}
                                    />
                                  </Block>
                                </Block>
                              </Block>
              <Block
                                style={{
                                  backgroundColor: 'rgba(0,0,0,0)',
                                  marginBottom: 5
                                }}
                              >
                                <Block row style={styles.options}>
                                  <Block
                                    flex
                                    row
                                    style={[styles.defaultStyle, {}]}
                                  >
                                    <View
                                      style={{ flex: 1, flexDirection: 'row' }}
                                    >
                                      <Block row flex>
                                        <View style={{ flex: 0.3 }}>
                                          <Text
                                            style={{
                                              fontFamily: 'montserrat-regular',
                                              // textTransform: "uppercase",
                                              fontWeight: '700',
                                              fontSize: 14
                                            }}
                                            size={18}
                                            bold={false}
                                            color={'#006464'}
                                          >
                                            Date Time
                                          </Text>
                                        </View>
                                        <View style={{ flex: 0.3 }}>
                                          <Text
                                            style={{
                                              fontFamily: 'montserrat-regular',
                                              // textTransform: "uppercase",
                                              fontWeight: '700',
                                              fontSize: 14
                                            }}
                                            size={18}
                                            bold={false}
                                            color={'#006464'}
                                          >
                                            Temp °C
                                          </Text>
                                        </View>
                                        <View style={{ flex: 0.1 }}>
                                          <Text
                                            style={{
                                              fontFamily: 'montserrat-regular',
                                              // textTransform: "uppercase",
                                              fontWeight: '700'
                                            }}
                                            size={18}
                                            bold={false}
                                            color={'#006464'}
                                          >
                                            pH
                                          </Text>
                                        </View>
                                        <View style={{ flex: 0.3 }}>
                                          <Text
                                            style={{
                                              fontFamily: 'montserrat-regular',
                                              // textTransform: "uppercase",
                                              fontWeight: '700'
                                            }}
                                            size={18}
                                            bold={false}
                                            color={'#006464'}
                                          >
                                            Turbidity NTU
                                          </Text>
                                        </View>                                
                                      </Block>
                                    </View>
                                  </Block>
                                </Block>
                              </Block>
                              <Block
                                style={{
                                  backgroundColor: 'rgba(0,0,0,0)',
                                  marginBottom: 8
                                }}
                              >
                                <Block style={styles.options}>
                                  <Block style={[styles.defaultStyle, {}]}>
                                    <View
                                      style={{
                                        borderBottomColor: 'black',
                                        borderBottomWidth: 2
                                      }}
                                    />
                                  </Block>
                                </Block>
                              </Block>
                              {dataPE.map((data, index) => {
                                return (
                                  <Block
                                    key={index}
                                    style={{
                                      backgroundColor: 'rgba(0,0,0,0)',
                                      marginBottom: 5
                                    }}
                                  >
                                    <Block row style={styles.options}>
                                      <Block
                                        flex
                                        row
                                        style={[styles.defaultStyle, {}]}
                                      >
                                        <View
                                          style={{
                                            flex: 1,
                                            flexDirection: 'row'
                                          }}
                                        >
                                          <Block row flex>
                                            <View style={{ flex: 0.3 }}>
                                              <Text
                                                style={{
                                                  fontFamily:
                                                    'montserrat-regular',
                                                  // textTransform: "uppercase",
                                                  fontWeight: '500'
                                                }}
                                                size={18}
                                                bold={false}
                                                color={'#006464'}
                                              >
                                                {data.date_and_time}
                                              </Text>
                                            </View>
                                            <View style={{ flex: 0.3}}>
                                              <Text
                                                style={{
                                                  fontFamily:
                                                    'montserrat-regular',
                                                  // textTransform: "uppercase",
                                                  fontWeight: '500'
                                                }}
                                                size={18}
                                                bold={false}
                                                color={'#006464'}
                                              >
                                                {data.temperature_c}
                                              </Text>
                                            </View>
                                            <View style={{ flex: 0.1 }}>
                                              <Text
                                                style={{
                                                  fontFamily:
                                                    'montserrat-regular',
                                                  // textTransform: "uppercase",
                                                  fontWeight: '500'
                                                }}
                                                size={18}
                                                bold={false}
                                                color={'#006464'}
                                              >
                                                {data.ph}
                                              </Text>
                                            </View>
                                            <View style={{ flex: 0.3, alignItems: "center" }}>
                                              <Text
                                                style={{
                                                  fontFamily:
                                                    'montserrat-regular',
                                                  // textTransform: "uppercase",
                                                  fontWeight: '500'
                                                }}
                                                size={18}
                                                bold={false}
                                                color={'#006464'}
                                              >
                                                {data.turbidity_ntu}
                                              </Text>
                                            </View>                                    
                                          </Block>
                                        </View>
                                      </Block>
                                    </Block>
                                  </Block>
                                )
                              })}
            </ScrollView>
          </Block>
        </View>
      )
    }
  }

  componentDidMount () {
    this.props.onfetchPE(dataPE => {
      this.setState({
        dataPE,
        isLoading: false
      })
    })
  }

  componentWillUnmount () {
    clearInterval(this.time, this.date_current)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  paragraph: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    textAlignVertical: 'center',
    justifyContent: 'flex-start'
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center'
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    // padding: 35,

    width: width - theme.SIZES.BASE * 1.2,
    paddingVertical: theme.SIZES.BASE * 0.5,
    paddingHorizontal: 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'red'
  },
  button: {
    borderRadius: 20,
    padding: 5,
    elevation: 2,
    width: 100
  },
  buttonSubmit: {
    backgroundColor: 'rgba(24,206,15, 0.8)'
  },
  buttonClose: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  },
  buttonDelete: {
    backgroundColor: '#FF3636'
  },
  topBar: {
    flex: 0.2,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: Constants.statusBarHeight + 1
  },
  bottomBar: {
    flex: 0.2,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 1,
    position: 'absolute',
    borderColor: '#3b5998',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  faceText: {
    color: '#32CD32',
    fontWeight: 'bold',
    textAlign: 'left',
    margin: 2,
    backgroundColor: 'transparent'
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0
  },
  textcolor: {
    color: '#008080'
  },
  textStandard: {
    fontSize: 18,
    marginBottom: 20,
    color: 'white'
  },
  countdown: {
    fontSize: 40,
    color: 'white'
  },
  options: {
    // marginBottom: 24,
    // marginTop: 10,
    elevation: 4
  },
  defaultStyle: {
    // paddingVertical: 15,
    paddingHorizontal: 8,
    color: 'white'
  },
  buttonA: {
    width: width - theme.SIZES.BASE * 2,
    height: theme.SIZES.BASE * 3,
    backgroundColor: '#F5A89A',
    color: theme.COLORS.BLACK,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15
  },
  buttonB: {
    height: theme.SIZES.BASE * 6,
    backgroundColor: 'White',
    color: theme.COLORS.BLACK
  },
  buttonC: {
    width: (width - theme.SIZES.BASE * 4) / 2,
    height: theme.SIZES.BASE * 6,
    backgroundColor: '#74C365',
    borderWidth: 0
  },
  buttonD: {
    width: (width - theme.SIZES.BASE * 4) / 2,
    height: theme.SIZES.BASE * 6,
    backgroundColor: '#D0F0C0',
    borderWidth: 0
  },
  containerCard: {
    // flex: 1,
    width: width - theme.SIZES.BASE * 2,
    alignItems: 'center',
    justifyContent: 'center',
    height: 250
  },
  padded: {
    top: 20,
    // paddingHorizontal: theme.SIZES.BASE * 1.5,
    // position: 'absolute',
    bottom: theme.SIZES.BASE,
    zIndex: 2,
    marginBottom: 150
  }
})

const mapStateToProps = state => {
  return {
    // user: state.user,
    // errors: state.errors,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onfetchPE: callback => {
      dispatch(fetchPE(callback))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PE)
