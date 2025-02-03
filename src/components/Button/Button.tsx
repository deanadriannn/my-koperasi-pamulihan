import { forwardRef } from "react";
import "./Button.css"
import "../../index.css"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  disabled,
  type = 'button',
  ...props
}, ref) => {
  return (
    <button
      type={type}
      disabled={disabled}
      ref={ref}
      {...props}
      className={`button__style ${props.className}`}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button';

export default Button;