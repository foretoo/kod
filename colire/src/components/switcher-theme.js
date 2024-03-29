import { h } from "preact"
import { useAgent, useAgentDispatch } from "@app/ctx"
import { useConst } from "@utils/hooks"
import "./css/switcher-theme.css"

const SwitcherTheme = () => {

  const { switcherTheme } = useAgent()
  const dispatch = useAgentDispatch()

  const handleChangeMode = useConst((e, theme) => {
    const isClick = e.type === "click"
    const isEnterKey = e.type === "keypress" && e.key === "Enter"
    if (isClick || isEnterKey)
      dispatch({
        type:    "CHANGE_THEME",
        payload: theme,
      })
  })

  const themes = [ "dark", "auto", "light" ]
    .map((option) => (
      <li
        className={`theme-option` + (option === switcherTheme ? ` active` : ``)}
        tabIndex={option === switcherTheme ? -1 : 0}
        onClick={option === switcherTheme ? null : (e) => handleChangeMode(e, option)}
        onKeyPress={option === switcherTheme ? null : (e) => handleChangeMode(e, option)} >
        {option}
      </li>
    ))

  return (
    <ul className="theme-switcher">
      {themes}
    </ul>
  )
}

export default SwitcherTheme