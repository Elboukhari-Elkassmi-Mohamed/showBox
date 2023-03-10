import * as React from 'react';
import MoviesContainer from './navigator/MoviesContainer';
import ShowsContainer from './navigator/ShowsContainer';
import HomeScreen from './screens/Home'
import WishList from './screens/WishList';
import Favorites from './screens/Favourite'

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator

    >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Shows" component={ShowsContainer} options={{
          title: 'Series',
          headerStyle: {backgroundColor: '#282A3A',},
          headerTintColor: '#C69749',
        }} />
        <Drawer.Screen name="Movies" component={MoviesContainer} options={{
          title: 'Movies',
          headerStyle: {backgroundColor: '#282A3A',},
          headerTintColor: '#C69749',
        }} />
        <Drawer.Screen name="Favorites" component={Favorites} />
        <Drawer.Screen name="WishList" component={WishList} />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
