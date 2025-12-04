import { Mail, Lock } from "lucide-react";
import { TextInput } from "../ui/TextInput";
import { useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";
import AppForm from "./AppForm";

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log("LOGIN DATA:", data);
  };

  return (
    <AppForm title="تسجيل الدخول">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <TextInput
          label="البريد الإلكتروني"
          Icon={Mail}
          type="email"
          placeholder="أدخل بريدك الإلكتروني"
          register={register("email", { required: "البريد مطلوبة" })}
          error={errors.email}
        />

        <TextInput
          label="كلمة المرور"
          Icon={Lock}
          type="password"
          placeholder="أدخل كلمة المرور"
          register={register("password", { required: "كلمة المرور مطلوبة" })}
          error={errors.password}
        />

        <div className="flex-center justify-between mb-4">
          <label className="flex-center">
            <input
              type="checkbox"
              {...register("rememberMe")}
              className="h-4 w-4 text-primary border-primaryBorder rounded cursor-pointer"
            />
            <span className="mr-2 text-sm text-primaryText hover:text-secondary cursor-pointer">تذكرني</span>
          </label>

          <Link
            to="/forgot-password"
            className="text-sm text-secondary hover:text-primary font-medium"
          >
            نسيت كلمة المرور؟
          </Link>
        </div>

        <Button className="w-full py-4" type="submit">تسجيل الدخول</Button>

        <div className="mt-6 text-center">
          <p className="text-primaryText text-sm">
            ليس لديك حساب؟{" "}
            <Link
              to="/register"
              className="text-secondary hover:text-primary font-semibold"
            >
              سجّل الآن
            </Link>
          </p>
        </div>

      </form>
    </AppForm>
  );
};

export default LoginForm;
