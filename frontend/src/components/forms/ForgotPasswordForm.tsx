import { Loader2, Mail } from "lucide-react";
import { TextInput } from "../ui/TextInput";
import { useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";
import AppForm from "./AppForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForgotPassword } from "../../hooks/auth/useForgotPassword";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "../../validations/forgotPasswordSchema";
import { useTranslation } from "react-i18next";

export const ForgotPasswordForm = () => {
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
    });
    
    const { mutate, isPending } = useForgotPassword();
    
    const onSubmit = (data: ForgotPasswordFormData) => {
        mutate(data);
    };

    return (
        <AppForm title={t('auth:forgotPassword')}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <TextInput
                    label={t('auth:email')}
                    Icon={Mail}
                    type="email"
                    placeholder={t('auth:enterEmail')}
                    register={register("email")}
                    error={errors.email}
                />

                <Button className="w-full py-4" type="submit" disabled={isPending}>
                    {isPending ? (
                        <div className="flex items-center justify-center">
                            <Loader2 className="h-4 w-4 animate-spin ml-2" />
                            <span>{t('auth:sending')}</span>
                        </div>
                    ) : (
                        t('auth:recoverPassword')
                    )}
                </Button>

                <div className="mt-6 text-center">
                    <p className="text-primaryText text-sm">
                        {t('auth:rememberPassword')}{" "}
                        <Link
                            to="/login"
                            className="text-secondary hover:text-primary font-semibold"
                        >
                            {t('auth:backToLogin')}
                        </Link>
                    </p>
                </div>
            </form>
        </AppForm>
    );
};