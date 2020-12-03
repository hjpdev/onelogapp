import React, { ReactText } from 'react'
import LinearGradient from 'react-native-linear-gradient'

import { GradientBorderStyles } from './Styles'

interface GradientBorderProps {
  x: number
  y: number
  colors?: ReactText[]
}

export const GradientBorder: React.FC<GradientBorderProps> = (props: GradientBorderProps) => {
  const { x, y } = props
  let { colors } = props

  if (!colors || !colors.length) {
    colors = ['#ebebeb', 'grey', '#ebebeb']
  }

  return (
    <LinearGradient
      start={{ x: 0.0, y: 1.0 }}
      end={{ x, y }}
      colors={colors}
      style={GradientBorderStyles.border}
    />
  )
}

export default GradientBorder
