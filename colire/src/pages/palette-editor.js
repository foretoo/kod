import { h, Fragment } from "preact"
import { useContext } from "preact/hooks"
import { Link } from "react-router-dom"
import { Context } from "@app"
import {
  Header,
  SortablePalette,
  PaletteEditorForm,
  NewPaletteNameForm,
} from "@components"
import "./css/palette-editor.css"

const PaletteEditor = () => {

  const { dispatch } = useContext(Context)

  return (
    <>
      <Header class="edit-palette-header">
        <div class="nav">
          <svg class="burger-icon"
            width="20" height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => dispatch({ type: "TOGGLE_NEW_COLOR_FORM" })} >
            <path d="M18 10H2M18 4H2M18 16H2" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <Link className="nav-root" to="/">root</Link>
        </div>
        <NewPaletteNameForm />
      </Header>

      <main class="edit-palette-container">
        <PaletteEditorForm />
        <section class="edit-palette-content">
          <SortablePalette />
        </section>
      </main>
    </>
  )
}

export default PaletteEditor
