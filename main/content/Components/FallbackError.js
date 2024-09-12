import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Button,
  Image,
  StyleSheet,
} from "react-native";

const FallbackError = ({ error, resetError }) => {
  return (
    <SafeAreaView>
      <View style={styles.container} testID="ApiError">
        <Text style={styles.title}>Something went wrong!</Text>
        <Image
          style={styles.image}
          source={require("../../../assets/sad.png")}
        />
        <Text style={styles.error}>{error?.toString()}</Text>

        <Button
          onPress={() => resetError()}
          title="Try Again"
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  title: {
    textAlign: "center",
    fontSize: 40,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  error: {
    textAlign: "center",
  },
  button: {},
});

export default FallbackError;
