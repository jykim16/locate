import React, {Component} from 'react';
import './css/frontview.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FontIcon from 'material-ui/FontIcon';

class FrontView extends Component{
  // constructor(props) {
  //   super(props);
  //   this.placeMarkers = this.placeMarkers.bind(this);
  // }
  componentDidMount() {
    this.searchBox = new window.google.maps.places.Autocomplete(document.getElementById('input1'));
    this.searchBox2 = new window.google.maps.places.Autocomplete(document.getElementById('input2'));

    this.handleLocationChange(this.searchBox, (place, geometry) => {
      this.props.inputHandler(place, 'location1');
      this.props.inputHandler(geometry, 'locationObj1');
    });
    this.handleLocationChange(this.searchBox2, (place, geometry) => {
      this.props.inputHandler(place, 'location2');
      this.props.inputHandler(geometry, 'locationObj2');
    });
  }

  componentDidUpdate() {
    this.searchBox.setBounds(this.props.mapBounds)
    this.searchBox2.setBounds(this.props.mapBounds)
  }

  handleLocationChange(searchBox, handleChange) {
    searchBox.addListener('place_changed', function() {
      var place = searchBox.getPlace().formatted_address;
      var geometry = searchBox.getPlace().geometry.location;
      handleChange(place, geometry)
    });
  }

  placeMarkers(google, service, address, destination, setPlaceMarkers) {
    var requestObj = {
      location: address,
      radius: 16000,
      type: [destination]
    }

    var markers = [];
    service.nearbySearch(requestObj, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          markers.push(results[i]);
        }
        // For each place, get the icon, name and location.
        markers = markers.map(function(place) {
          var icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };
          return Object.assign(place, {icon: icon})
        });
        setPlaceMarkers(markers);
      }
    })
  }

  render() {
    return (
        <div className="overlay">
          <div className="locations">
            <div>
              Location 1
              <input className="input" id="input1" onChange={(e)=>{this.props.inputHandler(e.target.value, 'location1')}} value={this.props.location1}></input>
            </div>
            <div>
              Location 2
              <input className="input" id="input2" onChange={(e)=>{this.props.inputHandler(e.target.value, 'location2')}} value={this.props.location2}></input>
            </div>
          </div>
          <div className="destinations">
            <h1>Amne: Locator</h1>
            <p>Enter two locations and a destination. We will find destinations that are within 10 miles of the given locations.</p>

            <MuiThemeProvider>
              <div>
                <div
                  className="destination"
                  onClick={()=>{
                    if (this.props.locationObj1 && this.props.locationObj2) {
                      this.props.inputHandler('real_estate_agency', 'findOption');
                      this.placeMarkers(window.google, this.props.service, this.props.locationObj1, 'real_estate_agency', this.props.setPlaceMarkers)
                      this.placeMarkers(window.google, this.props.service, this.props.locationObj2, 'real_estate_agency', this.props.setPlaceMarkers)
                    } else {
                      window.alert('You must select 2 addresses before choosing a destination')
                    }
                  }}>
                  <div className="icon">
                    <FontIcon className="material-icons">home</FontIcon>
                  </div>
                  Real Estate Agency
                </div>
                <div
                  className="destination"
                  onClick={()=>{
                    if (this.props.locationObj1 && this.props.locationObj2) {
                      this.props.inputHandler('cafe', 'findOption');
                      this.placeMarkers(window.google, this.props.service, this.props.locationObj1, 'cafe', this.props.setPlaceMarkers)
                      this.placeMarkers(window.google, this.props.service, this.props.locationObj2, 'cafe', this.props.setPlaceMarkers)
                    } else {
                      window.alert('You must select 2 addresses before choosing a destination')
                    }
                  }}>
                  <div className="icon">
                    <FontIcon className="material-icons">local_cafe</FontIcon>
                  </div>
                  Cafe
                </div>
                <div
                  className="destination"
                  onClick={()=>{
                    if (this.props.locationObj1 && this.props.locationObj2) {
                      this.props.inputHandler('restaurant', 'findOption');
                    } else {
                      window.alert('You must select 2 addresses before choosing a destination')
                    }
                  }}>
                  <div className="icon">
                    <FontIcon className="material-icons">restaurant</FontIcon>
                  </div>
                  Restaurant
                </div>
                <div
                  className="destination"
                  onClick={()=>{
                    if (this.props.locationObj1 && this.props.locationObj2) {
                      this.props.inputHandler('library', 'findOption');
                    } else {
                      window.alert('You must select 2 addresses before choosing a destination')
                    }
                  }}>
                  <div className="icon">
                    <FontIcon className="material-icons">library_books</FontIcon>
                  </div>
                  Library
                </div>
                <div
                  className="destination"
                  onClick={()=>{
                    if (this.props.locationObj1 && this.props.locationObj2) {
                      this.props.inputHandler('spa', 'findOption');
                    } else {
                      window.alert('You must select 2 addresses before choosing a destination')
                    }
                  }}>
                  <div className="icon">
                    <FontIcon className="material-icons">spa</FontIcon>
                  </div>
                  Spa
                </div>
                <div
                  className="destination"
                  onClick={()=>{
                    if (this.props.locationObj1 && this.props.locationObj2) {
                      this.props.inputHandler('gas_station', 'findOption');
                    } else {
                      window.alert('You must select 2 addresses before choosing a destination')
                    }
                  }}>
                  <div className="icon">
                    <FontIcon className="material-icons">local_gas_station</FontIcon>
                  </div>
                  Gas Station
                </div>
              </div>
            </MuiThemeProvider>
          </div>
        </div>
    );
  }
}
export default FrontView;
