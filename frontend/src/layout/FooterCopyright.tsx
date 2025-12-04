export function FooterCopyright() {
    return (
        <section className="border-t border-primaryBorder mt-8 pt-6 text-center text-white flex-1 w-full">
            <p className="flex-center gap-1">
                <span>جميع الحقوق محفوظة</span>
                <span>لعيادة  الشفاء</span>
                <span>© {new Date().getFullYear()}</span>
            </p>
        </section>
    )
}
