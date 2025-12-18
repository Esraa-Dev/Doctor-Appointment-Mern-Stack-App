import {
  Calendar,
  Edit,
  Mail,
  Phone,
  Shield,
  User,
  MapPin,
  Heart,
} from "lucide-react";
import { Button } from "../../ui/Button";
import InfoItem from "./InfoItem";
import { formatDate } from "../../../utils/formatDate";
import type { PatientPersonalInfoProps } from "../../../types/types";

export const PatientPersonalInfo = ({ userData }: PatientPersonalInfoProps) => {
  if (!userData) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">لا توجد بيانات</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primaryText">
          المعلومات الشخصية
        </h2>
        <Button>
          <Edit className="w-4 h-4 ml-2" />
          تعديل
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-primaryBorder p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoItem
            icon={User}
            label={"الاسم الكامل"}
            value={
              `${userData.firstName} ${userData.lastName}`.trim() || "غير محدد"
            }
          />

          <InfoItem
            icon={Mail}
            label={"البريد الإلكتروني"}
            value={userData.email || "غير محدد"}
          />

          <InfoItem
            icon={Phone}
            label={"رقم الهاتف"}
            value={userData.phone || "غير محدد"}
          />

          <InfoItem
            icon={Calendar}
            label={"تاريخ الميلاد"}
            value={formatDate(userData.dateOfBirth)}
          />

          <InfoItem
            icon={User}
            label={"الجنس"}
            value={userData.gender || "غير محدد"}
          />

          <InfoItem
            icon={Shield}
            label={"فصيلة الدم"}
            value={userData.bloodGroup || "غير محدد"}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-primaryBorder p-6">
        <h3 className="text-xl font-bold text-primaryText mb-6">العنوان</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoItem
            icon={MapPin}
            label={"العنوان الرئيسي"}
            value={userData.address.address1 || "غير محدد"}
          />

          <InfoItem
            icon={MapPin}
            label={"العنوان الثانوي"}
            value={userData.address.address2 || "غير محدد"}
          />

          <InfoItem
            icon={MapPin}
            label={"المدينة"}
            value={userData.address.city || "غير محدد"}
          />

          <InfoItem
            icon={MapPin}
            label={"الولاية"}
            value={userData.address.state || "غير محدد"}
          />

          <InfoItem
            icon={MapPin}
            label={"البلد"}
            value={userData.address.country || "غير محدد"}
          />

          <InfoItem
            icon={MapPin}
            label={"الرمز البريدي"}
            value={userData.address.pincode || "غير محدد"}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-primaryBorder p-6">
        <h3 className="text-xl font-bold text-primaryText mb-6">
          جهة الاتصال في حالة الطوارئ
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoItem
            icon={User}
            label={"الاسم"}
            value={userData.emergencyContact?.name || "غير محدد"}
          />

          <InfoItem
            icon={Heart}
            label={"العلاقة"}
            value={userData.emergencyContact?.relationship || "غير محدد"}
          />

          <InfoItem
            icon={Phone}
            label={"رقم الهاتف"}
            value={userData.emergencyContact?.phone || "غير محدد"}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-primaryBorder p-6">
        <h3 className="text-xl font-bold text-primaryText mb-6">
          المعلومات الطبية
        </h3>

        {/* Allergies */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-3">الحساسية</h4>
          {userData.allergies && userData.allergies.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {userData.allergies.map((allergy: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                >
                  {allergy}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">لا توجد حساسيات مسجلة</p>
          )}
        </div>

        {/* Medical History */}
        <div>
          <h4 className="font-medium text-gray-700 mb-3">السجل الطبي</h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 whitespace-pre-line">
              {userData.medicalHistory || "لا يوجد سجل طبي مسجل"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
