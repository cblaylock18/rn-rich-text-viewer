import RichTextEditor from "../RichTextEditor";

const RichTextViewer = ({ content, maxHeight }) => (
  <RichTextEditor readOnly content={content} maxHeight={maxHeight} />
);

export default RichTextViewer;
