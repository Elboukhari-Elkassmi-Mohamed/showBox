import {useEffect} from 'react';
import MoviesContainer from './navigator/MoviesContainer';
import ShowsContainer from './navigator/ShowsContainer';
import HomeScreen from './screens/Home'
import WishList from './screens/WishList';
import Favorites from './screens/Favourite'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SplashScreen from 'react-native-splash-screen';
import { store } from './app/store';
import { Provider } from 'react-redux';

const Drawer = createDrawerNavigator();

function App() {

  useEffect(()=>{
    SplashScreen.hide();
  }),[];


  return (


      <NavigationContainer>
            <Provider store={store}>
        <Drawer.Navigator 
        gestureEnabled={true}
        edgeWidth={50}
        minSwipeDistance={50}      
     // useLegacyImplementation
          screenOptions={{
            drawerStyle: {
              backgroundColor: '#282A3A',
            },
            labelStyle: {
              fontWeight: 'bold',
            },
            drawerInactiveTintColor:'#C69749'

          }}>

          <Drawer.Screen name="Home" component={HomeScreen} options={{
            headerStyle: {backgroundColor: '#282A3A',},
            headerTintColor: '#C69749',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="layers-sharp" size={size} color={color} />
            ),
          }} />
          <Drawer.Screen name="Movies" component={MoviesContainer} options={{
            headerStyle: {backgroundColor: '#282A3A',},
            headerTintColor: '#C69749',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="ios-film" size={size} color={color} />
            ),
          }} />
          <Drawer.Screen name="Shows" component={ShowsContainer} options={{
            headerStyle: {backgroundColor: '#282A3A',},
            headerTintColor: '#C69749',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="md-albums" size={size} color={color} />
            ),
          }} />

          <Drawer.Screen name="Favorites" component={Favorites}  options={{
            headerStyle: {backgroundColor: '#282A3A',},
            headerTintColor: '#C69749',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="star-sharp" size={size} color={color} />
            ),
          }}/>
          <Drawer.Screen name="WishList" component={WishList}  options={{
            headerStyle: {backgroundColor: '#282A3A',},
            headerTintColor: '#C69749',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="ios-cart" size={size} color={color} />
            ),
          }} />

        </Drawer.Navigator>
        </Provider>

      </NavigationContainer>
     
       

  );
}


export default App;
