import * as React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScaleTradingHistory from "../components/history/ScaleTradingHistory";
import InputList from "../components/input/InputList";

import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { IScaleTradingHistory } from "../types/calculator.types";
import * as Analytics from "expo-firebase-analytics";

export default function TabOneScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const [price, setPrice] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const totalPrice =
    price && quantity ? (Number(price) * Number(quantity)).toString() : "";

  const [addPrice, setAddPrice] = React.useState("");
  const [addQuantity, setAddQuantity] = React.useState("");
  const addTotalPrice =
    addPrice && addQuantity
      ? (Number(addPrice) * Number(addQuantity)).toString()
      : "";

  const finishAvgPrice =
    (Number(totalPrice) + Number(addTotalPrice)) /
    (Number(quantity) + Number(addQuantity));

  const [histories, setHistories] = React.useState<IScaleTradingHistory[]>([]);

  const handlePressAdditionalScaleTrading = async () => {
    await Analytics.logEvent("ButtonTapped", {
      name: "additionalButton",
      screen: "HomeScreen",
      purpose: "additional scale trading",
    });

    if (
      !price ||
      !totalPrice ||
      !quantity ||
      !addQuantity ||
      isNaN(Number(price)) ||
      isNaN(Number(totalPrice)) ||
      isNaN(Number(quantity)) ||
      isNaN(Number(addQuantity))
    ) {
      return;
    }

    const copy = histories.slice();

    const history = {
      price: Number(finishAvgPrice.toFixed(0)),
      quantity: Number(quantity) + Number(addQuantity),
      total: Number(totalPrice) + Number(addTotalPrice),
    };
    copy.push(history);

    setPrice(history.price.toString());
    setQuantity(history.quantity.toString());
    setAddPrice("");
    setAddQuantity("");

    setHistories(copy);
  };

  const handlePressResetButton = async () => {
    await Analytics.logEvent("ButtonTapped", {
      name: "resetButton",
      screen: "HomeScreen",
      purpose: "reset",
    });

    setPrice("");
    setQuantity("");
    setAddPrice("");
    setAddQuantity("");
    setHistories([]);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top"]} />
      <View style={styles.header}>
        <Text style={styles.avgLabel}>최종 평단</Text>
        <Text style={{ ...styles.avg, color: colors.displayAveragePriceText }}>
          {totalPrice && addTotalPrice
            ? Number(finishAvgPrice.toFixed(0)).toLocaleString()
            : 0}
        </Text>
      </View>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.scrollContainer}>
              <InputList
                prefixLabel="보유"
                price={price}
                onChangePrice={setPrice}
                quantity={quantity}
                onChangeQuantity={setQuantity}
              />

              <InputList
                price={addPrice}
                onChangePrice={setAddPrice}
                quantity={addQuantity}
                onChangeQuantity={setAddQuantity}
              />

              <View style={styles.buttonListWrapper}>
                <TouchableOpacity
                  hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
                  onPress={handlePressAdditionalScaleTrading}
                >
                  <View style={{ marginRight: 16 }}>
                    <Text
                      style={{ ...styles.buttonText, color: colors.buttonText }}
                    >
                      추가물타기
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
                  onPress={handlePressResetButton}
                >
                  <View>
                    <Text
                      style={{ ...styles.buttonText, color: colors.buttonText }}
                    >
                      초기화
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <View style={{ ...styles.historyWrapper, borderColor: colors.border }}>
          <ScaleTradingHistory histories={histories} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "flex-end",
    padding: 20,
  },
  avgLabel: {
    fontSize: 12,
  },
  avg: {
    fontSize: 44,
    marginTop: 4,
    fontFamily: undefined,
  },
  scrollContainer: {
    flex: 1,
  },
  buttonListWrapper: {
    justifyContent: "flex-end",
    flex: 1,
    flexDirection: "row",
    marginTop: 8,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonText: {
    fontSize: 13,
    color: "#333",
  },
  historyWrapper: {
    marginTop: 10,
    borderTopWidth: 8,
  },
});
