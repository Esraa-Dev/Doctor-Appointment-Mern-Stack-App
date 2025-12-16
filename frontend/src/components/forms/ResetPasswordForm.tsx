import { Loader2, Lock } from "lucide-react";
import { TextInput } from "../ui/TextInput";
import { useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import AppForm from "./AppForm";
import { useResetPassword } from "../../hooks/auth/useResetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, type ResetPasswordFormData } from "../../validations/resetPasswordSchema";
import { useLocation } from "react-router-dom";

const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });
  const { mutate, isPending } = useResetPassword();
  const location = useLocation();
  const userEmail = location.state?.email;
  const onSubmit = (data: ResetPasswordFormData) => {
    mutate({ ...data, email: userEmail })
  };

  return (
    <AppForm title="إعادة تعيين كلمة المرور">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <TextInput
          label="كلمة المرور الجديدة"
          Icon={Lock}
          type="password"
          placeholder="أدخل كلمة المرور الجديدة"
          register={register("password")}
          error={errors.password}
        />

        <TextInput
          label="تأكيد كلمة المرور الجديدة"
          Icon={Lock}
          type="password"
          placeholder="أعد إدخال كلمة المرور الجديدة"
          register={register("confirmPassword")}
          error={errors.confirmPassword}
        />

        <Button className="w-full py-4" type="submit" disabled={isPending}>
          {isPending ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin ml-2" />
              <span>جاري إعادة التعيين...</span>
            </div>
          ) : (
            "إعادة تعيين كلمة المرور"
          )}
        </Button>


      </form>
    </AppForm>
  );
};

export default ResetPasswordForm;