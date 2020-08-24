import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

type GradientBorderProps = {
  x: number,
  y: number,
  colors?: string[]
}

const GradientBorder: React.FC<GradientBorderProps> = (props: GradientBorderProps) => {
  const { x, y } = props
  let colors = props.colors

  if (colors === undefined) {
    colors = ['#ebebeb', 'grey', '#ebebeb']
  }

  return(
    <LinearGradient 
      start={{ x: 0.0, y: 1.0 }} end={{ x, y }}
      colors={ colors }
      style={{ height: 0.5, width: '100%', alignItems: 'center', justifyContent: 'center' }}
      >
    </LinearGradient>
  )
}

export default GradientBorder
