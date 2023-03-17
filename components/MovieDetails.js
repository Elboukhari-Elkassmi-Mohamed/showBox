import { View, Text,  StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect ,useCallback} from 'react';
import axios from 'axios';
import { kEY, URL } from "@env"
import Icon from 'react-native-vector-icons/FontAwesome';
import YoutubePlayer from "react-native-youtube-iframe";
import FastImage from 'react-native-fast-image';



const BASE_URL = URL
const API_KEY = kEY

const MovieDetails = ({ route }) => {
  const { itemId } = route.params;
  const [movie, setMovie] = useState([]);
  const [actors, setActors] = useState([]);
  const [trailler, setTrailler] = useState([]);


  const gettrailler = useCallback(() => {
    fetch(`https://api.themoviedb.org/3/movie/${itemId}/videos?api_key=${API_KEY}`)
      .then(response => response.json())
      .then(res => {
        const trailler = res.results.find(video => video.type === 'Trailer');
        setTrailler(trailler.key)
      })
      .catch(error => {
        console.log(error);
      });
  }, [itemId]);

  const getactors = useCallback(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${itemId}/credits?api_key=${API_KEY}`)
      .then(res => {
        setActors(res.data.cast)
      }).catch(err => {
        console.log(err);
      })
  }, [itemId]);

  useEffect(() => {
    axios.get(`${BASE_URL}/movie/${itemId}?api_key=${API_KEY}&language=en-US`)
      .then(response => {
  
        const MoviesDetails = response.data;
        // console.log(MoviesDetails);

        setMovie(MoviesDetails);
      })
      .catch(error => {
        console.error(error);
      });

    getactors();
    gettrailler();
  }, []);

  return (
    <ScrollView>

    <View style={styles.container}>
      <FastImage
        style={styles.movieImage}
        source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}` }}
      />
      <Text style={styles.imgDetails}><Icon name="calendar" size={16} color="#C69749" /> {movie.release_date}        <Icon name="clock-o" size={16} color="#C69749" />
        {movie.runtime} Min             <Icon name="star" size={16} color="#C69749" /> {movie.vote_average?.toString().slice(0, 3)} TMDB</Text>

      <View style={styles.movieDetails}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
        <Text style={{ color: 'gold', textAlign: 'center', marginTop: 5, marginBottom: 4 }} > Trailer</Text>
        <YoutubePlayer
          height={220}
          videoId={trailler}
        />
        <Text style={{ color: 'gold', textAlign: 'center',    marginTop: 20 }} >Cast</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
          {actors && actors.map((actor, index) => {
            return (
              <View style={{ alignItems: 'center', marginRight: 10 }}>
                <FastImage
                  style={styles.actorsImg}
                  source={{ uri: `https://image.tmdb.org/t/p/w500/${actor.profile_path}` }}
                />
                <Text style={{ marginTop: 5, textAlign: 'center', color: 'white', fontSize: 9 }} key={index}>{actor.name}</Text>
              </View>

            )
          })}

        </ScrollView>
      </View>

    </View>
        </ScrollView>

  )
}

export default MovieDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282A3A',
  },
  movieImage: {
    width: '100%',
    height: 220,
    opacity: 0.4,

  },
  movieDetails: {
    padding: 6,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#C69749',
    textAlign: 'center'

  },
  imgDetails: {
    marginTop: 10,
    width: '100%',
    position: 'absolute',
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    fontSize: 15,
  },
  overview: {
    textAlign: 'center',
    color: 'white',
    fontSize: 10,
    // fontWeight: 'bold',
    lineHeight: 20,
  },
  actorsImg: {
    marginTop: 20,
    width: 80,
    height: 89,
    borderRadius: 50
  }
});
