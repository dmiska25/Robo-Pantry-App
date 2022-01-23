import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import Easing from "react-native/Libraries/Animated/Easing";

export default AnimatedArrow = ({ down }) => {
  const arrowValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(arrowValue, {
      toValue: down ? 1 : 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [down]);

  const rotate = arrowValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  const animatedStyle = {
    transform: [
      {
        rotate: rotate,
      },
    ],
  };

  return (
    <Animated.Text style={[animatedStyle, styles.detailsHeaderArrow]}>
      ▶
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  detailsHeaderArrow: {
    width: 12,
  },
});
