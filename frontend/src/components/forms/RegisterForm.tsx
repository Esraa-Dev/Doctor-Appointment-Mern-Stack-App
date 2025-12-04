import { User, Mail, Lock, Phone } from "lucide-react";
import { TextInput } from "../ui/TextInput";
import { useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";
import AppForm from "./AppForm";

export const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const password = watch("password");

    const onSubmit = (data: any) => {
        console.log("SIGNUP DATA:", data);
    };

    return (
        <AppForm title="إنشاء حساب جديد">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <TextInput
                    label="الاسم الكامل"
                    Icon={User}
                    type="text"
                    placeholder="أدخل اسمك الكامل"
                    register={register("fullName")}
                    error={errors.fullName}
                />

                <TextInput
                    label="البريد الإلكتروني"
                    Icon={Mail}
                    type="email"
                    placeholder="أدخل بريدك الإلكتروني"
                    register={register("email")}
                    error={errors.email}
                />

                <TextInput
                    label="كلمة المرور"
                    Icon={Lock}
                    type="password"
                    placeholder="أدخل كلمة المرور"
                    register={register("password")}
                    error={errors.password}
                />

                <TextInput
                    label="تأكيد كلمة المرور"
                    Icon={Lock}
                    type="password"
                    placeholder="أعد إدخال كلمة المرور"
                    register={register("confirmPassword")}
                    error={errors.confirmPassword}
                />

                {/* <div className="mb-4">
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            {...register("terms", { required: "يجب الموافقة على الشروط والأحكام" })}
                            className="h-4 w-4 text-primary border-primaryBorder rounded cursor-pointer"
                        />
                        <span className="mr-2 text-sm text-primaryText">
                            أوافق على <Link to="/terms" className="text-secondary hover:text-primary">الشروط والأحكام</Link> و <Link to="/privacy" className="text-secondary hover:text-primary">سياسة الخصوصية</Link>
                        </span>
                    </label>
                    {errors.terms && (
                        <p className="text-red-500 text-sm mt-2 text-right">
                            {errors.terms.message}
                        </p>
                    )}
                </div> */}

                <Button className="w-full py-4" type="submit">
                    إنشاء الحساب
                </Button>

                <div className="mt-6 text-center">
                    <p className="text-primaryText text-sm">
                        لديك حساب بالفعل؟{" "}
                        <Link
                            to="/login"
                            className="text-secondary hover:text-primary font-semibold"
                        >
                            سجل الدخول
                        </Link>
                    </p>
                </div>

            </form>
        </AppForm>
    );
};
