import type { AppFormProps } from "../../types/types";

const AppForm = ({ title, children }: AppFormProps) => {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="max-w-md w-full">

                {title && <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-primaryText mb-3">
                        {title}
                    </h1>
                </div>}

                <div className="bg-white rounded-2xl shadow-lg p-8 border border-primaryBorder">
                    {children}
                </div>

            </div>
        </div>
    );
};

export default AppForm;
