import { Logo } from '../components/ui/Logo'

export const BrandInfo = () => {
    return (
        <div>
            <Logo />
            <p className="text-gray-300 text-sm leading-6">
                عيادة الشفاء : نسهل عليك حجز المواعيد والاستشارات الطبية مع
                الأطباء بسرعة وأمان، مباشرة عبر الإنترنت، دون الحاجة للانتظار
                لتوفير الوقت وتحسين تجربة المرضى.
            </p>
        </div>
    )
}
