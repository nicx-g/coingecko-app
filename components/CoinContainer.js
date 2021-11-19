import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  FlatList,
  StyleSheet,
  TextInput,
  StatusBar,
} from "react-native";
import axios from "axios";
import CoinItem from "./CoinItem";

const CoinContainer = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const getData = async () => {
    try {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
      );
      setCryptoData(res.data);
    } catch (error) {
      Alert("Ocurrió un error");
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await getData();
    setIsRefreshing(false);
  };

  const handleChange = (value) => {
    console.log();
    setSearchValue(value);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#141414" />
      <View style={styles.header}>
        <TextInput
          placeholder="Buscá una cripto"
          placeholderTextColor="#666"
          style={styles.searchBar}
          onChangeText={handleChange}
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.coinsContainer}
        data={cryptoData.filter(
          (coin) =>
            coin.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(searchValue.toLowerCase())
        )}
        renderItem={({ item }) => <CoinItem data={item} />}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#141414",
    flex: 1,
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    marginTop: 10,
    fontSize: 20,
    textAlign: "center",
  },
  header: {
    width: "90%",
  },
  coinsContainer: {
    width: "100%",
    paddingHorizontal: 10,
  },
  searchBar: {
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    color: "#fff",
    marginVertical: 5,
    textAlign: "center",
  },
});

export default CoinContainer;
