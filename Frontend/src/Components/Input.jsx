import { nanoid } from "nanoid";
import React from "react";
function Input({ label, type = "text", placeholder = "", ...props }, ref) {
  const id = nanoid();
  return (
    <div>
      {label && (
        <>
          <label htmlFor={id}>{label}</label>
          <br />
        </>
      )}
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        {...props}
        ref={ref}
      />
    </div>
  );
}
export default React.forwardRef(Input);
