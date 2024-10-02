import React, { useEffect } from 'react';
import Geolocation from 'react-native-geolocation-service';
import io from 'socket.io-client';

const socket = io('http://localhost:4000'); // Adjust the URL as needed

// const GeoTracker = ( userId: any) => {
  // useEffect(() => {
    // const trackLocation = () => {r
  //     Geolocation.watchPosition(
  //       (position) => {
  //         const newPosition = {
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         };
  //         socket.emit('sendLocation', newPosition);
  //       },
  //       (error) => console.log(error),
  //       { enableHighAccuracy: true, distanceFilter: 0, interval: 5000, fastestInterval: 2000 }
  //     );
  //   };

  //   trackLocation();

  //   socket.emit('join', userId);

  //   return () => {
  //     socket.emit('leave');
  //     Geolocation.stopObserving();
  //   };
  // }, [userId]);

//   return null;
// };

// export default GeoTracker;
