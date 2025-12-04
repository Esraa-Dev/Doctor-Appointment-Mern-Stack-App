import { useState } from "react";
import { Mail, RefreshCw } from "lucide-react";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";
import AppForm from "./AppForm";

const EmailVerificationForm = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleResend = () => {
    setTimer(60);
    // Resend logic here
    console.log("Resending verification code...");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const verificationCode = code.join("");
    console.log("VERIFICATION CODE:", verificationCode);
  };

  return (
    <AppForm>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4 text-center">
          <div className="w-20 h-20 bg-linear-to-r rounded-full from-primary to-secondary flex-center justify-center mx-auto mb-4">
            <Mail className="w-10 h-10 text-white" />
          </div>
          <p className="text-primaryText text-sm mb-2">
            تم إرسال رمز التحقق إلى بريدك الإلكتروني
          </p>
          <p className="text-sm text-gray-500">
            يرجى إدخال الرمز المكون من 6 أرقام
          </p>
        </div>

        {/* Verification Code Inputs */}
        <div className="mb-6">
          <div className="flex justify-center gap-2 mb-4">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-xl border-2 border-primaryBorder rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                dir="ltr"
              />
            ))}
          </div>
        </div>

        {/* Timer and Resend */}
        <div className="text-center mb-6">
          {timer > 0 ? (
            <p className="text-sm text-primaryText">
              يمكنك إعادة الإرسال خلال <span className="text-secondary font-bold">{timer}</span> ثانية
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="flex items-center justify-center gap-2 text-secondary hover:text-primary font-medium mx-auto"
            >
              <RefreshCw className="w-4 h-4" />
              إعادة إرسال الرمز
            </button>
          )}
        </div>

        {/* Verify Button */}
        <Button className="w-full py-4" type="submit">
          تأكيد الحساب
        </Button>

        {/* Didn't receive code? */}
        <div className="text-center">
          <p className="text-sm text-primaryText">
            لم تستلم الرمز؟{" "}
            <button
              type="button"
              onClick={handleResend}
              className="text-secondary hover:text-primary font-semibold"
            >
              إعادة إرسال
            </button>
          </p>
        </div>

        {/* Back to Signup */}
        <div className="mt-6 text-center">
          <Link
            to="/signup"
            className="text-sm text-primaryText hover:text-secondary"
          >
            العودة للخلف
          </Link>
        </div>

      </form>
    </AppForm>
  );
};

export default EmailVerificationForm;