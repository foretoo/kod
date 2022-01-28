import { h, createContext } from "preact"
import { useState, useEffect, useRef } from "preact/hooks"
import chroma from "chroma-js"
import "./color-picker.css"

const Context = createContext()

const ColorPicker = ({

  color = "#fff",
  shift = 0,
  size = 320,
  onChange = (color) => console.log(color.hex),
  children,

}) => {

  const handleChange = (hsl) => {
    const color = chroma(hsl, "hsl")
    const [ h, s, l ] = color.hsl()
    const [ r, g, b ] = color.rgb()
    const hex = color.hex()
    onChange({
      rgb: { r, g, b },
      hsl: { h, s, l },
      hex,
    })
  }

  const initialPicker = {
    pointer: 0,
    hue:     {
      start:      false,
      origin:     { x: 0, y: 0 },
      a:          0,
      pickerRef:  useRef(),
      handlerRef: useRef(),
    },
    tone: {
      start:   false,
      x:       0,
      y:       0,
      ref:     useRef(),
    },
    hsl: [ 0, 1, 1 ],
    shift: shift % 360,
    mounted: false,
    handleChange,
  }
  const [ GET, SET ] = useState(initialPicker)



  useEffect(() => {
    SET((PREV) => {
      const _color = chroma(color)
      let hsl = _color.hsl()
      if (isNaN(hsl[0])) (hsl[0] = color.hasOwnProperty("h") ? color.h : 0)
      const [ , x, y ] = _color.hsv()

      const pickerRect = GET.hue.pickerRef.current.getBoundingClientRect()
      const origin = {
        x: pickerRect.x + pickerRect.width / 2,
        y: pickerRect.y + pickerRect.height / 2,
      }
      const hue = { ...PREV.hue, origin, a: hsl[0] }
      const tone = { ...PREV.tone, x: x * 100, y: 100 - y * 100 }

      return { ...PREV, hue, tone, hsl, mounted: true }
    })
  }, [])



  return (
    <Context.Provider value={{ GET, SET }}>
      <div className="color-picker-container"
        style={{ "--size": `${size}px`, "--hue": GET.hsl[0] }}>

        {children}

      </div>
    </Context.Provider>
  )
}

export { ColorPicker, Context }