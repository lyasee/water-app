import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";

const Footer = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  return (
    <View>
      <Text style={{ ...styles.text }}>© 2021 물타기. All rights reserved</Text>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    color: "#555",
    fontFamily: "esamanru-light",
  },
});
