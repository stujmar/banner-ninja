import React, { useState, useEffect } from "react";

type EditableTitleProps = {
  text: string,
  type: string,
  placeholder: string,
  isVisible: boolean,
  children: any,
  childRef: any,
}

const EditableTitle = ({ text, type, placeholder, children, childRef, isVisible}: EditableTitleProps) => {
  const [isEditing, setEditing] = useState(false);

  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus();
    }
  }, [isEditing, childRef]);

  const handleKeyDown = (event: any, type: any) => {
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
    <section className={`opacity-${isVisible ? "100" : "0"} transition-all`}> 
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
          <span className="text-4xl font-nunito font-bold text-gray-700 w-12">
            {text || placeholder || "Editable content"}
          </span>
        </div>
      )}
    </section>
  );
};

export default EditableTitle;