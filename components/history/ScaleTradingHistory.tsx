import * as React from "react";
import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { IScaleTradingHistory } from "../../types/calculator.types";
import { Text, View } from "../Themed";

type Props = {
  histories: IScaleTradingHistory[];
};

const ScaleTradingHistory: React.FC<Props> = ({ histories }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  return (
    <View>
      <View style={{ ...styles.header, borderBottomColor: colors.border }}>
        <Text style={styles.indexHeader}>#</Text>
        <Text style={styles.priceHeader}>평단</Text>
        <Text style={styles.priceHeader}>수량</Text>
        <Text style={styles.totalPriceHeader}>총 금액</Text>
      </View>
      {histories.map((v, index) => (
        <View key={`history-${index}`} style={styles.item}>
          <Text style={styles.itemIndex}>{index + 1}</Text>
          <Text style={styles.itemPrice}>{v.price.toLocaleString()}</Text>
          <Text style={styles.itemPrice}>{v.quantity.toLocaleString()}</Text>
          <Text style={styles.itemTotalPrice}>{v.total.toLocaleString()}</Text>
        </View>
      ))}
    </View>
  );
};

export default ScaleTradingHistory;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  indexHeader: {
    flex: 0.3,
    textAlign: "center",
    fontSize: 12,
  },
  priceHeader: {
    flex: 0.7,
    fontSize: 12,
  },
  totalPriceHeader: {
    flex: 1,
    fontSize: 12,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 6,
    paddingBottom: 6,
  },
  itemIndex: {
    flex: 0.3,
    textAlign: "center",
    fontSize: 12,
  },
  itemPrice: {
    flex: 0.7,
    fontFamily: undefined,
  },
  itemTotalPrice: {
    flex: 1,
    fontFamily: undefined,
  },
});
