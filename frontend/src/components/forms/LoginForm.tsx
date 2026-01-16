import { Mail, Lock, Loader2 } from "lucide-react";
import { TextInput } from "../ui/TextInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";
import AppForm from "./AppForm";
import { loginSchema, type LoginFormData } from "../../validations/loginSchema";
import { useLogin } from "../../hooks/auth/useLogin";
import { useTranslation } from "react-i18next";

const LoginForm = () => {
   const { t } = useTranslation(['auth', 'validation']);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema()),
    });

    const { mutate, isPending } = useLogin();
    const onSubmit = (data: LoginFormData) => {
        mutate(data);
    };
    return (
        <AppForm title={t('auth:login')}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <TextInput
                    label={t('auth:email')}
                    Icon={Mail}
                    type="email"
                    placeholder={t('auth:enterEmailLogin')}
                    register={register("email")}
                    error={errors.email}
                    id="email"
                    requiredInput
                />

                <TextInput
                    label={t('auth:password')}
                    Icon={Lock}
                    type="password"
                    placeholder={t('auth:enterPassword')}
                    register={register("password")}
                    error={errors.password}
                    id="password"
                    requiredInput
                />

                <Link
                    to="/forgot-password"
                    className="text-sm text-secondary hover:text-primary font-medium block"
                >
                    {t('auth:forgotPassword')}
                </Link>

                <Button className="w-full py-4" type="submit" disabled={isPending}>
                    {isPending ? (
                        <div className="flex items-center justify-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            {t('auth:loggingIn')}
                        </div>
                    ) : (
                        t('auth:login')
                    )}
                </Button>

                <div className="mt-6 text-center">
                    <p className="text-primaryText text-sm">
                        {t('auth:noAccount')}{" "}
                        <Link
                            to="/register"
                            className="text-secondary hover:text-primary font-semibold"
                        >
                            {t('auth:registerNow')}
                        </Link>
                    </p>
                </div>
            </form>
        </AppForm>
    );
};

export default LoginForm;