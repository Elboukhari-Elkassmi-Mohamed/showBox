import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import {kEY, URL} from "@env"


const BASE_URL = URL
const API_KEY = kEY

const MovieList = ({route}) => {
  const { endpoint } = route.params;
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = () => {
    axios.get(`${BASE_URL}/movie/${endpoint}?api_key=${API_KEY}&language=en-US&page=${currentPage}`)
      .then(response => {

        const newMovies = response.data.results;
        // console.log(endpoint);
        // console.log(newMovies);

        setMovies([...movies, ...newMovies]);
        setCurrentPage(currentPage + 1);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 10;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      fetchMovies();
    }
  };

  return (
    <ScrollView onScroll={handleScroll}>
      <View style={styles.container}>
        {movies.reduce((acc, movie, i) => {
          if (i % 3 === 0) acc.push([]);
          acc[acc.length - 1].push(movie);
          return acc;
        }, []).map((row, i) => (
          <View key={i} style={styles.row}>
            {row.map(movie => (
              <View style={styles.movieContainer} key={movie.id}>
                <Image
                  style={styles.movieImage}
                  source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
                />
                <Text numberOfLines={1} ellipsizeMode='tail'style={styles.movieTitle}>{movie.title}</Text>
                <Text style={styles.movierating}>{movie.vote_average}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    alignItems: 'center'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10
  },
  movieContainer: {
    marginVertical: 10,
    width: '30%'
  },
  movieImage: {
    width: '100%',
    height: 225,
    borderRadius: 10
  },
  movieTitle: {
    marginTop: 4,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'gray'
  },
  movierating:{
    position: 'absolute',
    textAlign: 'center',
    color:'#C69749',
    backgroundColor:'black',
    borderBottomRightRadius:20,
    paddingRight:7,
    fontSize: 10,

  }
});

export default MovieList;
