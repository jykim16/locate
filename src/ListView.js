import React from 'react';
import './css/listview.css';

var ListView = (props) => {
  return (
    <div id="listView">
      {props.list.map((item, i) => {
        return(<div className="item" key={i}>
          <div className="title"> {item.label+") "}<strong>{item.name}</strong></div>
          <div
            className="address"
            onClick={()=>{
              var lat = item.geometry.location.lat();
              var lng = item.geometry.location.lng();
              props.centerMap({lat, lng});
            }}>
            {item.vicinity}
          </div>
          <div>Price: {'$$$$$'.slice(0, item.price_level)}</div>
          <div>Rating: {item.rating}</div>
        </div>)
      })}
    </div>
  );
}

export default ListView;
