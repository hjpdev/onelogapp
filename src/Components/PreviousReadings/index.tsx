import React from 'react'
import { View, StyleSheet } from 'react-native'

import PreviousReadingsForDate from './PreviousReadingsForDate'
import NewReadingHeader from '../Minor/NewReadingHeader'

type PreviousReadingsProps = {
  onBack: () => void
}

const PreviousReadings: React.FC<PreviousReadingsProps> = (props: PreviousReadingsProps) => {
  const { onBack } = props

  const generateListItems = () => {
    const dates = ['26/08', '25/08', '24/08']
    return dates.map(date => {
      return <PreviousReadingsForDate date={date} key={date} />
    })
  }

  return(
    <>
    <NewReadingHeader text={'Previous Bg Readings'} hidePreviousIcon onBack={onBack} onShowPrevious={() => null} />
    <View style={Styles.container}>
      {generateListItems()}
    </View>
    </>
  )
}

export default PreviousReadings


const Styles = StyleSheet.create({
  container: {
    height: '92%'
  }
})
