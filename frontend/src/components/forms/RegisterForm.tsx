import { User, Mail, Lock, Phone, Loader2 } from "lucide-react";
import { TextInput } from "../ui/TextInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";
import AppForm from "./AppForm";
import { useRegister } from "../../hooks/auth/useRegister";
import {
    registerSchema,
    type RegisterFormData,
} from "../../validations/registerSchema";

export const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });
    const { mutate, isPending } = useRegister();
    const onSubmit = (data: RegisterFormData) => {
        mutate(data);
    };

    return (
        <AppForm title="إنشاء حساب جديد">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <TextInput
                    label="الاسم الأول"
                    Icon={User}
                    type="text"
                    placeholder="أدخل الاسم الأول"
                    register={register("firstName")}
                    error={errors.firstName}
                />
                <TextInput
                    label=" الاسم الأخير"
                    Icon={User}
                    type="text"
                    placeholder="أدخل الاسم الأخير"
                    register={register("lastName")}
                    error={errors.lastName}
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
                    label="رقم الهاتف"
                    Icon={Phone}
                    type="text"
                    placeholder="أدخل رقم الهاتف"
                    register={register("phone")}
                    error={errors.phone}
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

                <Button className="w-full py-4" type="submit" disabled={isPending}>
                    {isPending ? (
                        <div className="flex items-center justify-center">
                            <Loader2 className="h-4 w-4 animate-spin ml-2" />
                            جاري الإنشاء
                        </div>
                    ) : (
                        "إنشاء الحساب"
                    )}
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
