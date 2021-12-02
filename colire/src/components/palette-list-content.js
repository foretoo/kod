import { h } from 'preact'
import { ColorBox, withMore } from '@components'

const PaletteListContent = ({ colors, activeLevel }) => {

  const colorsList = []
  for (const color in colors) {
    colorsList.push(<ColorBox key={color} id={color} addClass=' palette' {...colors[color][activeLevel]} />)
  }
  return colorsList
}

export default withMore(PaletteListContent)
