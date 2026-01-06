import { useState } from "react";
import type { TextInputProps } from "../../types/types";
import { Eye, EyeOff } from "lucide-react";

export const TextInput = ({
  label,
  Icon,
  type = "text",
  placeholder,
  register,
  error,
  id,
  requiredInput = false,
}: TextInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block font-medium text-primaryText mb-4">
        {label}
        {requiredInput && <span className="text-red-500 mr-1">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 right-3 flex items-center">
            <Icon className="text-primaryText" size={20} />
          </div>
        )}
        <input
          id={id}
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          {...register}
          placeholder={placeholder}
          className={`block w-full ${type === "password" ? "pl-8" : "pl-4"} ${Icon ? "pr-10" : "pr-4"
            }  py-4 text-sm border ${error ? "border-red-500" : "border-primaryBorder"} rounded-md placeholder:primaryText focus:outline-none bg-background transition duration-200 flex justify-end`}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && error.message && (
        <p className="text-red-500 text-sm mt-2 text-right">{error.message}</p>
      )}
    </div>
  );
};