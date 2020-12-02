import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, Image
} from 'react-native';

import GradientBorder from '../Minor/GradientBorder';
import ModifySavedMacroModal from '../Modals/Modification/ModifySavedMacroModal';
import MacroCollectionConfirmationModal from './MacroCollection/MacroCollectionConfirmationModal';
import { capitaliseAddWhitespace, truncateName } from '../../Helpers/General';
import { PlusSymbol } from '../Minor/PlusSymbol';
import { StoredSavedMacroReading } from '../../types';
import { SavedMacroStyles } from './Styles';

interface SavedMacroProps {
  reading: StoredSavedMacroReading
  update: () => void
  addEntry: (amount: number, entry: StoredSavedMacroReading) => void
}

const SavedMacro: React.FC<SavedMacroProps> = (props: SavedMacroProps) => {
  const { reading, update, addEntry } = props;
  const {
    id, name, amount, unit
  } = reading;
  const {
    kcal, carbs, sugar, protein, fat
  } = reading.data;

  const [isOpen, setIsOpen] = useState(false);
  const [showModifySavedMacroModal, setShowModifySavedMacroModal] = useState(false);
  const [showMacroCollectionConfirmationModal, setShowMacroCollectionConfirmationModal] = useState(false);

  return (
    <>
      <View style={SavedMacroStyles.container}>
        <View style={SavedMacroStyles.title}>
          <TouchableOpacity onPress={() => setShowModifySavedMacroModal(true)}>
            <Image source={require('../../Assets/Images/NavBarSettings.png')} style={SavedMacroStyles.icon} />
          </TouchableOpacity>
          <View style={SavedMacroStyles.name}>
            <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <Text
                  style={{
                    ...SavedMacroStyles.nameText,
                    flexWrap: 'wrap'
                  }}
                >
                  {`${capitaliseAddWhitespace(name)}`}
                </Text>
              ) : (
                <Text style={SavedMacroStyles.nameText}>{`${truncateName(10, name)}`}</Text>
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setShowMacroCollectionConfirmationModal(true)}>
            <PlusSymbol />
          </TouchableOpacity>
        </View>
        <GradientBorder x={1.0} y={1.0} />
        <Text>
          {amount}
          {' '}
          {unit}
        </Text>
        <GradientBorder x={1.0} y={1.0} />
        <View style={SavedMacroStyles.readingContainer}>
          <View style={SavedMacroStyles.labels}>
            <Text style={SavedMacroStyles.label}>Kcal:</Text>
            <Text style={SavedMacroStyles.label}>Carbs:</Text>
            <Text style={SavedMacroStyles.label}>Sugar:</Text>
            <Text style={SavedMacroStyles.label}>Protein:</Text>
            <Text style={SavedMacroStyles.label}>Fat:</Text>
          </View>

          <View style={SavedMacroStyles.values}>
            <Text style={SavedMacroStyles.value}>{kcal.toFixed(2)}</Text>
            <Text style={SavedMacroStyles.value}>{carbs.toFixed(2)}</Text>
            <Text style={SavedMacroStyles.value}>{sugar.toFixed(2)}</Text>
            <Text style={SavedMacroStyles.value}>{protein.toFixed(2)}</Text>
            <Text style={SavedMacroStyles.value}>{fat.toFixed(2)}</Text>
          </View>
        </View>
      </View>
      <ModifySavedMacroModal
        isVisible={showModifySavedMacroModal}
        data={reading.data}
        onClose={() => setShowModifySavedMacroModal(false)}
        update={update}
      />
      <MacroCollectionConfirmationModal
        isVisible={showMacroCollectionConfirmationModal}
        data={reading.data}
        onClose={() => setShowMacroCollectionConfirmationModal(false)}
        onSubmit={addEntry}
      />
    </>
  );
};

export default SavedMacro;
