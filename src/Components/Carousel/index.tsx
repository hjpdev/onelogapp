import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures';

import { IBgReading } from './Readings/Bg'
import { IStatsReading } from './Readings/Stats'
import { IDoseReading } from './Readings/Dose'
import { IMacroReading } from './Readings/Macro';

import { getData } from '../Store/index'
import { GradientBorder } from '../Minor/GradientBorder'
import { Chevron } from '../Minor/Chevron'
import { generateCreatedDate } from '../Helpers/Date'
import { capitalise } from '../Helpers/General'

export interface BgTemplateProps {
  data: IBgReading
}
export interface StatsTemplateProps {
  data: IStatsReading
}
export interface DoseTemplateProps {
  data: IDoseReading
}
export interface MacroTemplateProps {
  data: IMacroReading
}

interface CarouselProps {
  table: string,
  Template: React.FC<BgTemplateProps> | React.FC<StatsTemplateProps> | React.FC<DoseTemplateProps> | React.FC<MacroTemplateProps>,
  dataKey: string
}

const Carousel: React.FC<CarouselProps> = (props: CarouselProps) => {
  const { table, Template, dataKey } = props
  const [readings, setReadings] = useState([] as any)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const fetchReadings = async (key: string) => {
      try {
        const data = await getData(key)
        if (data && data.readings) {
          setReadings(data.readings)
        }
      } catch(err) {
        console.log('Error fetchReadings: ', err)
      }
    }
    fetchReadings(dataKey)
  }, [])

  const handleSwipeLeft = () => {
    if (index < readings.length - 1) setIndex(index + 1)
  }

  const handleSwipeRight = () => {
    if (index > 0) setIndex(index - 1)
  }

  const reading = readings && readings[index]

  return(
    readings.length > 0
      ? <View style={Styles.container}>
          <View style={Styles.header}>
            <Text style={Styles.tag}>
              { capitalise(table) }
            </Text>
            <Text style={Styles.time}>
              { generateCreatedDate(reading['created']) }
            </Text>
          </View>
          <GradientBorder x={0.4} y={1.0} colors={['grey', '#ebebeb']} />

          <View style={Styles.contentContainer}>
            <View style={Styles.chevron}>
            {index === 0
              ? <Chevron symbol={''} handlePress={() => null}/>
              : <Chevron symbol={'<'} handlePress={handleSwipeRight} />}
            </View>
            <GestureRecognizer onSwipeLeft={handleSwipeLeft} onSwipeRight={handleSwipeRight} style={Styles.template}>
              <Template data={reading} />
            </GestureRecognizer>
            <View style={Styles.chevron}>
            {index < readings.length - 1
              ? <Chevron symbol={'>'} handlePress={handleSwipeLeft} />
              : <Chevron symbol={''} handlePress={() => null} />}
            </View>
          </View>
          <GradientBorder x={1.0} y={1.0} />
        </View>
      : <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }} />
          <View style={{ ...Styles.lastReading }}>
            <ActivityIndicator color={'black'} />
          </View>
          <GradientBorder x={1.0} y={1.0} />
        </View>
  )
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ebebeb'
  },
  header: {
    flex: 1,
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

export default Carousel
