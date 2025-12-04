import { Heart, Brain, Bone, Baby, Eye, Stethoscope, ArrowUpRight } from "lucide-react";

const specialties = [
    { icon: <Heart className="w-5 h-5" />, name: "القلب", count: 24 },
    { icon: <Brain className="w-5 h-5" />, name: "الأعصاب", count: 18 },
    { icon: <Bone className="w-5 h-5" />, name: "العظام", count: 32 },
    { icon: <Baby className="w-5 h-5" />, name: "الأطفال", count: 28 },
    { icon: <Eye className="w-5 h-5" />, name: "العيون", count: 15 },
    { icon: <Stethoscope className="w-5 h-5" />, name: "الباطنة", count: 35 },
];

const SpecialityMenu = () => {
    return (
        <section className="py-16 bg-white relative overflow-hidden">
            {/* Background Circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full translate-y-40 -translate-x-40"></div>

            <div className="container">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-primaryText mb-3">التخصصات الطبية</h2>
                    <p className="text-secondary text-lg mb-4">اختر التخصص المناسب لرعايتك الصحية</p>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {specialties.map((item, index) => (
                        <div
                            key={index}
                            className="group relative bg-background border border-primaryBorder rounded-2xl p-6 hover:border-primary hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                        >
                            {/* Decorative Circles */}
                            <div className="absolute -top-6 -left-6 w-12 h-12 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-all duration-500"></div>
                            <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-secondary/10 rounded-full group-hover:bg-secondary/20 transition-all duration-500"></div>

                            {/* Card Content */}
                            <div className="relative z-10">
                                {/* Icon */}
                                <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-white">{item.icon}</span>
                                </div>

                                {/* Name & Count */}
                                <div className="text-right space-y-2">
                                    <h3 className="text-xl font-bold text-primaryText group-hover:text-primary transition-colors duration-300">
                                        {item.name}
                                    </h3>
                                    <p className="text-secondary text-sm font-medium">
                                        {item.count} طبيب متخصص
                                    </p>
                                </div>

                                {/* Description */}
                                <p className="text-primaryText/70 text-sm mt-4 text-right leading-relaxed">
                                    رعاية طبية متكاملة في تخصص {item.name} مع أفضل الأطباء
                                </p>


                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="text-center mt-16">
                    <button className="px-8 py-3 border-2 border-primaryBorder text-primaryText rounded-xl hover:border-secondary hover:text-secondary transition-all duration-300 font-medium">
                        عرض الكل →
                    </button>
                </div>
            </div>
        </section>
    );
};

export default SpecialityMenu;
