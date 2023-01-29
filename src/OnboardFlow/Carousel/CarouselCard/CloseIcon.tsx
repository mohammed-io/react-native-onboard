import * as React from "react"
import Svg, { Rect } from "react-native-svg"

function CloseIcon({ size = 11, color = "#F5F5F5"}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      <Rect
        x={9.74268}
        y={0.549805}
        width={1}
        height={13}
        rx={0.5}
        transform="rotate(45 9.743 .55)"
        fill={color}
      />
      <Rect
        x={0.550293}
        y={1.25684}
        width={1}
        height={13}
        rx={0.5}
        transform="rotate(-45 .55 1.257)"
        fill={color}
      />
    </Svg>
  )
}

export default CloseIcon
