import { connect } from 'react-redux';

import React, { Component } from 'react';
import { View, Text, Dimensions, TextInput, StatusBar, Image, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import Images from '../../theme/Images';

import { SilverMap, AubergineMap, UberOriginalMap, UberMap, Uber2018Map } from './MapStyles'

import styles from "./styles";

class AwesomePlaces extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focusedLocation: {
                latitude: 24.8724076,
                longitude: 67.0559635,
                latitudeDelta: 0.00122,
                longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122,
            },
            locationChosen: false,
            darkMode: false,
        }
    }

    pickLocationHandler = event => {
        const coords = event.nativeEvent.coordinate;
        this.map.animateToRegion({
            ...this.state.focusedLocation,
            latitude: coords.latitude,
            longitude: coords.longitude,
        });
        this.setState(pervState => {
            return {
                focusedLocation: {
                    ...pervState.focusedLocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                },
                locationChosen: true,
            }
        });
    }

    getLocationHandler = () => {
        console.log(Geolocation, "Geolocationnnnnnnnnnnnnnnnnnnnnnnnnn")
        Geolocation.getCurrentPosition(pos => {
            console.log(pos, "possssssssssssssssssssssssssssss")
            const coordsEvent = {
                nativeEvent: {
                    coordinate: {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude,
                    }
                }
            };
            this.pickLocationHandler(coordsEvent);
        }, err => {
            console.log(err, "errrrrrrrrrrrrrrrrrrrrr")
            Alert.alert('Error', err.message)
        })
    }

    handleDarkMode = () => {
        const { darkMode } = this.state
        if (darkMode) {
            this.setState({ darkMode: false });
        } else {
            this.setState({ darkMode: true });
        }
    }

    rendersearchBar = () => {
        return (
            <View style={styles.searchBarView}>
                <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                        <FontAwesome
                            name='bars'
                            size={20}
                            color="rgba(0, 0, 0, 0.4)"
                            style={{ paddingHorizontal: 15, }}
                        />
                    </TouchableOpacity>
                    <TextInput placeholder={"Search"} style={[styles.text, { flex: 1, fontSize: 16 }]} />
                    <TouchableOpacity onPress={() => this.getLocationHandler()}>
                        <Ionicons
                            name='md-locate'
                            size={20}
                            color="rgba(0, 0, 0, 0.4)"
                            style={{ paddingHorizontal: 15, }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        const { focusedLocation, locationChosen } = this.state
        let marker = null;
        if (locationChosen) {
            marker = <MapView.Marker coordinate={focusedLocation} />
        }
        return (
            <View style={styles.container}>
                {this.rendersearchBar()}
                <MapView
                    style={{ flex: 1, }}
                    initialRegion={focusedLocation}
                    // region={focusedLocation}
                    onPress={this.pickLocationHandler}
                    ref={ref => this.map = ref}
                    customMapStyle={this.state.darkMode ? AubergineMap : SilverMap}
                >
                    <MapView.Marker coordinate={focusedLocation} />
                    {/* <MapViewDirections
                        origin={focusedLocation}
                        destination={{ latitude: 24.917755, longitude: 67.0949881 }}
                        apikey={"AIzaSyCIGENLCfCwZwPaumiUQs21GfgMhgppa7s"} // Brain Washer
                        strokeWidth={4}
                        strokeColor="#FF1654"
                    /> */}
                    {/* {marker} */}
                </MapView>
                {/* <TouchableOpacity
                    style={styles.darkModeBtn}
                    onPress={() => this.handleDarkMode()}>
                    <Ionicons
                        name='ios-contrast'
                        size={25}
                        color="rgba(0, 0, 0, 0.4)"
                    />
                </TouchableOpacity> */}
                <ActionButton size={40} buttonColor="rgba(255, 22, 84, 1)">
                    <ActionButton.Item buttonColor='#9b59b6' title="Standard" onPress={() => console.log("notes tapped!")}>
                        {/* <Ionicons name="md-create" style={styles.actionButtonIcon} onPress={() => { }} /> */}
                        <Image source={Images.facebook} style={styles.socialLogo} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#3498db' title="Silver" onPress={() => { }}>
                        <Ionicons name="md-notifications-off" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#1abc9c' title="Night Mode" onPress={() => { }}>
                        <Ionicons name="md-done-all" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({});

const action = {};

export default connect(mapStateToProps, action)(AwesomePlaces);