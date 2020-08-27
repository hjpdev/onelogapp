import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import NewReadingHeader from '../Minor/NewReadingHeader'

type PreviousReadingsModalProps = {
  onBack: () => void
}

const PreviousReadingsModal: React.FC<PreviousReadingsModalProps> = (props: PreviousReadingsModalProps) => {
  const { onBack } = props

  return(
    <>
    <NewReadingHeader text={'Previous Bg Readings'} onBack={onBack} onShowPrevious={() => null} />
    <View style={Styles.container}>
      <View>
        <Text>{'PreviousReadings'}</Text>
      </View>
    </View>
    </>
  )
}

export default PreviousReadingsModal


const Styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '92%'
  }
})
