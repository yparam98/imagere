import React from 'react';
import { SafeAreaView} from 'react-native';
import LandingPage from './app/components/LandingPage';

export default function App() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000000'}}>
      <LandingPage/>
    </SafeAreaView>
  );
}

