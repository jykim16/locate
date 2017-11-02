import React, {Component} from 'react';
import './css/mapview.css';


export default class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: undefined,
    }
    this.loadMap = this.loadMap.bind(this);
    this.newMarker = [];
  }
  componentDidMount() {
    this.loadMap();
  }

  componentDidUpdate(prevProps, prevState) {
    var map = this.state.map;
    var infowindow = new window.google.maps.InfoWindow();
    if(prevProps.markers !== this.props.markers) {
      this.newMarker.forEach(oldMarks => {
        oldMarks.setMap(null);
      })

      this.newMarker = this.props.markers.map(place => {
        var mark =  new window.google.maps.Marker({
          position: place.geometry.location,
          label: place.label,
          map:map
        });
        window.google.maps.event.addListener(mark, 'click', function() {
          infowindow.setContent(`
            <div>
              <strong>${place.name}</strong><br>
              ${place.vicinity}<br>
              <a href="https://www.google.com/maps/dir/?api=1&destination=${place.name}&destination_place_id=${place.place_id}">View on Google Maps</a>
            </div>
          `);
          infowindow.open(map, this);
        });
        return mark;
      })
    }
    if(prevProps.center !== this.props.center) {
      map.setCenter(this.props.center)
    }

    var image = "http://findicons.com/files/icons/1008/quiet/128/star.png"
    if(prevProps.locationObj1 !== this.props.locationObj1) {
      new window.google.maps.Marker({
        position: this.props.locationObj1,
        label: 'Address 1',
        map:map,
        icon: image
      });
    }
    if(prevProps.locationObj2 !== this.props.locationObj2) {
      new window.google.maps.Marker({
        position: this.props.locationObj2,
        label: 'Address 2',
        map:map,
        icon: image
      });
    }
  }

  loadMap(){
    var center = this.props.center;
    let map = new window.google.maps.Map(document.getElementById('mapView'), {
      zoom: 14,
      center: center
    });
    var service = new window.google.maps.places.PlacesService(map);
    this.props.inputHandler(service, 'service');
    this.setState({map: map})
    var setMapBounds = this.props.setMapBounds;
    setMapBounds(map.getBounds());
    map.addListener('bounds_changed', function() {
      setMapBounds(map.getBounds())
   });
  }

  render() {
    return (
      <div ref="map" id="mapView">
      </div>
    );
  }
}
