import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { doctorOnboardingSchema } from "../../validations/doctorOnboardingSchema";
import { Button } from "../ui/Button";
import { TextInput } from "../ui/TextInput";
import { Textarea } from "../ui/Textarea";
import { Select } from "../ui/Select";
import { DAYS, STEPS } from "../../constants/onboarding";
import { useGetDepartment } from "../../hooks/department/useGetDepartment";
import type { DoctorOnboardingData } from "../../types/types";
import { useUpdateDoctorProfile } from "../../hooks/doctor/useUpdateDoctorProfile";

export const DoctorOnboardingForm = () => {
  const { data: departmentsData } = useGetDepartment();
  const { mutate, isPending } = useUpdateDoctorProfile();
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DoctorOnboardingData>({
    resolver: zodResolver(doctorOnboardingSchema),
    defaultValues: {
      experience: 0,
      fee: 100,
      schedule: [{
        day: "saturday", startTime: "09:00",
        endTime: "17:00"
      }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "schedule",
  });

  const handleNextStep = async () => {
    setStep((prev) => Math.min(prev + 1, 2));
  };

  const handlePrevStep = () => {
    setStep((prev) => (Math.max(prev - 1, 1)))
  };

  const onSubmit = (data: DoctorOnboardingData) => {
    if (step === STEPS.length) {
      mutate(data);
    } else {
      handleNextStep();
    }
  };

  return (
    <div className="bg-background py-8">
      <div className="max-w-4xl mx-auto container">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            أهلاً بك
          </h1>
          <p className="text-gray-600 text-md">
            قبل استقبال المرضى، أكمل ملفك الشخصي وحدد المواعيد والسعر لتفعيل حسابك
          </p>
        </div>

        <div className="mb-10">
          <div className="flex justify-between items-center relative">
            <div className="absolute top-6 right-6 left-7 h-1 bg-gray-200 "></div>

            <div
              className="absolute top-6 h-1 right-6 bg-primary"
              style={{
                width: `calc(${(step - 1) / (STEPS.length - 1) * 100}% - 46px)`
              }}
            ></div>

            {STEPS.map(({ number, title, icon: Icon }) => (
              <div key={number} className="flex flex-col items-center relative z-10">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 border-4 transition-all duration-300 ${step >= number ? "bg-primary border-primary text-white" : "bg-white border-gray-300 text-gray-400"}`}>
                  <Icon size={24} />
                </div>
                <span className={`text-sm font-medium ${step >= number ? "text-primary" : "text-gray-500"}`}>
                  {title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-8"
        >
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-900 border-b pb-3 border-primaryBorder">
                المعلومات المهنية
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  label="القسم"
                  register={register("department")}
                  error={errors.department}
                  requiredSelect={true}
                >
                  <option value="">اختر القسم</option>
                  {departmentsData?.map((dept: any) => (
                    <option key={dept._id} value={dept._id}>
                      {dept.name}
                    </option>
                  ))}
                </Select>

                <TextInput
                  label="التخصص"
                  id="specialization"
                  requiredInput
                  placeholder="أدخل التخصص الدقيق"
                  register={register("specialization")}
                  error={errors.specialization}
                />

                <TextInput
                  label="المؤهل العلمي"
                  id="qualification"
                  requiredInput
                  placeholder="مثال: دكتوراه في الطب"
                  register={register("qualification")}
                  error={errors.qualification}
                />

                <TextInput
                  label="سنوات الخبرة"
                  id="experience"
                  type="number"
                  placeholder="عدد السنوات"
                  register={register("experience", { valueAsNumber: true })}
                  error={errors.experience}
                />

                <Textarea
                  label="نبذة عنك"
                  id="description"
                  placeholder="اكتب نبذة مختصرة عن خبرتك وتخصصك..."
                  rows={4}
                  register={register("description")}
                  error={errors.description}
                  className="min-h-[150px] col-span-2"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-900 border-b pb-3">
                المواعيد والسعر
              </h2>
              <TextInput
                label="سعر الكشف"
                id="fee"
                type="number"
                requiredInput
                placeholder="أدخل سعر الكشف"
                register={register("fee", { valueAsNumber: true })}
                error={errors.fee}
              />


              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">
                    أوقات العمل
                  </h3>
                  <Button
                    type="button"
                    onClick={() => append({ day: "saturday", startTime: "", endTime: "" })}
                    className="flex items-center gap-2"
                  >
                    <Plus size={16} />
                    إضافة يوم
                  </Button>
                </div>
                {fields.map((schedule, index) => (
                  <div
                    key={schedule.id}
                    className="p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-4"
                  >
                    <div className="flex items-center justify-end mb-3">
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Select
                        label="اليوم"
                        register={register(`schedule.${index}.day`)}
                        error={errors.schedule?.[index]?.day}
                        requiredSelect
                      >
                        <option value="">اختر اليوم</option>
                        {DAYS.map((day) => (
                          <option key={day.value} value={day.value}>
                            {day.label}
                          </option>
                        ))}
                      </Select>


                      <TextInput
                        label="من"
                        id={`schedule.${index}.startTime`}
                        type="time"
                        requiredInput
                        register={register(`schedule.${index}.startTime`)}
                        error={errors.schedule?.[index]?.startTime}
                      />

                      <TextInput
                        label="إلى"
                        id={`schedule.${index}.endTime`}
                        type="time"
                        requiredInput
                        register={register(`schedule.${index}.endTime`)}
                        error={errors.schedule?.[index]?.endTime}
                      />
                    </div>
                  </div>
                ))}

              </div>
            </div>
          )}


          <div className="flex justify-between items-center pt-6 border-t border-primaryBorder">
            <Button
              type="button"
              onClick={handlePrevStep}
              disabled={step === 1}
              className="min-w-[120px]"
            >
              السابق
            </Button>

            <Button
              type="submit"
              disabled={isPending}
              className="min-w-[120px] bg-primary"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                  جاري الإرسال...
                </>
              ) : step === STEPS.length ? (
                "إكمال التسجيل"
              ) : (
                "التالي"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
