import React, { PureComponent } from "react"
import SwapiService from "../../services/SwapiService"
import Loader from "../loader"
import Error from "../error"
import "./random.css"

export default class Random extends PureComponent {

  state = {
    planet: {},
    loading: true,
    error: false
  }

  swapi = new SwapiService
  updateData = () => {
    let id = Math.floor(Math.random()*19) + 2
    if (id === 20) id++
    this.swapi.getPlanet(id)
      .then(planet => this.setState({ planet, loading: false }))
      .catch(err => this.setState({ error: true, loading: false }))
  }

  componentDidMount() {
    setInterval(this.updateData, 10000)
  }
  componentWillUnmount() {
    clearInterval(this.updateData)
  }

  render() {
    const { planet, loading, error } = this.state
    const output = error ? <Error /> : loading ? <Loader /> : <RandomView planet={planet} />

    return (
      <section className="random">
        {output}
      </section>
    )
  }
}

const RandomView = (props) => {
  const { id, name, population, diameter, rotationPeriod } = props.planet
  return (
    <>
      <img src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}/>
      <div className="randomDetails">
        <h2>{name}</h2>
        <ul>
          <li>population: {population}</li>
          <li>diameter: {diameter}</li>
          <li>rotationPeriod: {rotationPeriod}</li>
        </ul>
      </div>
    </>
  )
}
