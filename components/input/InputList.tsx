import * as React from "react";
import { StyleSheet, TextInput } from "react-native";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { Text, View } from "../Themed";

type Props = {
  prefixLabel?: string;
  price: string;
  onChangePrice: (value: string) => void;
  quantity: string;
  onChangeQuantity: (value: string) => void;
};

const InputList: React.FC<Props> = ({
  prefixLabel,
  price,
  onChangePrice,
  quantity,
  onChangeQuantity,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const totalPrice =
    price && quantity ? (Number(price) * Number(quantity)).toString() : "";

  return (
    <View style={styles.inputs}>
      <View style={{ ...styles.inputWrapper, flex: 0.8 }}>
        <Text style={{ ...styles.inputLabel, color: colors.inputLabel }}>
          {prefixLabel}평단
        </Text>
        <TextInput
          style={{
            ...styles.input,
            backgroundColor: colors.inputBackground,
            color: colors.inputText,
          }}
          value={price}
          onChangeText={onChangePrice}
          keyboardType="decimal-pad"
          maxLength={9}
        />
      </View>

      <View style={{ ...styles.inputWrapper, flex: 0.8 }}>
        <Text style={{ ...styles.inputLabel, color: colors.inputLabel }}>
          {prefixLabel}수량
        </Text>
        <TextInput
          style={{
            ...styles.input,
            backgroundColor: colors.inputBackground,
            color: colors.inputText,
          }}
          value={quantity}
          onChangeText={onChangeQuantity}
          keyboardType="decimal-pad"
        />
      </View>

      <View style={styles.inputWrapper}>
        <Text style={{ ...styles.inputLabel, color: colors.inputLabel }}>
          금액 (자동계산)
        </Text>
        <TextInput
          style={{
            ...styles.input,
            backgroundColor: colors.inputBackground,
            color: colors.inputText,
          }}
          editable={false}
          value={Number(totalPrice).toLocaleString()}
        />
      </View>
    </View>
  );
};

export default InputList;

const styles = StyleSheet.create({
  inputs: {
    margin: 4,
    flexDirection: "row",
  },
  inputWrapper: {
    margin: 4,
    flex: 1,
  },
  inputLabel: {
    fontSize: 10,
    lineHeight: 26,
  },
  input: {
    borderRadius: 6,
    height: 40,
    fontSize: 14,
    paddingLeft: 8,
    paddingRight: 8,
  },
});
