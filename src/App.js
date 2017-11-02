import React, { Component } from 'react';
import './css/App.css';
import MapView from './MapView';
import ListView from './ListView';
import FrontView from './FrontView'

class App extends Component {
  constructor() {
    super();
    this.state = {
      location1: '',
      locationObj1: '',
      location2: '',
      locationObj2: '',
      findOption: "",
      mapBounds: {},
      placeMarkers: [],
      center: new window.google.maps.LatLng(30.266392, -97.743495),
      service: ""
    }
    this.setMapBounds = this.setMapBounds.bind(this);
    this.setPlaceMarkers = this.setPlaceMarkers.bind(this);
    this.centerMap = this.centerMap.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
  }

  inputHandler(value, stateName) {
    var newState = {};
    newState[stateName] = value;
    this.setState(newState);
  }

  setMapBounds(bounds) {
    this.setState({
      mapBounds: bounds
    })
  }

  centerMap(center) {
    this.setState({
      center: center
    })
  }

  setPlaceMarkers(markers) {
    var newMarkers = this.state.placeMarkers.concat(markers);
    var unique = {};
    newMarkers = newMarkers.filter((item) => {
      return unique.hasOwnProperty(item.id) ? false: (unique[item.id] = true);
    })
    newMarkers = newMarkers.sort((a,b)=>{
      var distanceA = window.google.maps.geometry.spherical.computeDistanceBetween(this.state.locationObj1, a.geometry.location) + window.google.maps.geometry.spherical.computeDistanceBetween(this.state.locationObj2, a.geometry.location);
      var distanceB = window.google.maps.geometry.spherical.computeDistanceBetween(this.state.locationObj1, b.geometry.location) + window.google.maps.geometry.spherical.computeDistanceBetween(this.state.locationObj2, b.geometry.location);
      return distanceA - distanceB;
    })
    newMarkers.slice(0, 20);
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var labelIndex = 0;
    newMarkers.forEach(item=>{
      return Object.assign(item, {label:labels[labelIndex++ % labels.length]})
    })
    this.setState({
      placeMarkers: newMarkers
    })
  }

  render() {
    var overlay;
    var blur = {};
    if(this.state.findOption.length === 0) {
      overlay = (
        <FrontView
          location1={this.state.location1}
          location2={this.state.location2}
          findOption={this.state.findOption}
          inputHandler={this.inputHandler}
          setPlaceMarkers={this.setPlaceMarkers}
          mapBounds={this.state.mapBounds}
          service={this.state.service}
          locationObj1={this.state.locationObj1}
          locationObj2={this.state.locationObj2}
        />);
      blur={filter: "blur(2px)"};
    }
    return (
      <div className="App">
        {overlay}
        <div className="main" style={blur}>
          <MapView
            coords={{
              // lat: 37.78,
              // lng: -122.39
            }}
            markers={this.state.placeMarkers}
            setMapBounds={this.setMapBounds}
            center={this.state.center}
            inputHandler={this.inputHandler}
            locationObj1={this.state.locationObj1}
            locationObj2={this.state.locationObj2}
          />
         <ListView
           list={this.state.placeMarkers}
           centerMap={this.centerMap}
         />
        </div>
      </div>
    );
  }
}

export default App;
