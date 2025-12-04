import { User } from "lucide-react";

export const UserProfile = () => {
  return (
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-linear-to-r from-primary to-secondary rounded-full flex items-center justify-center shadow-md">
        <User size={20} className="text-white" />
      </div>
      <div className="">
        <p className="text-sm font-medium text-gray-900">د. أحمد محمد</p>
        <p className="text-xs text-gray-500">طبيب قلب</p>
      </div>
    </div>
  );
};
