import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useState } from "react";
import axios from "axios";

/* 

https://pokeapi.co/
https://pokeapi.co/api/v2/pokemon/ditto
https://medium.com/@devnexPro/mastering-api-calls-in-react-native-a-comprehensive-guide-with-fetch-and-axios-1d7553a58194

*/

export default function App() {
  /*

    The following code shows examples of using standard fetch vs axios methods. 
    Axios is a popular third-party library for making HTTP requests in JavaScript. 
    It provides a more feature-rich and developer-friendly API compared to fetch, with built-in support for
    interceptors, request cancellation, and global configuration. Additionally, Axios automatically 
    parses JSON responses and handles errors more gracefully.

    Simplicity and Convenience: 
    Axios provides a simpler and more convenient API compared to fetch. 
    It automatically handles common tasks like transforming request and response data, setting headers, and handling errors.

    Global Configuration:
    Axios allows you to set up default configurations globally for all requests, such as default headers or base URLs.
    This can save time and reduce repetition in your code.

    Interceptors:
    Axios provides interceptors, which allow you to intercept requests or responses before they are handled by then or catch. 
    This can be useful for tasks like adding authentication tokens to requests or logging responses.

    Request Cancellation:
    Axios supports request cancellation, allowing you to cancel requests that are no longer needed.
    This can help improve performance and prevent unnecessary network traffic.

    Browser Compatibility:
    While fetch is supported in most modern browsers, Axios provides consistent behavior and additional
    features across different browsers, making it a more reliable choice for cross-browser compatibility.

  */

  // GET METHODS

  // Standard Fetch GET Method
  function standardFetch() {
    fetch("https://pokeapi.co/api/v2/pokemon/ditto")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.name);
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  }

  // Axios GET Method
  function axiosFetch() {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/ditto")
      .then((response) => {
        console.log(response.data.name + "axios");
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  }


  // POST METHODS

  // Standard Fetch POST Method
  function standardFetchPost(data) {
    fetch("https://example.com/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Response from standard fetch:", responseData);
      })
      .catch((error) => {
        console.error("Error from standard fetch:", error);
      });
  }

  // Axios POST Method
  function axiosPost(data) {
    axios
      .post("https://example.com/api/post", data)
      .then((response) => {
        console.log("Response from Axios:", response.data);
      })
      .catch((error) => {
        console.error("Error from Axios:", error);
      });
  }

  // ########## POKEMON CODE ##########
  const [pokemons, setPokemons] = useState([]);
  const [pokemon, setPokemon] = useState({});

  function fetchPokemons() {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/?limit=151`)
      .then((response) => {
      setPokemons(response.data.results);
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  }

  function fetchPokemon(id) {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => {
        setPokemon(response.data);
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  }

  ///console.log("STANDARD FETCH:");
  //standardFetch();

  //console.log("AXIOS FETCH");
  //axiosFetch();

  //fetchPokemon(1);
  fetchPokemons();

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Pokemon List</Text>
      <FlatList
        style={styles.list}
        data={pokemons}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        )}
      ></FlatList>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50, 
  },
  h1: {
    fontSize: 20,
  
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20, 
    textAlign: 'center', 
  },
  list: {
    paddingHorizontal: 20, 
  },
  listItem: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    marginVertical: 8,
    borderRadius: 10, 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4, 
    alignSelf: 'center',
    width: '80%', 

    
    alignItems: 'center', 
  },
  itemText: {
    fontSize: 18,
    textAlign: 'center', 
  },
});
