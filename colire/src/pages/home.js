import { h, Fragment } from 'preact'
import { useContext } from 'preact/hooks'
import { Link } from 'react-router-dom'
import { Context } from '@app'
import { AddPaletteBtn, SVGFilter, PaletteBox } from '@components'
import './css/home.css'

const Home = () => {

  const { state: { palettes }, dispatch } = useContext(Context)

  const handleDeletePalette = id => {
    dispatch({
      type: 'DELETE_PALETTE',
      payload: id
    })
  }

  const paletteLinks = palettes.map(palette => {
    return <PaletteBox handleDeletePalette={handleDeletePalette} {...palette} />
  })

  return (
    <>
      <main className='home-main'>

        <header className='home-header'>
          <h1>Colllie</h1>
          <span>yor palette lib</span>
        </header>

        <Link to='/create-palette'>
          <AddPaletteBtn />
        </Link>

        {paletteLinks}

      </main>

      <SVGFilter y={16} blur={16} brightness={2} saturate={1.333} />
    </>
  )
}

export default Home
