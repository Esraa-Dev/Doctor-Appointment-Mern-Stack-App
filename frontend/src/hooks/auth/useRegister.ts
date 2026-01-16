import { useMutation } from "@tanstack/react-query";
import { authService } from "../../services/authService";
import { toast } from "react-toastify";
import { getApiErrorMessage } from "../../utils/apiError";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const useRegister = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    
    return useMutation({
        mutationFn: authService.register,
        onSuccess: (data) => {
            toast.success(data.message);
            navigate("/verify-email", { state: data.data.email });
        },
        onError: (error: any) => {
            toast.error(getApiErrorMessage(error, t("common:defaultError")));
        },
    });
};