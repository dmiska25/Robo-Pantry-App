import React from "react";
import { Button, Pressable, StyleSheet, Text } from "react-native";

export default ({ navigation, location }) => {
  return (
    <>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate(location)}
        testID="AddElementButton"
      >
        <Text style={styles.text}>+</Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "deepskyblue",
    position: "absolute",
    bottom: 19,
    right: 19,
    justifyContent: "center",
    alignContent: "center",
  },
  text: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 40,
    height: "100%",
    width: "100%",
  },
});
