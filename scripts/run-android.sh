#!/bin/bash

react-native run-android --port=8083 && adb reverse tcp:8088 tcp:8088
