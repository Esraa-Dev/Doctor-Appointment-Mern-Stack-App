import { Lock } from "lucide-react";
import { TextInput } from "../ui/TextInput";
import { useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import AppForm from "./AppForm";

const ResetPasswordForm = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const password = watch("newPassword");

  const onSubmit = (data: any) => {
    console.log("RESET PASSWORD DATA:", data);
  };

  return (
    <AppForm title="إعادة تعيين كلمة المرور">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* New Password */}
        <TextInput
          label="كلمة المرور الجديدة"
          Icon={Lock}
          type="password"
          placeholder="أدخل كلمة المرور الجديدة"
          register={register("newPassword", { 
            required: "كلمة المرور الجديدة مطلوبة",
            minLength: { value: 6, message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" }
          })}
          error={errors.newPassword}
        />

        {/* Confirm New Password */}
        <TextInput
          label="تأكيد كلمة المرور الجديدة"
          Icon={Lock}
          type="password"
          placeholder="أعد إدخال كلمة المرور الجديدة"
          register={register("confirmNewPassword", { 
            required: "تأكيد كلمة المرور مطلوب",
            validate: value => value === password || "كلمات المرور غير متطابقة"
          })}
          error={errors.confirmNewPassword}
        />

        {/* Submit Button */}
        <Button className="w-full py-4" type="submit">
          إعادة تعيين كلمة المرور
        </Button>

      </form>
    </AppForm>
  );
};

export default ResetPasswordForm;