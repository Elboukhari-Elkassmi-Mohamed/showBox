import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MovieList from '../components/MovieList';
import MovieDetails from '../components/MovieDetails';


const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function MovieListScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'gray',
        tabBarInactiveTintColor: '#C69749',
        tabBarIndicatorStyle: {backgroundColor: 'gray' },
        tabBarLabelStyle: { fontSize: 10},
        tabBarItemStyle: { width: 100 },
        tabBarStyle: { backgroundColor: '#282A3A' },
      }}>
      <Tab.Screen name="Popular" component={MovieList} initialParams={{ endpoint: 'popular' }}/>
      <Tab.Screen name="Now Playing" component={MovieList} initialParams={{ endpoint: 'now_playing' }} />
      <Tab.Screen name="Upcoming" component={MovieList} initialParams={{ endpoint: 'upcoming' }} />
      <Tab.Screen name="Top Rated" component={MovieList} initialParams={{ endpoint: 'top_rated' }} />
    </Tab.Navigator>
  );
}

export default function MoviesScreens() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="MovieList" component={MovieListScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MovieDetails" component={MovieDetails}  options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
