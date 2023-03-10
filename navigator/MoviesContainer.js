import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MovieList from '../components/MovieList';



const Tab = createMaterialTopTabNavigator();

export default function MoviesScreens() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
       screenOptions={{
        tabBarActiveTintColor: 'gray',
        tabBarInactiveTintColor: '#C69749',
        tabBarIndicatorStyle: {backgroundColor: 'gray' },
        tabBarLabelStyle: { fontSize: 10},
        tabBarItemStyle: { width: 100 },
        tabBarStyle: { backgroundColor: '#282A3A' },
  }}>
        <Tab.Screen name="Popular" component={MovieList} initialParams={{ endpoint: 'popular' }} />
        <Tab.Screen name="n_playing" component={MovieList} initialParams={{ endpoint: 'now_playing' }} />
        <Tab.Screen name="Upcoming" component={MovieList} initialParams={{ endpoint: 'upcoming' }} />
        <Tab.Screen name="top_rated" component={MovieList} initialParams={{ endpoint: 'top_rated' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
  
}
