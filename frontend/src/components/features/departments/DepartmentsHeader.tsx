import type { DepartmentsHeaderProps } from "../../../types/types";
import { DoctorSearch } from "../../ui/DoctorSearch";



const DepartmentsHeader = ({
    title,
    subtitle,
    searchPlaceholder,
    onSearchChange
}: DepartmentsHeaderProps) => {
    return (
        <>
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-primary mb-4">{title}</h1>
                <p className="text-lg text-gray-600">{subtitle}</p>
            </div>

            <div className="mb-10">
                <div className="max-w-3xl mx-auto">
                    <DoctorSearch
                        placeholder={searchPlaceholder}
                        onSearchChange={onSearchChange}
                    />
                </div>
            </div>
        </>
    );
};

export default DepartmentsHeader;