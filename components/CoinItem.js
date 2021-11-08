import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const coinItem = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.coinGroup}>
        <Image style={styles.image} source={{ uri: data.image }} />
        <View style={styles.coinNames}>
          <Text style={styles.title}>{data.name}</Text>
          <Text style={styles.subtitle}>{data.symbol}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.price}>{data.current_price}USD</Text>
        <Text
          style={
            data.price_change_percentage_24h > 0
              ? styles.positiveText
              : styles.negativeText
          }
        >
          % {data.price_change_percentage_24h}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: "#121212",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  coinGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  coinNames: { marginHorizontal: 15 },
  title: {
    color: "#fff",
    fontSize: 16,
  },
  price: {
    color: "#fff",
    fontSize: 16,
    textAlign: "right",
  },
  subtitle: {
    color: "#fff",
    fontSize: 13,
    textTransform: "uppercase",
  },
  negativeText: {
    color: "#ff6d6d",
    textAlign: "right",
  },
  positiveText: {
    color: "#84ff6e",
    textAlign: "right",
  },
  image: {
    width: 30,
    height: 30,
  },
});

export default coinItem;
