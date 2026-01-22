import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet } from "react-native";
import DOMComponent from "./component/DOMComponent";
import Tiptap from "./component/Tiptap";
import RichTextViewer from "./component/TipTapCeterus/RichTextViewer";
import RichTextEditor from "./component/TipTapCeterus/RichTextEditor";
import { useState } from "react";

const content = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Please upload a Trial Balance report for [MMM YYYY].",
          marks: [{ type: "bold" }],
        },
        {
          type: "text",
          text: " This file includes a listing of all assets, liabilities, equity, revenue, and expense accounts which we will use to establish the beginning balances. ",
        },
        { type: "hardBreak" },
        { type: "hardBreak" },
        {
          type: "text",
          text: "If you do not have this report readily available, please ask your previous bookkeeper to provide.",
          marks: [{ type: "italic" }],
        },
      ],
    },
  ],
};

export default function App() {
  const [richText, setRichText] = useState();

  const handleUpdate = (editorContent) => {
    setRichText(editorContent.rich);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="auto" />
      <DOMComponent name="Chris" />
      <Tiptap content={content} />
      <RichTextViewer content={richText} maxHeight={400} />
      <RichTextEditor
        content={content}
        maxHeight={500}
        onUpdate={handleUpdate}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
    margin: 20,
  },
});
