// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { View } from './App/old/components/Themed';

// import useCachedResources from './App/old/hooks/useCachedResources';
// import useColorScheme from './App/old/hooks/useColorScheme';
// import Navigation from './App/old/navigation';

import { Screens } from './App/Screens';
// import { Loading as LoadingBackground } from './App/Screens/Loading/Loading';
// import { Search } from './App/Screens/Search/Search';
// import Home from './App/Screens/Home';


export default function App() {
  // const isLoadingComplete = useCachedResources();
  // const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <Screens />
    </SafeAreaProvider>
  ); 
}
