import React, { Component } from "react"
import { geoMercator, geoPath } from "d3-geo"
  import { feature } from "topojson-client"
import worlddata from './static/world-10m'

class WorldMap extends Component {
  constructor() {
    super()
    this.state = {
      worlddata: []
    }

    this.handleCountryClick = this.handleCountryClick.bind(this)
    this.handleMarkerClick = this.handleMarkerClick.bind(this)
  }
  projection() {
    return geoMercator()
      .scale(100)
      .translate([ 800 / 2, 450 / 2 ])
  }
  handleCountryClick(countryIndex) {
    console.log("Clicked on country: ", this.state.worlddata[countryIndex])
  }
  handleMarkerClick(i) {
    console.log("Marker: ", this.state.cities[i])
  }
  componentDidMount() {
    this.setState({
      worlddata: feature(worlddata, worlddata.objects.countries).features,
    })
  }
  render() {
    console.log(this.state.worlddata.length);
    return (
      <svg style={{width: '80%', height: '45%'}} viewBox="0 0 800 450">
        <g className="countries">
          {
            this.state.worlddata.map((d,i) => (
              <path
                key={ `path-${ i }` }
                d={ geoPath().projection(this.projection())(d) }
                className="country"
                fill="#3f51b5"
                stroke="#FFFFFF"
                strokeWidth={ 0.5 }
                onClick={ () => this.handleCountryClick(i) }
              />
            ))
          }
        </g>

        <g className="markers">
          {
            this.props.mapData ? this.props.mapData.map((city, i) => (
              <circle
                key={ `marker-${i}` }
                cx={ this.projection()(city.coordinates)[0] }
                cy={ this.projection()(city.coordinates)[1] }
                r={ 30000000 / 3000000 }
                fill="#E91E63"
                stroke="#FFFFFF"
                className="marker"
                onClick={ () => this.handleMarkerClick(i) }
              />
            )) : null
          }
        </g>
      </svg>
    )
  }
}

export default WorldMap
