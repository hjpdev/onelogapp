import React, { useState } from 'react'
import { Text,  View } from 'react-native'
import { WheelPicker } from "../../react-native-wheel-picker-android"

import { clockMinutes, clockHours } from '../../Helpers/General'

const TimeInput: React.FC = () => {
  const time = new Date()

  const [hours, setHours] = useState(time.getHours())
  const [minutes, setMinutes] = useState(time.getMinutes())

  return(
    <View>
      <Text>
        {/* { `${time.getHours()}:${time.getMinutes()}` } */}
        {/* {parseInt(hours[0])} */}
        {`${hours}:${minutes}`}
      </Text>
      <View style={{flexDirection: 'row'}}>
        <View>
          <WheelPicker 
            selectedItem={hours}
            data={clockHours}
            onItemSelected={setHours}
            isCyclic={true}
            selectedItemTextSize={20}
            itemTextSize={8}
          />
        </View>
        <Text>{':'}</Text>
        <View>
          <WheelPicker 
            selectedItem={minutes}
            data={clockMinutes}
            onItemSelected={setMinutes}
            isCyclic={true}
            selectedItemTextSize={20}
            itemTextSize={8}
          />
        </View>
      </View>
    </View>
  )
}

export default TimeInput