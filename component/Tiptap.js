"use dom";

import { useEditor, EditorContent } from "@tiptap/react";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import { generateHTML } from "@tiptap/react";

const Tiptap = ({ content }) => {
  // const html = generateHTML(content, [StarterKit]);
  // console.log(html);

  const editor = useEditor({
    extensions: [StarterKit], // define your extension array
    content: content, // initial content
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
