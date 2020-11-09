import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Searh from './App/Screens/Search';

export default function App() {
  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="white"/>
    <Searh />
    </>
  );
};