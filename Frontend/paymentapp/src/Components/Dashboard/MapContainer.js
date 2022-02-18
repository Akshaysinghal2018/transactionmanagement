import {Component} from 'react'
import { XMapbox } from "elements-x/dist/mapbox";
XMapbox.accessToken =
  "pk.eyJ1IjoiYWtzaGF5MTIzMTIzIiwiYSI6ImNreThnY21tdDFlejEydnB2c214b2QxajYifQ.0-B0zO_-B0Jo2vazgQtFnw";
 
export class MapContainer extends Component {
  render() {
    return (
        <x-div>
        <x-mapbox>
          <x-marker id="marker" lnglat="Toronto, Canada" center>
            Looking For Here?
          </x-marker>
        </x-mapbox>
      </x-div>
    );
  }
}
 
export default (MapContainer)