import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";

const PreparingOrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 6000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animatable.Image
        source={require("../../assets/images/mobile.gif")}
        animation="slideInUp"
        iterationCount={1}
        style={styles.image}
      />
      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        style={styles.text}
      >
        Waiting for Restaurant to accept Order!
      </Animatable.Text>

      <Progress.Circle
        style={{ marginTop: 10 }}
        size={60}
        indeterminate={true}
        color="#00ccbb"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 250,
    width: 250,
  },
  text: {
    fontSize: 18,
    color: "#00ccbb",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default PreparingOrderScreen;
