"use dom";

import { useEffect, useState } from "react";
import { Button, Input, Modal } from "antd";
import {
  BoldOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  ItalicOutlined,
  LinkOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import PlaceholderExtension from "@tiptap/extension-placeholder";
import styles from "./styles.module.scss";

const linkInputId = "linkInput";

const RichTextEditor = ({
  onUpdate,
  readOnly,
  content,
  disabled,
  placeholder,
  maxHeight,
  style,
}) => {
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [link, setLink] = useState("");
  const [preview, setPreview] = useState(false);

  const openLinkModal = () => {
    setLink("");
    setShowLinkModal(true);
    document.getElementById(linkInputId)?.focus();
  };

  const LinkWithKeyboardShortcuts = LinkExtension.extend({
    addKeyboardShortcuts() {
      return {
        // eslint-disable-next-line react/no-this-in-sfc
        "Mod-k": () =>
          this.editor.isActive("link")
            ? this.editor.commands.unsetLink()
            : openLinkModal(),
      };
    },
  });

  const editor = useEditor({
    editable: !readOnly,
    extensions: [
      StarterKit,
      LinkWithKeyboardShortcuts.configure({
        openOnClick: false,
      }),
      PlaceholderExtension.configure({
        placeholder,
      }),
    ],
    content: content ?? undefined,
    onUpdate: onUpdate
      ? ({ editor: newEditor }) =>
          onUpdate({ plain: newEditor.getText(), rich: newEditor.getJSON() })
      : undefined,
  });

  useEffect(() => {
    const editable = !readOnly && !preview && !disabled;
    editor.commands.setContent(content);
    editor.setEditable(editable);
  }, [JSON.stringify(content), readOnly, preview, disabled]);

  const disabledStyle = {
    backgroundColor: "lightgray",
    borderColor: "grey",
  };

  const colorOnActive = (styleToCheck) => {
    const color = editor.isActive(styleToCheck) ? "lightblue" : undefined;
    return {
      borderColor: color,
      color,
    };
  };

  const addLink = () => {
    editor.commands.setLink({ href: link, target: "_blank" });
    setShowLinkModal(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {!readOnly && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: 5 }}>
            <Modal
              closable={false}
              centered
              open={showLinkModal}
              title="Add Link"
              onCancel={() => setShowLinkModal(false)}
              onOk={addLink}
            >
              <div>
                Enter the full URL, including <code>https://</code>.
              </div>
              <Input
                id={linkInputId}
                placeholder="https://ceterus.com"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                onPressEnter={addLink}
              />
            </Modal>

            <Button
              disabled={preview}
              icon={<BoldOutlined />}
              onClick={() => editor.chain().focus().toggleBold().run()}
              style={colorOnActive("bold")}
            />

            <Button
              disabled={preview}
              icon={<ItalicOutlined />}
              onClick={() => editor.chain().focus().toggleItalic().run()}
              style={colorOnActive("italic")}
            />

            <Button
              disabled={preview}
              icon={<LinkOutlined />}
              onClick={() =>
                editor.isActive("link")
                  ? editor.commands.unsetLink()
                  : openLinkModal()
              }
              style={colorOnActive("link")}
            />

            <Button
              disabled={preview}
              icon={<UnorderedListOutlined />}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              style={colorOnActive("bulletList")}
            />
          </div>

          <Button
            type="link"
            checked={preview}
            onClick={() => setPreview(!preview)}
            icon={preview ? <EyeInvisibleOutlined /> : <EyeOutlined />}
          >
            Preview Links
          </Button>
        </div>
      )}

      <EditorContent
        editor={editor}
        style={
          !readOnly && !preview
            ? {
                borderRadius: 6,
                borderColor: "#D9D9D9",
                borderStyle: "solid",
                borderWidth: 1,
                maxHeight,
                overflow: "auto",
                ...style,
                ...(disabled ? disabledStyle : {}),
              }
            : {
                maxHeight,
                overflow: "auto",
                ...style,
              }
        }
        className={`${styles.editor} ${readOnly || preview ? styles.readOnly : ""}`}
      />
    </div>
  );
};

export default RichTextEditor;
