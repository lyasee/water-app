import * as React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

const { width: deviceWidth } = Dimensions.get("screen");

type Props = {
  onLayout?: () => void;
};

const SplashScreen: React.FC<Props> = ({ onLayout }) => {
  return (
    <View style={styles.container} onLayout={onLayout}>
      <LottieView
        autoPlay
        style={{
          width: deviceWidth - 200,
        }}
        source={require("../assets/lotties/rock.json")}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
