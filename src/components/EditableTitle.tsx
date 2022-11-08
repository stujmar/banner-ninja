import React, { useState, useEffect } from "react";

type EditableTitleProps = {
  text: string,
  type: string,
  placeholder: string,
  children: any,
  childRef: any,
}

const EditableTitle = ({ text, type, placeholder, children, childRef}: EditableTitleProps) => {
  const [isEditing, setEditing] = useState(false);

  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus();
    }
  }, [isEditing, childRef]);

  const handleKeyDown = (event, type) => {
    const { key } = event;
    const keys = ["Escape", "Tab"];
    const enterKey = "Enter";
    const allKeys = [...keys, enterKey];
    if (
      (type === "textarea" && keys.indexOf(key) > -1) ||
      (type !== "textarea" && allKeys.indexOf(key) > -1)
    ) {
      setEditing(false);
    }
  };

  return (
    <section>
      {isEditing ? (
        <div
          onBlur={() => setEditing(false)}
          onKeyDown={e => handleKeyDown(e, type)}
        >
          {children}
        </div>
      ) : (
        <div
          className={`editable-${type}`}
          onClick={() => setEditing(true)}
        >
          <span className="text-4xl font-bold text-gray-800 w-12">
            {text || placeholder || "Editable content"}
          </span>
        </div>
      )}
    </section>
  );
};

export default EditableTitle;