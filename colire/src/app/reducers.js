import { paletteReducer, editPaletteReducer, themeReducer } from "@app"

const reduceReducers = (...reducers) => (state, action) =>
  reducers.reduce((acc, nextReducer) => nextReducer(acc, action), state)

export default reduceReducers(
  paletteReducer,
  editPaletteReducer,
  themeReducer,
)
