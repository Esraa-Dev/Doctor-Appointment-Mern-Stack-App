import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { doctorOnboardingSchema } from "../../validations/doctorOnboardingSchema";
import { Button } from "../ui/Button";
import { TextInput } from "../ui/TextInput";
import { Textarea } from "../ui/Textarea";
import { Select } from "../ui/Select";
import { DAYS, STEPS } from "../../constants/constants";
import { useGetDepartment } from "../../hooks/department/useGetDepartment";
import type { DoctorOnboardingData } from "../../types/types";
import { useUpdateDoctorProfile } from "../../hooks/doctor/useUpdateDoctorProfile";

export const DoctorOnboardingForm = () => {
  const { t } = useTranslation(['onboarding']);
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

  const getDayLabel = (dayValue: string) => {
    const dayMap: Record<string, string> = {
      "monday": t('onboarding:monday'),
      "tuesday": t('onboarding:tuesday'),
      "wednesday": t('onboarding:wednesday'),
      "thursday": t('onboarding:thursday'),
      "friday": t('onboarding:friday'),
      "saturday": t('onboarding:saturday'),
      "sunday": t('onboarding:sunday')
    };
    return dayMap[dayValue] || dayValue;
  };

  return (
    <div className="bg-background py-8">
      <div className="max-w-4xl mx-auto container">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {t('onboarding:welcome')}
          </h1>
          <p className="text-gray-600 text-md">
            {t('onboarding:subtitle')}
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
                  {t(`${title}`)}
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
                {t('onboarding:professionalInfo')}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  label={t('onboarding:selectDepartment')}
                  register={register("department")}
                  error={errors.department}
                  requiredSelect={true}
                >
                  <option value="">{t('onboarding:chooseDepartment')}</option>
                  {departmentsData?.map((dept: any) => (
                    <option key={dept._id} value={dept._id}>
                      {dept.name}
                    </option>
                  ))}
                </Select>

                <TextInput
                  label={t('onboarding:specialization_en')}
                  id="specialization_en"
                  requiredInput
                  placeholder={t('onboarding:enterSpecialization')}
                  register={register("specialization_en")}
                  error={errors.specialization_en}
                />

                <TextInput
                  label={t('onboarding:specialization_ar')}
                  id="specialization_ar"
                  requiredInput
                  placeholder={t('onboarding:enterSpecializationAr')}
                  register={register("specialization_ar")}
                  error={errors.specialization_ar}
                />

                <TextInput
                  label={t('onboarding:qualification_en')}
                  id="qualification_en"
                  requiredInput
                  placeholder={t('onboarding:enterQualification')}
                  register={register("qualification_en")}
                  error={errors.qualification_en}
                />

                <TextInput
                  label={t('onboarding:qualification_ar')}
                  id="qualification_ar"
                  requiredInput
                  placeholder={t('onboarding:enterQualificationAr')}
                  register={register("qualification_ar")}
                  error={errors.qualification_ar}
                />

                <TextInput
                  label={t('onboarding:experienceYears')}
                  id="experience"
                  type="number"
                  placeholder={t('onboarding:enterExperience')}
                  register={register("experience", { valueAsNumber: true })}
                  error={errors.experience}
                />

                <Textarea
                  label={t('onboarding:aboutYou_en')}
                  id="description_en"
                  placeholder={t('onboarding:enterDescription')}
                  rows={3}
                  register={register("description_en")}
                  error={errors.description_en}
                  className="min-h-[100px] col-span-2"
                />

                <Textarea
                  label={t('onboarding:aboutYou_ar')}
                  id="description_ar"
                  placeholder={t('onboarding:enterDescriptionAr')}
                  rows={3}
                  register={register("description_ar")}
                  error={errors.description_ar}
                  className="min-h-[100px] col-span-2"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-900 border-b pb-3">
                {t('onboarding:appointmentsAndFees')}
              </h2>
              <TextInput
                label={t('onboarding:consultationFee')}
                id="fee"
                type="number"
                requiredInput
                placeholder={t('onboarding:enterFee')}
                register={register("fee", { valueAsNumber: true })}
                error={errors.fee}
              />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {t('onboarding:workHours')}
                  </h3>
                  <Button
                    type="button"
                    onClick={() => append({ day: "saturday", startTime: "", endTime: "" })}
                    className="flex items-center gap-2"
                  >
                    <Plus size={16} />
                    {t('onboarding:addDay')}
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
                        label={t('onboarding:selectDay')}
                        register={register(`schedule.${index}.day`)}
                        error={errors.schedule?.[index]?.day}
                        requiredSelect
                      >
                        <option value="">{t('onboarding:selectDay')}</option>
                        {DAYS.map((day) => (
                          <option key={day.value} value={day.value}>
                            {getDayLabel(day.value)}
                          </option>
                        ))}
                      </Select>

                      <TextInput
                        label={t('onboarding:from')}
                        id={`schedule.${index}.startTime`}
                        type="time"
                        requiredInput
                        register={register(`schedule.${index}.startTime`)}
                        error={errors.schedule?.[index]?.startTime}
                      />

                      <TextInput
                        label={t('onboarding:to')}
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
              {t('onboarding:previous')}
            </Button>

            <Button
              type="submit"
              disabled={isPending}
              className="min-w-[120px] bg-primary"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                  {t('onboarding:submitting')}
                </>
              ) : step === STEPS.length ? (
                t('onboarding:completeRegistration')
              ) : (
                t('onboarding:next')
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};