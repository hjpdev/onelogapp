import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

interface GradientBorderProps {
  x: number,
  y: number
}

export const GradientBorder: React.FC = (props: GradientBorderProps) => {
  const { x, y } = props

  return(
    <LinearGradient 
      start={{x: 0.0, y: 1.0}} end={{x, y}}
      colors={['#ebebeb', 'grey', '#ebebeb']}
      style={{ height: 0.5, width: '100%', alignItems: 'center', justifyContent: 'center'}}
      >
    </LinearGradient>
  )
}
