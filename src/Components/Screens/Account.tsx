import React from 'react';
import { Text, View } from 'react-native';

import ScreenStyles from '../../Assets/Styles/Screen';

const AccountScreen: React.FC = () => (
  <>
    <View style={ScreenStyles.container} testID="account-screen">
      <Text style={ScreenStyles.text}>
        Account
      </Text>
    </View>
  </>
);

export default AccountScreen;
