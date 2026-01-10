import type { SelectProps } from "../../types/types";



export const Select = ({
    label,
    register,
    error,
    children,
    id,
    requiredSelect = false,
    disabled = false,
    className = "",
}: SelectProps) => {
    return (
        <div className={`mb-4 ${className}`}>
            <label
                htmlFor={id}
                className="block font-medium text-primaryText mb-2"
            >
                {label}
                {requiredSelect && <span className="text-red-500 mr-1">*</span>}
            </label>
            <div className="relative">
                <select
                    id={id}
                    {...register}
                    disabled={disabled}
                    className={`
            block w-full p-3 pr-10 text-sm border rounded-md
            bg-white focus:outline-none transition duration-200
            appearance-none cursor-pointer
            ${error
                            ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
                            : 'border-primaryBorder focus:ring-primary/20 focus:border-primary'
                        }
            ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-70' : ''}
          `}
                >
                    {children}
                </select>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-500">
                    <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </div>
            </div>
            {error && error.message && (
                <p className="text-red-500 text-sm mt-1 text-right">
                    {error.message}
                </p>
            )}
        </div>
    );
};