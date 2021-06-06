import * as React from "react";
import { Image, Linking, StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";
import { Dimensions } from "react-native";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import Footer from "../components/basic/Footer";
import { SafeAreaView } from "react-native-safe-area-context";
import * as MailComposer from "expo-mail-composer";
import * as Analytics from "expo-firebase-analytics";

const { width } = Dimensions.get("screen");

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const handlePressContactUs = async () => {
    await Analytics.logEvent("ContactUsTapped", {
      name: "contact",
      screen: "InformationScreen",
      purpose: "Contract Us open email",
    });

    MailComposer.composeAsync({
      recipients: ["notice.rokgg@gmail.com"],
    });
  };

  const handlePressKimpDownload = async () => {
    await Analytics.logEvent("DownloadTapped", {
      name: "download",
      screen: "InformationScreen",
      purpose: "Kimp app download",
    });

    Linking.openURL("https://kimpapp.page.link/default");
  };

  return (
    <View style={styles.block}>
      <SafeAreaView edges={["top"]} style={{ backgroundColor: "#282828" }} />
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.8} onPress={handlePressKimpDownload}>
          <View style={{ ...styles.wrapper, borderColor: colors.border }}>
            <Image
              source={require("../assets/images/kimp-og-image.png")}
              style={styles.appImage}
            />
            <View style={styles.appInformation}>
              <View>
                <Text style={{ ...styles.title, color: colors.appNameText }}>
                  김프 - 김치프리미엄
                </Text>
                <Text
                  style={{ ...styles.description, color: colors.description }}
                >
                  실시간으로 확인하는 김프
                </Text>
              </View>
              <View
                style={{
                  ...styles.downloadWrapper,
                  backgroundColor: colors.appDownloadButtonBackground,
                }}
              >
                <Text
                  style={{
                    ...styles.downloadText,
                    color: colors.appDownloadButtonText,
                  }}
                >
                  앱 다운로드
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={handlePressContactUs}>
          <View style={styles.footerWrapper}>
            <Text style={styles.contactUs}>Contact Us</Text>
            <Footer />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  container: {
    justifyContent: "space-between",
    flex: 1,
  },
  wrapper: {
    borderBottomWidth: 1,
  },
  appImage: {
    width,
    height: 180,
  },
  appInformation: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    marginTop: 6,
    fontSize: 12,
  },
  downloadWrapper: {
    borderRadius: 8,
    padding: 8,
  },
  downloadText: {
    fontSize: 13,
  },
  footerWrapper: {
    padding: 20,
  },
  contactUs: {
    color: "#555",
    marginBottom: 12,
  },
});
