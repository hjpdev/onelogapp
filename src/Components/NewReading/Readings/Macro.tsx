import React, { useState } from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import MacroReadingInput from '../../Minor/MacroReadingInput';
import ReadingService from '../../../Services/ReadingService';
import SavedMacros from '../../SavedMacros/SavedMacros';
import SuccessModal from '../../Modals/SuccessModal';
import TimeSelector from '../../Minor/TimeSelector';
import { NewReadingHeader } from '../NewReadingHeader';
import { DataKey, MacroReadingData, Table } from '../../../types';

interface NewMacroReadingProps {
  route?: {
    params: {
      macros: MacroReadingData
    }
  }
}

const dataKey = DataKey.macro;
const readingService = new ReadingService();

export const NewMacroReading: React.FC<NewMacroReadingProps> = (props: NewMacroReadingProps) => {
  const { route } = props;
  const macros = route && route.params && route.params.macros;

  const [data, setData] = useState<{ [key: string]: string | number }>(macros || ({} as MacroReadingData));
  const [dateTime, setDateTime] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const Stack = createStackNavigator();

  const handleSubmit = async () => {
    if (Object.keys(data).length > 0) {
      if (!Object.keys(data).every((macro) => data[macro] === 0)) {
        try {
          const reading = dateTime ? { ...data, created: dateTime } : { ...data };
          const response = await readingService.submitReading({ table: Table.macro, data });

          return readingService.handleSuccessfulSubmit(dataKey, response, setShowSuccessModal);
        } catch (err) {
          console.log('Error macro handleSubmit: ', err);
        }
      }
    }
  };

  const newMacroReading = () => (
    <>
      <NewReadingHeader headerText="Macro" dataKey={dataKey} />
      <View style={Styles.container}>
        <TimeSelector setDateTime={setDateTime} />
        <MacroReadingInput showSavedMacroOptions reading={macros} updateReading={setData} />
        <TouchableOpacity onPress={async () => await handleSubmit()} style={Styles.submit}>
          <Text style={Styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
      <SuccessModal isVisible={showSuccessModal} onPress={() => setShowSuccessModal(false)} />
    </>
  );

  const savedMacros = () => <SavedMacros updateReading={setData} />;

  return (
    <Stack.Navigator initialRouteName="MacroReading" screenOptions={{ headerShown: false, animationEnabled: false }}>
      <Stack.Screen name="MacroReading" component={newMacroReading} />
      <Stack.Screen name="SavedMacros" component={savedMacros} />
    </Stack.Navigator>
  );
};

export default NewMacroReading;

const Styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '92%'
  },
  submit: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderBottomWidth: 2,
    borderRadius: 4,
    padding: 16,
    backgroundColor: '#d6d6d6'
  },
  submitText: {
    fontSize: 18
  }
});
