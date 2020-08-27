import React, { useState, useEffect } from "react"
import SwapiService from "../../services/SwapiService"
import List from "../list"
import Details from "../details"
import "./page.css"

const Page = (props) => {

  const [detailsID, setId] = useState(null)

  const swapi = new SwapiService
  const getList = (type) => {
    if (type === "planets")   return swapi.getAllPlanets()
    if (type === "people")    return swapi.getAllPeople()
    if (type === "starships") return swapi.getAllStarships()
  }
  const getDetails = (type, id) => {
    if (type === "planets")   return swapi.getPlanet(id)
    if (type === "people")    return swapi.getPerson(id)
    if (type === "starships") return swapi.getStarship(id)
  }
  const changeDetailsID = (id) => setId(id)

  useEffect(() => setId(null), [props.page])

  return (
    <main>
      <List
        type={props.page}
        getData={getList}
        changeDetailsID={changeDetailsID}
      />
      <Details
        type={props.page}
        id={detailsID}
        getData={getDetails}
      />
    </main>
  )
}
export default Page
