import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native'

import DeleteConfirmationModal from '../../Modals/DeleteConfirmationModal'
import ModifyBgModal from '../../Modals/Modification/ModifyBgModal'
import { GradientBorder } from '../../Minor'
import { generateCreatedTime } from '../../../Helpers/Date'
import { StoredBgReading, DataKey, Table } from '../../../types'

interface PreviousBgReadingProps {
  reading: StoredBgReading
  update: (dataKey: string) => void
}

export const PreviousBgReading: React.FC<PreviousBgReadingProps> = (props: PreviousBgReadingProps) => {
  const { reading, update } = props

  const [showModifyBgModal, setShowModifyBgModal] = useState(false)
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false)

  const { created, data } = reading
  const timeCreated = generateCreatedTime(created)

  const handleDelete = (): void => {
    setShowModifyBgModal(false)
    setTimeout(() => {
      setShowDeleteConfirmationModal(true)
    }, 100)
  }

  const generateColor = (): string | undefined => {
    if (data < 3.9) return 'rgba(217, 30, 30, 0.9)' // '#d91e1e'
    if (data >= 3.9 && data < 8.1) return '#279621'
    if (data > 8.0) return '#deda00'
  }

  const color = (reading && generateColor()) || '#ebebeb'

  return (
    <>
      <View style={Styles.container}>
        <View style={Styles.header}>
          <TouchableOpacity onPress={() => setShowModifyBgModal(true)}>
            <Image source={require('../../../Assets/Images/NavBarSettings.png')} style={Styles.icon} />
          </TouchableOpacity>
          <Text style={Styles.timeCreated}>{timeCreated}</Text>
          <TouchableOpacity>
            <Image source={require('../../../Assets/Images/NavBarSettings.png')} style={Styles.placeholder} />
          </TouchableOpacity>
        </View>
        <GradientBorder x={1.0} y={1.0} />
        <TouchableOpacity onPress={() => setShowModifyBgModal(true)}>
          <View>
            <LinearGradient colors={['#ebebeb', color]} start={{ x: 0.5, y: 0.75 }}>
              <Text style={Styles.reading}>{data.toFixed(1)}</Text>
            </LinearGradient>
          </View>
        </TouchableOpacity>
      </View>
      <ModifyBgModal
        isVisible={showModifyBgModal}
        reading={reading}
        onClose={() => setShowModifyBgModal(false)}
        onDelete={handleDelete}
        update={update}
      />
      <DeleteConfirmationModal
        isVisible={showDeleteConfirmationModal}
        reading={reading}
        table={Table.bg}
        dataKey={DataKey.bg}
        onClose={() => setShowDeleteConfirmationModal(false)}
        update={() => update(DataKey.bg)}
      />
    </>
  )
}

const Styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ebebeb',
    borderWidth: 1,
    borderBottomWidth: 2,
    borderRadius: 4,
    paddingLeft: 6,
    paddingRight: 6,
    margin: 4,
    width: '18%'
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  icon: {
    tintColor: 'black',
    height: 10,
    width: 10
  },
  placeholder: {
    tintColor: '#ebebeb',
    height: 10,
    width: 10
  },
  timeCreated: {
    fontSize: 14
  },
  reading: {
    fontSize: 28,
    paddingVertical: 6
  }
})
