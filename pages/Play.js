import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av'; // Importe Audio em vez de useTrackPlayerProgress

const Play = ({ route }) => {
  const { item } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null); // Adicione um estado para o som

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync({ uri: item.audioUrl });
      setSound(sound);
      setIsPlaying(true);
      await sound.playAsync();
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync(); // Descarregue o som ao desmontar o componente
      }
    };
  }, [item]);

  const togglePlayback = async () => {
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const skipBackward = async () => {
    if (sound) {
      const newPosition = Math.max(0, await sound.getStatusAsync()).positionMillis - 5000; // Use getStatusAsync para obter a posição do som
      await sound.setPositionAsync(Math.max(0, newPosition)); // Defina a nova posição do som
    }
  };

  const skipForward = async () => {
    if (sound) {
      const newPosition = (await sound.getStatusAsync()).positionMillis + 5000;
      await sound.setPositionAsync(Math.min((await sound.getStatusAsync()).durationMillis, newPosition));
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.controls}>
        <TouchableOpacity onPress={skipBackward}>
          <Text style={styles.controlButton}>-5s</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlayback}>
          <Text style={styles.controlButton}>{isPlaying ? 'Pause' : 'Play'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={skipForward}>
          <Text style={styles.controlButton}>+5s</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  thumbnail: {
    width: 300,
    height: 200,
    borderRadius: 15,
    resizeMode: "contain", // Corrigido: deve estar dentro da mesma linha que as outras propriedades
  },  
  title: {
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center'
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  controlButton: {
    fontSize: 16,
    color: 'blue',
    fontWeight: 'bold',
    margin: 20
  },
});

export default Play;