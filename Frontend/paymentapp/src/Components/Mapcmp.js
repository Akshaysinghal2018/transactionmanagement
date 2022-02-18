import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';
import Footercmp from "./Dashboard/Footercmp";

const mapStyles = {marginTop:"-50px",
  width: '100%',
  height: '440px'
};

class Mapcmp extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      latitude:"",
      longitude:""
    };
  }
  componentDidMount(){
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  }
  

  render() {
    return (
      <div>
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: 19.0244,
            lng: 72.8443
          }}
        >
         <Marker
          onClick={this.onMarkerClick}
          name={'This is test name'}
        />
        </Map>
        <Footercmp/>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyA28zwHt9i8kxgrhqj6xM3GbuiaVLc-4dc'
})(Mapcmp);
