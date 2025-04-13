import { Text, View, StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";

export default function NotFoundScreen() {
  return (
    <>
      {/* <Stack.Screen
        options={{ title: "Oops! Not Found", headerShown: false }}
      /> */}
      <View style={styles.container}>
        <Link href={"/"} style={styles.button} className="" >
          Go back to Home screen!
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  button: {
    // color: "#000",
    textDecorationLine: "underline",
    fontWeight: "bold",
    // textDecorationStyle: "bold",
  },
});
