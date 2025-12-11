import { Loader2, Mail } from "lucide-react";
import { TextInput } from "../ui/TextInput";
import { useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";
import AppForm from "./AppForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForgotPassword } from "../../hooks/useForgotPassword";
import type { ForgotPasswordFormData } from "../../types/types";
import { forgotPasswordSchema } from "../../validations/forgotPasswordSchema";

export const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });
  const { mutate, isPending } = useForgotPassword()
  const onSubmit = (data: ForgotPasswordFormData) => {
    console.log("FORGOT PASSWORD DATA:", data);
    mutate(data)

  };

  return (
    <AppForm title="نسيت كلمة المرور">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <TextInput
          label="البريد الإلكتروني"
          Icon={Mail}
          type="email"
          placeholder="أدخل بريدك الإلكتروني "
          register={register("email")}
          error={errors.email}
        />

        <Button className="w-full py-4" type="submit" disabled={isPending}>
          {isPending ? (
            <div className="flex items-center justify-center">
              <Loader2 className="h-4 w-4 animate-spin ml-2" />
              <span>جاري الإرسال...</span>
            </div>
          ) : (
            "استعادة كلمة المرور"
          )}
        </Button>

        <div className="mt-6 text-center">
          <p className="text-primaryText text-sm">
            تذكرت كلمة المرور؟{" "}
            <Link
              to="/login"
              className="text-secondary hover:text-primary font-semibold"
            >
              العودة لتسجيل الدخول
            </Link>
          </p>
        </div>

      </form>
    </AppForm>
  );
};
