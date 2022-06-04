import React, { useRef } from "react";
import ContentEditable from "react-contenteditable";

interface EditableProps {
  value: string;
  onChange: (value: string) => void;
}

export const Editable: React.FC<EditableProps> = ({ value, onChange }) => {
  const text = useRef<any>(value);

  const handleChange = (evt: any) => {
    text.current = evt.target.value;
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
      tagName="" // Use a custom HTML tag (uses a div by default)
    />
  );
};
