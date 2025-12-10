import * as yup from "yup";

export const otpSchema = yup.object().shape({
  verifyOtp: yup
    .string()
    .length(6, "الرجاء إدخال الرمز المكون من 6 أرقام")
    .matches(/^\d{6}$/, "يجب أن يتكون الرمز من أرقام فقط")
    .required("الرجاء إدخال الرمز"),
});
