import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures';

import Chevron from '../Minor/Chevron'
import GradientBorder from '../Minor/GradientBorder'
import { capitalise, generateCreatedDate } from '../../Helpers'
import { BgReadingProps, StatsReadingProps, DoseReadingProps, MacroReadingProps } from './Readings'

type CarouselProps = {
  name: string
  Template: React.FC<BgReadingProps> | React.FC<StatsReadingProps> | React.FC<DoseReadingProps> | React.FC<MacroReadingProps>
  data: any[]
  startingIndex?: number
}

const Carousel: React.FC<CarouselProps> = (props: CarouselProps) => {
  const { name, Template, data, startingIndex } = props
  const readings = data
  const [index, setIndex] = useState(startingIndex || 0)

  const handleSwipeLeft = () => {
    if (index < readings.length - 1) setIndex(index + 1)
  }

  const handleSwipeRight = () => {
    if (index > 0) setIndex(index - 1)
  }

  const reading = readings && readings[index]

  return(
    readings.length > 0
      ? <View style={Styles.container} testID={'carousel'}>
          <View style={Styles.header}>
            <Text style={Styles.tag}>
              { capitalise(name) }
            </Text>
            <Text style={Styles.time}>
              { generateCreatedDate(reading['created']) }
            </Text>
          </View>
          <GradientBorder x={0.4} y={1.0} colors={['grey', '#ebebeb']} />

          <View style={Styles.contentContainer}>
            <View style={Styles.chevron}>
            {index === 0
              ? <Chevron handlePress={() => null}/>
              : <Chevron left handlePress={handleSwipeRight} />}
            </View>
            <GestureRecognizer onSwipeLeft={handleSwipeLeft} onSwipeRight={handleSwipeRight} style={Styles.template}>
              <Template data={reading} />
            </GestureRecognizer>
            <View style={Styles.chevron}>
            {index < readings.length - 1
              ? <Chevron right handlePress={handleSwipeLeft} />
              : <Chevron handlePress={() => null} />}
            </View>
          </View>
          <GradientBorder x={1.0} y={1.0} />
        </View>
      : <View style={{ flex: 1 }} testID={'carousel'}>
          <View style={{ flex: 1 }} />
          <View style={{ ...Styles.lastReading }}>
            <ActivityIndicator color={'black'} />
          </View>
          <GradientBorder x={1.0} y={1.0} />
        </View>
  )
}

export default Carousel


const Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ebebeb'
  },
  header: {
    flex: 1.1,
    flexDirection: 'row',
    width: '100%',
  },
  contentContainer: {
    flexDirection: 'row',
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center'
},
  template: {
    flex: 4,
    alignContent: 'center'
  },
  chevron: {
    flex: 1
  },
  tag: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 4,
    color: 'white',
    backgroundColor: 'black',
    width: 60
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 4
  },
  lastReading: {
    flex: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
