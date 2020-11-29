import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import ChoiceButtons from '../../Minor/ChoiceButtons';
import DeleteConfirmationModal from '../DeleteConfirmationModal';
import ModifyTimeSelector from '../../Minor/ModifyTimeSelector';
import ReadingService from '../../../Services/ReadingService';
import SuccessModal from '../SuccessModal';
import WheelSelector from '../../Minor/WheelSelector';
import {WheelSelectorOptions, generateCreatedDate} from '../../../Helpers';
import {BgReading, DataKey} from '../../../types';

interface ModifyBgModalProps {
  isVisible: boolean;
  reading: BgReading;
  onClose: () => void;
  update: (dataKey: string) => void;
}

const dataKey = DataKey.bg;
const readingService = new ReadingService();

const ModifyBgModal: React.FC<ModifyBgModalProps> = (
  props: ModifyBgModalProps,
) => {
  const {isVisible, reading, onClose, update} = props;

  const [created, setCreated] = useState(reading.created);
  const [data, setData] = useState<number>(reading.data || 0.0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [
    showDeleteConfirmationModal,
    setShowDeleteConfirmationModal,
  ] = useState(false);

  const handleSubmit = async () => {
    try {
      const body = created !== reading.created ? {created, data} : {data};
      const response = await readingService.putReading({
        table: 'bg',
        data: body,
        id: reading.id,
      });

      await readingService.handleSuccessfulUpdate(
        dataKey,
        response,
        setShowSuccessModal,
      );
      update(dataKey);
      onClose();
    } catch (err) {
      console.log(`Error ModifyBgModal.handleSubmit: ${err}`);
    }
  };

  return (
    <>
      <Modal
        isVisible={isVisible}
        animationIn="zoomIn"
        animationOut="zoomOut"
        animationInTiming={500}
        animationOutTiming={500}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
        backdropOpacity={0.66}
        style={Styles.modal}>
        <View style={Styles.container}>
          <ModifyTimeSelector created={created} setDateTime={setCreated} />
          <WheelSelector
            data={data}
            integerOptions={WheelSelectorOptions.bgInt}
            fractionOptions={WheelSelectorOptions.default}
            updateData={setData}
          />
          <View style={Styles.deleteContainer}>
            <TouchableOpacity
              onPress={() => setShowDeleteConfirmationModal(true)}>
              <Text style={Styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
          <ChoiceButtons
            confirmationText="Submit"
            cancellationText="Cancel"
            onSubmit={async () => await handleSubmit()}
            onClose={onClose}
          />
        </View>
      </Modal>
      <SuccessModal
        isVisible={showSuccessModal}
        onPress={() => setShowSuccessModal(false)}
      />
      <DeleteConfirmationModal
        isVisible={showDeleteConfirmationModal}
        id={reading.id}
        name={generateCreatedDate(`${reading.created}`)}
        table="bg"
        dataKey="bgReadings"
        onClose={() => setShowDeleteConfirmationModal(false)}
        update={() => update('bgReadings')}
      />
    </>
  );
};

export default ModifyBgModal;

const Styles = StyleSheet.create({
  modal: {
    alignItems: 'center',
  },
  container: {
    width: 260,
    backgroundColor: '#ebebeb',
    borderWidth: 1.5,
    borderBottomWidth: 2,
    borderRadius: 4,
    alignItems: 'center',
  },
  deleteContainer: {
    width: '33%',
    margin: 4,
    borderBottomWidth: 2,
    borderRadius: 4,
    marginVertical: 10,
  },
  deleteText: {
    textAlign: 'center',
  },
});
