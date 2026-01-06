import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DoctorCard from "../components/DoctorCard";
import { useGetDoctors } from "../hooks/doctor/useGetDoctors";
import { DoctorSearch } from "../components/ui/DoctorSearch";
import { useGetDepartment } from "../hooks/department/useGetDepartment";
import { Filter, Search, X } from "lucide-react";
import { Button } from "../components/ui/Button";
import type { Department, Doctor, DoctorFilters } from "../types/types";

const DoctorListPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const department = params.get("department");

  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(department);
  const [filters, setFilters] = useState<DoctorFilters>({
    search: "",
    department: department,
    fee: null,
    experience: null,
    schedule: null,
    sortBy: "experience",
  });

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  useEffect(() => {
    setFilters(prev => ({ ...prev, department: selectedDepartment }));
  }, [selectedDepartment]);

  const { data: departmentData = [], isLoading: isDepartmentLoading } = useGetDepartment();
  const { data: doctorsData = [], isLoading: isDoctorLoading } = useGetDoctors(filters);

  const clearFilters = () => {
    setFilters({
      search: "",
      department: department,
      fee: null,
      experience: null,
      schedule: null,
      sortBy: "experience",
    });
    setSelectedDepartment(department);
  };

  const handleExperienceChange = (value: string) => {
    const numValue = value === "" ? null : Number(value);
    setFilters(prev => ({
      ...prev,
      experience: numValue
    }));
  };

  const handleFeeChange = (value: string) => {
    const numValue = value === "" ? null : Number(value);
    setFilters(prev => ({
      ...prev,
      fee: numValue
    }));
  };

  const handleScheduleChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      schedule: value || null
    }));
  };

  if (isDepartmentLoading) return <p>loading...</p>;

  return (
    <div className="min-h-screen bg-background pt-20 container">
      <div className="bg-white p-8 rounded-4xl mb-8 border border-primaryBorder">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">اختر طبيبك</h2>
          <p className="text-gray-600">ابحث عن الطبيب المناسب لاحتياجاتك الصحية</p>
        </div>
        <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <DoctorSearch
            onSearchChange={(value: string) =>
              setFilters(prev => ({ ...prev, search: value }))
            }
          />
          <Button
            className="p-2! flex items-center gap-2"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          >
            <Filter size={20} />
            فلترة متقدمة
          </Button>
        </div>

        <div className="mb-8">
          <h3 className="text-sm font-bold text-primaryText mb-2">تصفح حسب القسم</h3>
          <div className="flex flex-wrap gap-2 p-2 shadow-sm">
            <button
              onClick={() => setSelectedDepartment(null)}
              className={`px-4 py-2 rounded-4xl text-sm transition-colors duration-200 border-2 border-white cursor-pointer ${selectedDepartment === null ? "bg-primary text-white" : "text-primaryText bg-primary/10"
                }`}
            >
              كل الأقسام
            </button>
            {departmentData.map((dept: Department) => (
              <button
                key={dept._id}
                onClick={() => setSelectedDepartment(dept._id)}
                className={`px-4 py-2 rounded-4xl text-sm transition-colors duration-200 border-2 border-white cursor-pointer ${selectedDepartment === dept._id ? "bg-primary text-white" : "text-primaryText bg-primary/10"
                  }`}
              >
                {dept.icon && <span className="ml-2">{dept.icon}</span>}
                {dept.name}
              </button>
            ))}
          </div>

          {showAdvancedFilters && (
            <div className="p-6 mt-8 bg-primary/5 relative rounded-4xl">
              <div className="flex items-center justify-between mb-4">
                <Button
                  onClick={() => setShowAdvancedFilters(false)}
                  className="p-1! absolute left-4 top-4 shadow-2xl"
                >
                  <X className="w-4 h-4" />
                </Button>
                <h3 className="font-semibold w-full">فلتر متقدم</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-2 text-right">الخبرة (سنة)</label>
                  <input
                    type="number"
                    placeholder="أي خبرة"
                    className="bg-white p-2 rounded-md w-full outline-none border border-primaryBorder"
                    value={filters.experience ?? ""}
                    onChange={e => handleExperienceChange(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-2 text-right">سعر الكشف (جنيه)</label>
                  <input
                    type="number"
                    placeholder="أي سعر"
                    className="bg-white p-2 rounded-md w-full outline-none border border-primaryBorder"
                    value={filters.fee ?? ""}
                    onChange={e => handleFeeChange(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-2 text-right">اليوم المتاح</label>
                  <select
                    className="bg-white focus:outline-0 p-2 rounded-md text-sm outline-none border border-primaryBorder"
                    value={filters.schedule || ""}
                    onChange={e => handleScheduleChange(e.target.value)}
                    title="حدد اليوم المتاح للزيارة"
                    aria-label="اليوم المتاح للزيارة"
                  >
                    <option value="">كل الأيام</option>
                    <option value="monday">الإثنين</option>
                    <option value="tuesday">الثلاثاء</option>
                    <option value="wednesday">الأربعاء</option>
                    <option value="thursday">الخميس</option>
                    <option value="friday">الجمعة</option>
                    <option value="saturday">السبت</option>
                    <option value="sunday">الأحد</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-2 text-right">ترتيب حسب</label>
                  <select
                    className="bg-white focus:outline-0 p-2 rounded-md text-sm outline-none border border-primaryBorder"
                    value={filters.sortBy}
                    onChange={e => setFilters(prev => ({
                      ...prev,
                      sortBy: e.target.value
                    }))}
                    title="حدد طريقة الترتيب"
                    aria-label="طريقة ترتيب الأطباء"
                  >
                    <option value="experience">الأكثر خبرة</option>
                    <option value="fee">السعر (من الأقل)</option>
                    <option value="rating">الأعلى تقييماً</option>
                    <option value="name">الاسم (أ-ي)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button onClick={clearFilters}>
                  مسح كل الفلتر
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto">
        {isDoctorLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gray-200"></div>
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4 ml-auto"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 ml-auto"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-10 bg-gray-200 rounded mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isDoctorLoading && doctorsData.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <Search size={64} className="text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-primaryText mb-2">
              لم يتم العثور على أطباء
            </h3>
            <p className="text-gray-500 mb-4">حاول تعديل معايير البحث</p>
            <Button onClick={clearFilters}>مسح الفلاتر</Button>
          </div>
        )}

        {!isDoctorLoading && doctorsData.length > 0 && (
          <>
            <div className="mb-4 text-gray-600">
              عرض {doctorsData.length} طبيب{doctorsData.length > 1 ? 'اء' : ''}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {doctorsData.map((doctor: Doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DoctorListPage;