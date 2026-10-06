/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.center}>
        <Text style={styles.title}>ClinicaEdge</Text>
        <Text style={styles.subtitle}>Build and install working ✅</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', color: '#111' },
  subtitle: { marginTop: 8, fontSize: 16, color: '#555' },
});

export default App;