import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Image } from 'react-native';
import MapView, { Polyline, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import io from 'socket.io-client';
import { UsersLocations, Region } from '../types'
import path from '../testLocations'

const socketUrl = process.env.EXPO_PUBLIC_SOCKET_URL as string;

const socket = io(socketUrl);
const LOCATION_TASK_NAME = 'background-location-task';



const MapComponent = (data: any) => {
  const [initialRegion, setInitialRegion] = useState<Region>(null);
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [locations, setLocations] = useState<any[]>([]);
  const [users, setUsers] = useState<UsersLocations>({});
  const [user, setUser] = useState<number | null>(null);
  const [userPath, setUserPath] = useState<any[]>([]);
  const [currentUserPos, setCurrentUserPos] = useState<any>(null);
  const [roadCaptain, setRoadCaptain] = useState<number | null>(null);
  const [roadCaptainPath, setRoadCaptainPath] = useState<any[]>([]);
  const [currentRoadCaptainPos, setCurrentRoadCaptainPos] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);


  useEffect(() => {
    socket.on('locationUpdate', (data) => {
      const { userId } =  data;
      if (roadCaptain && userId === roadCaptain) {
        handleRoadCaptainPath(data)
      } else {
        handleIncomingLocations(data)
      }
    });
  }, [roadCaptain]);

  useEffect(() => {
    setCurrentRoadCaptainPos(roadCaptainPath[roadCaptainPath.length - 1])
  }, [roadCaptainPath]);

  useEffect(() => {
    const trackLocation = async () => {
      setRoadCaptain(3)

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.High,
        timeInterval: 5000, // Track every 5 seconds
        distanceInterval: 10, // Track every 10 meters
        showsBackgroundLocationIndicator: true,
        foregroundService: {
          notificationTitle: "BackgroundLocation Is On",
          notificationBody: "We are tracking your location",
          notificationColor: "#ffce52",
        },
      });

      // await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      //   accuracy: Location.Accuracy.High,
      //   timeInterval: 10000,
      //   distanceInterval: 10,
      //   deferredUpdatesDistance: 10,
      //   deferredUpdatesInterval: 10,
      //   pausesUpdatesAutomatically: true,
      //   showsBackgroundLocationIndicator: true,
      //   foregroundService: {
      //     killServiceOnDestroy: false,
      //     notificationTitle: "",
      //     notificationColor: 'red',
      //     notificationBody: "",
      //     },
      //   });

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setCurrentLocation(location);
      const { latitude, longitude, heading } = location.coords;
      setInitialRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 10,
        },
        (location) => {
          const { latitude, longitude } = location.coords;
          setCurrentLocation(location.coords)
          // socket.emit('locationUpdate', { latitude, longitude });
        }
      );
      // const { userId } = data;
      // setUser(userId);
      // const user = {
      //   userId,
      //   latitude,
      //   longitude, 
      //   heading
      // }
      // let currentIndex = 0;
      // socket.emit('locationUpdate', user);

      // const interval = setInterval(() => {
      //   if (currentIndex < path.length) {
      //     socket.emit('locationUpdate', path[currentIndex]);
      //     currentIndex++;
      //   } else {
      //     clearInterval(interval);
      //   }
      // }, 3000)
    };
    trackLocation();

    return () => {
      Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
      socket.off('locationUpdate');
    };
  }, []);

  const handleRoadCaptainPath = (data: any) => {
    setRoadCaptainPath(prevRoadCaptainPath => {
      return [...prevRoadCaptainPath,
        {
          latitude: data.latitude,
          longitude: data.longitude,
          heading: data.heading
        }
      ]
    })
  }

  const handleIncomingLocations =  (data: any) => {
    setLocations((prevLocations) => {
      const locationIndex = prevLocations
      .findIndex(location => location.userId === data.userId);
      if (locationIndex > -1) {
        const updatedLocations = [...prevLocations]
        updatedLocations[locationIndex] = data;
        return updatedLocations;
      } else {
        return [...prevLocations, data]
      }
    })
  }

  if (!initialRegion) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        {errorMsg ? <Text>{errorMsg}</Text> : null}
      </View>
    );
  }

  return (
    <View>
      {
        currentLocation && (
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={initialRegion}
            region={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
             latitudeDelta: 0.0022,
             longitudeDelta: 0.0021,
           }}
           showsUserLocation={true}
          // camera={{
          //   center: {
          //    latitude: currentLocation.latitude,
          //    longitude: currentLocation.longitude,
          //   },
          //   pitch: 15,
          //   heading:0,
          //   altitude: 1000,
          //   // zoom: 15,
          // }}
          >
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              key={user}
              title={`${user}`}
            >
              <Image
                style={{
                  width: 40, 
                  height: 40,
                  position: "relative",
                  // marginTop: "2px",
                  resizeMode: 'contain',
                  transform: [
                    { rotate: `${currentLocation.heading}deg`},
                  { translateX: -25 }, 
                  { translateY: -25 }]
                }}
                source={require('../assets/images/top-bike.png')
                }
              />
            </Marker>
            {
              <Polyline
              key={roadCaptain}
              coordinates={roadCaptainPath}
            
              strokeWidth={3}
              strokeColor="purple"
            />
            }
            {
              roadCaptain && 
              roadCaptainPath.length > 0 &&
              currentRoadCaptainPos &&
              (
                <>
                  <Marker
                    coordinate={{
                      latitude: currentRoadCaptainPos.latitude,
                      longitude: currentRoadCaptainPos.longitude,
                    }}
                    key={roadCaptain}
                    title={`${roadCaptain}`}
                  >
                    <Image
                      style={{
                        width: 25, 
                        height: 25,
                        resizeMode: 'contain',
                        transform: [{
                          rotate: `${currentRoadCaptainPos.heading}deg`
                        }]
                      }}
                      source={require('../assets/images/top-bike.png')}
                    />
                  </Marker>
                </>
              )
            }

            {
              locations.length > 0 && (
                locations
                .filter(location => location.userId !== user &&
                  location.userId !== roadCaptain
                )
                .map((location, index) => (
                  <Marker
                    coordinate={{
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }}
                    key={index}
                    title={`${location.userId}`}
                  >
                    <Image
                      style={{
                        width: 10, 
                        height: 10,
                        resizeMode: 'contain',
                        transform: [{
                          rotate: `${location.heading}deg`
                        }]
                      }}
                      source={require('../assets/images/top-bike.png')}
                    />
                  </Marker>
                ))
              )
            }
          </MapView>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marker: {
    width: 50, // Adjust as needed
    height: 50, // Adjust as needed
    resizeMode: 'contain',
  },
});

export default MapComponent;

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }: { data: any; error: any }) => {
  if (error) {
    console.error(error);
    return;
  }
  if (data) {
    console.log("data-in task manager---", data)
    const { locations } = data as { locations: Location.LocationObject[] };
    const location = locations[0];

    if (location) {
      const { latitude, longitude } = location.coords;
      const locationData = { latitude, longitude, timestamp: Date.now() };

      // Send location data to the server
      socket.emit('locationUpdate', locationData);
    // handleIncomingLocations(locations)
    }
  }
});