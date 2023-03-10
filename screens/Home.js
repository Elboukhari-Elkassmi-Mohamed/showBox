import { View, Text,Button } from 'react-native'
import React from 'react'

const Home = ({ navigation }) => {

  return (
    <View>
      <Text> <Button
        title="Go to Movies"
        onPress={() => navigation.navigate('Movies')}
      /></Text>
      
      <Text> <Button
        title="Go to Series"
        onPress={() => navigation.navigate('Shows')}
      /></Text>
    </View>
  )
}

export default Home