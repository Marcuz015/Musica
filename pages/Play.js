import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useTrackPlayerProgress } from 'expo-av';

const Play = ({ route }) => {
  const { item } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const { position, duration } = useTrackPlayerProgress(1000);

  useEffect(() => {
    (async () => {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add({
        id: item.id,
        url: item.audioUrl,
        title: item.title,
        artist: 'Artista',
        artwork: item.thumbnail,
      });
      await TrackPlayer.play();
      setIsPlaying(true);
    })();

    return () => {
      TrackPlayer.stop();
    };
  }, [item]);

  const togglePlayback = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipBackward = async () => {
    let newPosition = position - 5;
    if (newPosition < 0) {
      newPosition = 0;
    }
    await TrackPlayer.seekTo(newPosition);
  };

  const skipForward = async () => {
    let newPosition = position + 5;
    if (newPosition > duration) {
      newPosition = duration;
    }
    await TrackPlayer.seekTo(newPosition);
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
    width: 200,
    height: 200,
    borderRadius: 15
  },
  title: {
    fontSize: 18,
    marginTop: 10,
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
  },
});

export default Play;
