"use dom";

import { useEditor, EditorContent } from "@tiptap/react";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import { generateHTML } from "@tiptap/react";

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

const Tiptap = () => {
  const html = generateHTML(content, [StarterKit]);
  console.log(html);

  const editor = useEditor({
    extensions: [StarterKit], // define your extension array
    content: html, // initial content
  });

  return (
    <>
      <EditorContent editor={editor} />
      <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
    </>
  );
};

export default Tiptap;
