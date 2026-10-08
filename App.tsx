/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { models, useLLMChatSession } from 'react-native-executorch';

export default function App() {
  const [output, setOutput] = useState('');
  const [busy, setBusy] = useState(false);

  const session = useLLMChatSession(models.llm.LFM2_5_350M.DEFAULT, {
    initialMessages: [
      { role: 'system', content: 'You are a concise clinical note assistant.' },
    ],
    generationConfig: { temperature: 0.2, maxNewTokens: 128 },
  });

  const status = session.error
    ? `Error: ${session.error.message}`
    : session.isReady
    ? 'Model ready'
    : `Downloading model: ${Math.round(session.downloadProgress)}%`;

  const handleTest = async () => {
    if (!session.isReady || !session.sendMessage) return;
    setOutput('');
    setBusy(true);
    try {
      await session.sendMessage(
        'Rewrite as a short clinical note: patient has had a mild headache for two days.',
        (token) => setOutput((prev) => prev + token),
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ClinicaEdge AI Scribe</Text>
      <Text style={styles.status}>{status}</Text>
      <ScrollView style={styles.card}>
        <Text style={styles.output}>{output || 'No output yet.'}</Text>
      </ScrollView>
      <TouchableOpacity
        style={[styles.button, (!session.isReady || busy) && styles.disabled]}
        onPress={handleTest}
        disabled={!session.isReady || busy}
      >
        <Text style={styles.buttonText}>{busy ? 'Generating...' : 'Run test'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 },
  status: { textAlign: 'center', marginBottom: 16, color: '#555' },
  card: { flex: 1, backgroundColor: 'white', padding: 16, borderRadius: 10, marginBottom: 20 },
  output: { fontSize: 16, color: '#333' },
  button: { backgroundColor: '#007AFF', padding: 18, borderRadius: 50, alignItems: 'center' },
  disabled: { backgroundColor: '#9bbcf0' },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});