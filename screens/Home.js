import { View, Text,Button ,ScrollView, StyleSheet,TouchableOpacity} from 'react-native'
import React ,{useEffect} from 'react'
import {getTrending}from "../features/trending/trendingSlice"
import {useDispatch, useSelector} from "react-redux"
import FastImage from 'react-native-fast-image';



const Home = ({ navigation }) => {

const {Alltrending}= useSelector(state=>state.trending)
const dispatch = useDispatch()


useEffect(()=>{
  dispatch(getTrending())
},[])


  return (
    <View style={styles.container}>
          <View style={styles.buttonContainer}>

      <Text> <Button
        title="Go to Movies"
        onPress={() => navigation.navigate('Movies')}
      /></Text>
      
      <Text> <Button
        title="Go to Series"
        onPress={() => navigation.navigate('Shows')}
      /> </Text>
          </View>


<Text style={{textAlign:"center",fontSize: 20,fontStyle:'italic',color:'#C69749'}}> Trending Movies</Text>
   <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
          {Alltrending && Alltrending.map((item, index) => {
            return (
              <View style={{ alignItems: 'center', marginRight: 7 ,width: '10%',
              height: '50%',}}>
              
                <FastImage
                  style={styles.movieImage}
                  source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`}}     
                />
                <Text style={{ marginTop: 5, textAlign: 'center', color: 'white', fontSize: 5 }} key={index}>{item.title}</Text>

              </View>

            )
          })}
        </ScrollView>
    </View>

  

    
  )
}

export default Home


const styles= StyleSheet.create({
  container:{
    flex :1,
   backgroundColor:'#282A3A'
  },
  buttonContainer: {
    flexDirection: 'row', // Set flexDirection to row to make the buttons horizontal
    justifyContent: 'space-evenly', // Align the buttons with equal space between them
    marginVertical: 10, // Add some margin to separate the buttons from the flat list

  },
  movieImage: {
    width: '100%',
    height: '60%',
    borderRadius: 10
  },
})