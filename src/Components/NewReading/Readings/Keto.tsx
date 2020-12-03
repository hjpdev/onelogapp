import React, { useState } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

import ReadingService from '../../../Services/ReadingService'
import SuccessModal from '../../Modals/SuccessModal'
import { TimeSelector, WheelSelector } from '../../Minor'
import { NewReadingHeader } from '../NewReadingHeader'
import { delay, WheelSelectorOptions } from '../../../Helpers/General'
import { DataKey, NewReadingHeaderText, Table } from '../../../types'
import { KetoStyles } from '../Styles'

const dataKey = DataKey.keto
const readingService = new ReadingService()

export const NewKetoReading: React.FC = () => {
  const [data, setData] = useState(0.0)
  const [dateTime, setDateTime] = useState<Date | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleSubmit = async () => {
    let response
    if (data === 0) {
      delay(500)
    }
    try {
      const reading = dateTime ? { data, created: dateTime } : { data }
      response = await readingService.submitReading({ table: Table.keto, reading })
    } catch (err) {
      console.log('Error keto handleSubmit: ', err) // eslint-disable-line no-console
    }

    return response && readingService.handleSuccessfulSubmit(dataKey, response, setShowSuccessModal)
  }

  return (
    <>
      <NewReadingHeader headerText={NewReadingHeaderText.keto} dataKey={dataKey} />
      <View style={KetoStyles.container}>
        <TimeSelector setDateTime={setDateTime} />
        <WheelSelector
          integerOptions={WheelSelectorOptions.default}
          fractionOptions={WheelSelectorOptions.default}
          updateData={setData}
        />
        <Text style={KetoStyles.unit}>mmol/L</Text>
        <TouchableOpacity onPress={async () => handleSubmit()} style={KetoStyles.submit}>
          <Text style={KetoStyles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
      <SuccessModal isVisible={showSuccessModal} onPress={() => setShowSuccessModal(false)} />
    </>
  )
}

export default NewKetoReading
