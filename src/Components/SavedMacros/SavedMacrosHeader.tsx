import React from 'react';
import {
  Image, View, Text, TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import GradientBorder from '../Minor/GradientBorder';
import { SavedMacrosHeaderStyles } from './Styles';

interface SavedMacrosHeaderProps {
  numberOfEntries: number
  onPress: () => void
}

const SavedMacrosHeader: React.FC<SavedMacrosHeaderProps> = (props: SavedMacrosHeaderProps) => {
  const { numberOfEntries, onPress } = props;

  const navigation = useNavigation();

  return (
    <>
      <View style={SavedMacrosHeaderStyles.header}>
        <View style={SavedMacrosHeaderStyles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../Assets/Images/BackArrow.png')} style={SavedMacrosHeaderStyles.backIcon} />
          </TouchableOpacity>
        </View>
        <View style={SavedMacrosHeaderStyles.textContainer}>
          <Text style={SavedMacrosHeaderStyles.text}>Saved Macros</Text>
        </View>
        <View style={SavedMacrosHeaderStyles.iconContainer}>
          <TouchableOpacity onPress={onPress}>
            <Image
              source={require('../../Assets/Images/PreviousReadings.png')}
              style={{ height: 40, width: 30, position: 'absolute' }}
            />
            <Text style={SavedMacrosHeaderStyles.numberOfEntries}>{numberOfEntries}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <GradientBorder x={1.0} y={1.0} />
    </>
  );
};

export default SavedMacrosHeader;
