import { useEffect, useState } from "react";
import { Search } from "lucide-react";

interface DoctorSearchProps {
    onSearchChange: (value: string) => void
}
export const DoctorSearch = ({ onSearchChange }: DoctorSearchProps) => {
    const [searchInputValue, setSearchInputValue] = useState("")
    useEffect(() => {
        const handler = setTimeout(() => {
            onSearchChange(searchInputValue)
        }, 500);

        return () => clearTimeout(handler);
    }, [searchInputValue]);

    return (
        <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center bg-primary/10 rounded-4xl p-4 border-2 border-white m-1">
                <Search className="text-primary" size={20} />
            </div>
            <input
                type="text"
                value={searchInputValue}
                onChange={(e) => setSearchInputValue(e.target.value)}
                placeholder="ابحث عن طبيب بالاسم أو التخصص..."
                className="w-full p-4 text-sm md:text-md lg:text-base rounded-4xl border-2 border-white focus:outline-none focus:ring-2 focus:ring-primary pr-10 pl-16 text-right bg-primary/4"
            />
        </div>
    );
};
