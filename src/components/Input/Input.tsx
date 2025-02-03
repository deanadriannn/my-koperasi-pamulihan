import { forwardRef, useState } from "react";
import "./Input.css";
import "../../index.css"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: JSX.Element;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  type = "text",
  disabled,
  label,
  icon,
  ...props
}, ref) => {
  const [isFocus, setIsFocus] = useState(false)
  const [isEmpty, setIsEmpty] = useState(true)

  return (
    <div className={`input-wrap ${isFocus ? "focus not-empty" : ""} ${isEmpty ? "" : "not-empty"}`}>
      <input 
        type={type}
        disabled={disabled}
        autoComplete="off"
        ref={ref}
        {...props}
        className="contact-input"
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(e) => {
          setIsEmpty(e.target.value === "")
          props.onChange && props.onChange(e)
        }}
      />
      <label>{label}</label>
      {icon && <span className="icon">{icon}</span>}
    </div>
  )
})

Input.displayName = "Input";

export default Input;