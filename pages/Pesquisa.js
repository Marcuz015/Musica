import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Componente de barra de pesquisa
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (text) => {
    setQuery(text);
  };

  const handleSubmit = () => {
    onSearch(query);
  };

  return (
    <View style={{ alignItems: 'center', backgroundColor: '#fff' }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, width: '80%', textAlign: 'center', borderRadius: 15 }}
        value={query}
        onChangeText={handleChange}
        placeholder="Buscar por Música"
      />
      <TouchableOpacity onPress={handleSubmit} title="Search" style={styles.btn}>
        <Text style={{ textAlign: 'center' }}>Buscar</Text>
      </TouchableOpacity>
    </View>
  );
};

// Componente de resultados da busca
const SearchResults = ({ results }) => {
  const navigation = useNavigation();

  // Função para lidar com o clique em um resultado da busca
  const handleItemPress = (video) => {
    navigation.navigate('Play', { item: video }); // Passando todos os detalhes do vídeo para a página Play
  };

  return (
    <FlatList
      data={results}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleItemPress(item)} style={styles.videoContainer}>
          <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
          <Text style={styles.videoTitle}>{item.title}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

// Estilos
const styles = StyleSheet.create({
  videoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 10,
    width: '95%',
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 10
  },
  thumbnail: {
    width: 90,
    height: 90,
    margin: 5,
    borderRadius: 15,
  },
  videoTitle: {
    flex: 1,
  },
  btn: {
    backgroundColor: '#4CAF50',
    width: '50%',
    borderRadius: 15,
  }
});

// Componente principal
const Pesquisa = () => {
  const [results, setResults] = useState([]);

  // Função para buscar vídeos no YouTube
  const searchYouTube = async (query) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?q=${query}&part=snippet&key=AIzaSyDpEMzoGzezLjnYrxMp5EPodEFeNhZA8Ho`
      );
      const data = await response.json();
      const videos = data.items ? data.items.map((item) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.default.url,
      })) : [];
      setResults(videos);
    } catch (error) {
      console.error('Error searching YouTube:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1 }}>
        <Text style={{ textAlign: 'center', marginBottom: 10, marginTop: 10 }}>Buscar pelo Youtube</Text>
        <SearchBar onSearch={searchYouTube} />
        <SearchResults results={results} />
      </View>
    </SafeAreaView>
  );
};

// Exportação do componente principal
export default Pesquisa;
