import * as React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";

import Home from '../pages/Home';
import Pesquisa from '../pages/Pesquisa';
import PlayList from '../pages/PlayList';
import Play from '../pages/Play';

const Tab = createBottomTabNavigator();

export default function Routes() {

  const header = (
    <View>
      <Image
        source={require('../img/logo.png')}
        style={styles.headerImage}
      />
    </View>
  )

  return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} options={{headerTitle: ()=> header,tabBarIcon: ({color, size}) => <Ionicons name="headset" size={size} color={color} />}}/>
        <Tab.Screen name="PlayList" component={PlayList} options={{headerTitle: ()=> header,tabBarIcon: ({color, size}) => <MaterialIcons name="library-music" size={size} color={color}/>}}/>
        <Tab.Screen name="Pesquisa" component={Pesquisa} options={{headerTitle: ()=> header,tabBarIcon: ({color, size}) => <AntDesign name="search1" size={size} color="black" />}}/>
        <Tab.Screen name="Play" component={Play} options={{headerTitle: ()=> header, tabBarButton: () => null}}/>
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
    headerImage: {
      width: 150,
      height: 150,
      resizeMode: "contain",
      marginRight: 30
    },
});
