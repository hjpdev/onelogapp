import { enableMocks } from 'jest-fetch-mock'
import { View as mockView } from "react-native"
import 'react-native-gesture-handler/jestSetup'

jest.mock('react-native-reanimated', () => {
  return {
    Value: jest.fn(),
    event: jest.fn(),
    add: jest.fn(),
    eq: jest.fn(),
    set: jest.fn(),
    cond: jest.fn(),
    interpolate: jest.fn(),
    View: mockView,
    Extrapolate: { CLAMP: jest.fn() }
  }
})

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')

enableMocks()
