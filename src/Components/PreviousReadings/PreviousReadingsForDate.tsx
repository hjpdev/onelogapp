import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import GradientBorder from '../Minor/GradientBorder';
import { StoredReading } from '../../types';
import { ForDateStyles } from './Styles';

type PreviousReadingsForDateProps = {
  date: string
  readings: StoredReading[]
  Template: any
  update: (dataKey: string) => void
  opened?: boolean
}

const PreviousReadingsForDate: React.FC<PreviousReadingsForDateProps> = (props: PreviousReadingsForDateProps) => {
  const {
    date, opened, readings, Template, update
  } = props;
  const [isOpen, setIsOpen] = useState(opened || false);

  const generateList = () => readings.map((reading) => <Template key={reading.id} reading={reading} update={update} />);

  return (
    <View>
      <View style={ForDateStyles.header}>
        <GradientBorder x={1.0} y={1.0} />
        <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={ForDateStyles.date}>
          <Text style={ForDateStyles.placeholder}>▶︎</Text>
          <Text style={ForDateStyles.dateText}>{date}</Text>
          <Text style={ForDateStyles.chevron}>{isOpen ? '▼' : '▶︎'}</Text>
        </TouchableOpacity>
        {isOpen && (
          <>
            <GradientBorder x={1.0} y={1.0} />
            <View style={ForDateStyles.view}>{generateList()}</View>
          </>
        )}
        <GradientBorder x={1.0} y={1.0} />
      </View>
    </View>
  );
};

export default PreviousReadingsForDate;
