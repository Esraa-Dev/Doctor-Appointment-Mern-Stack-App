import * as yup from "yup";

export const resetOtpSchema = yup.object().shape({
  resetPasswordOtp: yup
    .string()
    .length(6, "الرمز يجب أن يكون 6 أرقام")
    .required("هذا الحقل مطلوب"),
});
