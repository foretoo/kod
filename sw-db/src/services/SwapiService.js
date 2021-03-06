export default class SwapiService {

  _apiBase = "https://swapi.dev/api"

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`)
    if (!res.ok) {
      throw new Error(`Could not fetch ${this._apiBase}${url}}, recieve ${res.status}`)
    }
    const body = await res.json()
    return body
  }

  getAllPeople = async () => {
    const res = await this.getResource("/people/")
    return {list: res.results.map(this._transformPerson), length: res.count}
  }

  getPerson = async (id) => {
    const person = await this.getResource(`/people/${id}/`)
    return this._transformPerson(person)
  }

  getAllPlanets = async () => {
    const res = await this.getResource("/planets/")
    return {list: res.results.map(this._transformPlanet), length: res.count}
  }

  getPlanet = async (id) => {
    const planet = await this.getResource(`/planets/${id}/`)
    return this._transformPlanet(planet)
  }

  getAllStarships = async () => {
    const res = await this.getResource("/starships/")
    return {list: res.results.map(this._transformStarship), length: res.count}
  }

  getStarship = async (id) => {
    const starship = await this.getResource(`/starships/${id}/`)
    return this._transformStarship(starship)
  }

  _getId = (item) => {
    const regEx = /\/([0-9]*)\/$/
    return item.url.match(regEx)[1]
  }

  _formatted = (data) => {
    return isNaN(data) ? data : new Intl.NumberFormat("RU").format(data)
  }

  _transformPerson = (person) => {
    return {
      id: this._getId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color
    }
  }

  _transformPlanet = (planet) => {
    return {
      id: this._getId(planet),
      name: planet.name,
      population: this._formatted(planet.population),
      diameter: this._formatted(planet.diameter),
      rotationPeriod: this._formatted(planet.rotation_period)
    }
  }

  _transformStarship = (starship) => {
    return {
      id: this._getId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: this._formatted(starship.cost_in_credits),
      length: this._formatted(starship.length),
      cargoCapacity: this._formatted(starship.cargo_capacity)
    }
  }
}
