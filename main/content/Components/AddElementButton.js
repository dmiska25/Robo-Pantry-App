import { Link } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";

export default ({ location, context }) => {
  return (
    <>
      <Link
        style={styles.button}
        to={{ screen: location, params: context }}
        testID="AddElementButton"
      >
        +
      </Link>
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
    textAlign: "center",
    justifyContent: "center",
    fontSize: 40,
  },
});
