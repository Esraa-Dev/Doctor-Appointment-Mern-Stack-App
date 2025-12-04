import { Mail } from "lucide-react";
import { TextInput } from "../ui/TextInput";
import { useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";
import AppForm from "./AppForm";

const ForgotPasswordForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log("FORGOT PASSWORD DATA:", data);
  };

  return (
    <AppForm title="نسيت كلمة المرور">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="mb-4 text-center">
          <p className="text-primaryText text-sm">
            أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة تعيين كلمة المرور
          </p>
        </div>

        {/* Email */}
        <TextInput
          label="البريد الإلكتروني"
          Icon={Mail}
          type="email"
          placeholder="أدخل بريدك الإلكتروني المسجل"
          register={register("email", { 
            required: "البريد الإلكتروني مطلوب",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "بريد إلكتروني غير صالح"
            }
          })}
          error={errors.email}
        />

        {/* Submit Button */}
        <Button className="w-full py-4" type="submit">
          إرسال رابط إعادة التعيين
        </Button>

        {/* Back to Login */}
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

export default ForgotPasswordForm;