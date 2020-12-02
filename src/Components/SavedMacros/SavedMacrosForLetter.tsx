import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import GradientBorder from '../Minor/GradientBorder';
import SavedMacro from './SavedMacro';
import { StoredSavedMacroReading } from '../../types';
import { SavedMacrosForLetterStyles } from './Styles';

interface SavedMacrosForLetterProps {
  letter: string
  readings: StoredSavedMacroReading[]
  update: () => void
  addEntry: (amount: number, entry: StoredSavedMacroReading) => void
}

const SavedMacrosForLetter: React.FC<SavedMacrosForLetterProps> = (props: SavedMacrosForLetterProps) => {
  const {
    letter, readings, update, addEntry
  } = props;
  const [isOpen, setIsOpen] = useState(false);

  const generateList = () => readings.map((reading) => <SavedMacro key={reading.id} reading={reading} update={update} addEntry={addEntry} />);

  return (
    <>
      <GradientBorder x={1.0} y={1.0} />
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={SavedMacrosForLetterStyles.date}>
        <Text style={SavedMacrosForLetterStyles.placeholder}>▼</Text>
        <Text style={SavedMacrosForLetterStyles.letterText}>{letter.toUpperCase()}</Text>
        <Text style={SavedMacrosForLetterStyles.chevron}>{isOpen ? '▼' : '▶︎'}</Text>
      </TouchableOpacity>
      {isOpen && (
        <>
          <GradientBorder x={1.0} y={1.0} />
          <View style={SavedMacrosForLetterStyles.view}>{generateList()}</View>
        </>
      )}
      <GradientBorder x={1.0} y={1.0} />
    </>
  );
};

export default SavedMacrosForLetter;
