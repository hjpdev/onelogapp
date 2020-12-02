import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import GradientBorder from '../../Minor/GradientBorder';
import { EntryStyles } from './Styles';
import { StoredSavedMacroReading } from '../../../types';
import { capitaliseAddWhitespace, truncateName } from '../../../Helpers/General';

interface MacroCollectionEntryProps {
  amount: number
  reading: StoredSavedMacroReading
  removeEntry: (key: string) => void
}

const MacroCollectionEntry: React.FC<MacroCollectionEntryProps> = (props: MacroCollectionEntryProps) => {
  const { amount, reading, removeEntry } = props;
  const { data } = reading;

  const [isOpen, setIsOpen] = useState(false);

  const ratio = parseFloat((amount / reading.amount).toFixed(2));

  return (
    <>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={EntryStyles.header}>
        <TouchableOpacity onPress={() => removeEntry(`${reading.id}-${amount}`)}>
          <Text style={EntryStyles.remove}>X</Text>
        </TouchableOpacity>
        <View style={EntryStyles.headerText}>
          {isOpen
            ? <Text style={{ flexWrap: 'wrap' }}>{`${capitaliseAddWhitespace(reading.name)}`}</Text>
            : <Text>{`${truncateName(28, reading.name)}`}</Text>}
        </View>
        <View>
          <Text style={{ textAlign: 'right' }}>{`  ${(ratio * reading.amount).toFixed(0)} ${reading.unit}`}</Text>
        </View>
        <View>
          <Text style={EntryStyles.chevron}>{ isOpen ? '▼' : '▶︎'}</Text>
        </View>
      </TouchableOpacity>
      {isOpen
	  && (
<>
  <GradientBorder x={1.0} y={1.0} />
  <View style={EntryStyles.readingContainer}>
    <View style={EntryStyles.labels}>
      <Text style={EntryStyles.label}>Kcal:</Text>
      <Text style={EntryStyles.label}>Carbs:</Text>
      <Text style={EntryStyles.label}>Sugar:</Text>
      <Text style={EntryStyles.label}>Protein:</Text>
      <Text style={EntryStyles.label}>Fat:</Text>
    </View>

    <View style={EntryStyles.values}>
      <Text style={EntryStyles.value}>{ (ratio * data.kcal).toFixed(2) }</Text>
      <Text style={EntryStyles.value}>{ (ratio * data.carbs).toFixed(2) }</Text>
      <Text style={EntryStyles.value}>{ (ratio * data.sugar).toFixed(2) }</Text>
      <Text style={EntryStyles.value}>{ (ratio * data.protein).toFixed(2) }</Text>
      <Text style={EntryStyles.value}>{ (ratio * data.fat).toFixed(2) }</Text>
    </View>
  </View>
</>
	  )}
      <GradientBorder x={1.0} y={1.0} />
    </>
  );
};

export default MacroCollectionEntry;
