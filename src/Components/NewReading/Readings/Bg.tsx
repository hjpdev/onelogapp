import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import ReadingService from '../../../Services/ReadingService'
import SuccessModal from '../../Modals/SuccessModal'
import { TimeSelector, WheelSelector } from '../../Minor'
import { NewReadingHeader } from '../NewReadingHeader'
import { delay, WheelSelectorOptions } from '../../../Helpers'
import { DataKey, NewReadingHeaderText, Table } from '../../../types'
import { BgStyles } from '../Styles'

const dataKey = DataKey.bg
const readingService = new ReadingService()

export const NewBgReading: React.FC = () => {
  const [data, setData] = useState(0.0)
  const [dateTime, setDateTime] = useState<Date | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleSubmit = async () => {
    let response
    if (data > 0) {
      if (data < 1) {
        delay(500)
      }
      try {
        const reading = dateTime ? { data, created: dateTime } : { data }
        response = await readingService.submitReading({
          table: Table.bg,
          reading
        })
      } catch (err) {
        console.log('Error bg handleSubmit: ', err) // eslint-disable-line no-console
      }
    }

    return response && readingService.handleSuccessfulSubmit(dataKey, response, setShowSuccessModal)
  }

  return (
    <>
      <NewReadingHeader headerText={NewReadingHeaderText.bg} dataKey={dataKey} />
      <View style={BgStyles.container}>
        <TimeSelector setDateTime={setDateTime} />
        <WheelSelector
          integerOptions={WheelSelectorOptions.bgInt}
          fractionOptions={WheelSelectorOptions.default}
          updateData={setData}
        />
        <Text style={BgStyles.unit}>mmol/L</Text>
        <TouchableOpacity onPress={async () => handleSubmit()} style={BgStyles.submit}>
          <Text style={BgStyles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
      <SuccessModal isVisible={showSuccessModal} onPress={() => setShowSuccessModal(false)} />
    </>
  )
}

export default NewBgReading
