import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import DOMComponent from "./component/DOMComponent";
import Tiptap from "./component/Tiptap";

export default function App() {
  return (
    <View style={styles.container}>
      <DOMComponent name="Chris" />
      <Tiptap />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
    width: "100%",
  },
});
