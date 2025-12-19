import type { ButtonProps } from "../../types/types";

export const Button = ({
  type = 'button',
  className = '',
  children,
  onClick,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center justify-center font-semibold rounded-sm text-sm shadow-lg
        cursor-pointer transition duration-200 px-6 py-2
        bg-primary text-white hover:bg-primary/80
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
};
