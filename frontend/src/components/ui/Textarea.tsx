import type { TextareaProps } from "../../types/types";
import { useTranslation } from "react-i18next";

export const Textarea = ({
  id,
  register,
  error,
  label,
  placeholder,
  requiredInput = false,
  className = "",
  rows = 5,
}: TextareaProps) => {
  const { i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";

  return (
    <div className={`mb-6 ${className}`} dir={isRtl ? "rtl" : "ltr"}>
      {label && (
        <label htmlFor={id} className="block text-base! font-medium! text-primaryText mb-4 text-start">
          {label}
          {requiredInput && <span className="text-red-500 mx-1">*</span>}
        </label>
      )}
      <div className="relative">
        <textarea
          id={id}
          {...register}
          rows={rows}
          placeholder={placeholder}
          className={`block w-full px-4 py-4 text-sm border 
            ${error ? "border-red-500" : "border-primaryBorder"} 
            rounded-md focus:outline-none bg-background transition duration-200 
            text-start resize-none`}
        />
      </div>
      {error?.message && (
        <p className="text-red-500 text-sm mt-2 text-start">
          {error.message}
        </p>
      )}
    </div>
  );
};