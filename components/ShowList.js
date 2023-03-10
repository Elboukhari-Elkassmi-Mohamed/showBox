import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList ,ActivityIndicator} from 'react-native';
import axios from 'axios';
import {kEY, URL} from "@env"


const BASE_URL = URL
const API_KEY = kEY

const SerieList = ({route}) => {
  const { endpoint } = route.params;
  const [series, setSeries] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSeries();
  }, []);

  const fetchSeries = () => {
    setLoading(true);
    axios.get(`${BASE_URL}/tv/${endpoint}?api_key=${API_KEY}&language=en-US&page=${page}`)
      .then(response => {
        const newSeries = response.data.results;
        setSeries([...series, ...newSeries]);
        setPage(page + 1);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const renderItem = ({ item }) => (
    <View style={styles.movieContainer} key={item.id}>
      <Image
        style={styles.movieImage}
        source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
      />
      <Text numberOfLines={1} ellipsizeMode='tail' style={styles.movieTitle}>{item.title}</Text>
      <Text style={styles.movieRating}>{item.vote_average}</Text>
    </View>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loading}>
        <ActivityIndicator size='large' />
      </View>
    );
  };

  const handleLoadMore = () => {
    if (loading) return;
    fetchSeries();
  };

  return (
    <FlatList
      data={series}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      numColumns={3}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#181823',
    alignItems: 'center',


  },
  movieContainer: {
    marginVertical: 5,
    width: '30%',
    justifyContent:'space-around',
    marginHorizontal: '1.6%',


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
  movieRating:{
    width: '20%',
    position: 'absolute',
    textAlign: 'center',
    color:'#C69749',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius:20,
    fontSize: 9,
    marginTop: 1
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10
  }
});

export default SerieList;