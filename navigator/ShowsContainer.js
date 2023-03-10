import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ShowsList from '../components/ShowList';


const Tab = createMaterialTopTabNavigator();

export default function ShowScreens() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
       screenOptions={{
    tabBarActiveTintColor: 'gray',
    tabBarInactiveTintColor: '#C69749',
    tabBarIndicatorStyle: {backgroundColor: 'gray' },
    tabBarLabelStyle: { fontSize: 10},
    tabBarItemStyle: { width: 100 },
    tabBarStyle: { backgroundColor: '#282A3A',
      },
  }}>        
        <Tab.Screen name="on_the_air" component={ShowsList} initialParams={{ endpoint: 'on_the_air' }} />
        <Tab.Screen name="Popular" component={ShowsList} initialParams={{ endpoint: 'popular' }} />
        <Tab.Screen name="airing_today" component={ShowsList} initialParams={{ endpoint: 'airing_today' }} />
        <Tab.Screen name="top_rated" component={ShowsList} initialParams={{ endpoint: 'top_rated' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
  
}
