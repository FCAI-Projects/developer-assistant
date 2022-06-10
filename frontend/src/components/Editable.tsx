import React, { useRef } from "react";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";

interface EditableProps {
  value: string | undefined | null;
  onChange: (value: string) => void;
  tag?: string; // wrapper tag
}

export const Editable: React.FC<EditableProps> = ({ value, onChange, tag }) => {
  const text = useRef<any>(value);

  const sanitizeConf = {
    allowedTags: [],
  };

  const handleChange = (evt: any) => {
    text.current = sanitizeHtml(evt.target.value, sanitizeConf);
  };

  const handleBlur = () => {
    onChange(text.current);
  };

  return (
    <ContentEditable
      html={text.current} // innerHTML of the editable div
      disabled={false} // use true to disable editing
      onChange={handleChange} // handle innerHTML change
      onBlur={handleBlur} // handle innerHTML change
      tagName={tag} // Use a custom HTML tag (uses a div by default)
    />
  );
};
