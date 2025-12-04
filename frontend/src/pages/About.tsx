import { Heart, Users, Shield, Award, Target, Globe } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "الصحة أولاً",
      description: "رعاية صحية شاملة تركز على المريض وتجاربه الصحية"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "خصوصية وأمان",
      description: "حماية بياناتك الصحية بمعايير عالمية"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "عمل جماعي",
      description: "فريق متكامل من الأطباء والاستشاريين"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "جودة عالية",
      description: "معايير طبية عالية الجودة في كل خدمة"
    }
  ];

  const stats = [
    { number: "500+", label: "طبيب متخصص" },
    { number: "50k+", label: "مريض راضٍ" },
    { number: "24/7", label: "دعم فني" },
    { number: "98%", label: "رضا العملاء" }
  ];

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container text-center">
          <h1 className="text-5xl font-bold mb-6">من نحن</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            نقدم رعاية طبية متكاملة تجمع بين الخبرة الطبية والتكنولوجيا الحديثة
            لتحقيق أفضل النتائج الصحية لمرضانا
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white p-8 rounded-2xl border border-primaryBorder">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-10 h-10 text-primary" />
                <h2 className="text-2xl font-bold text-primaryText">مهمتنا</h2>
              </div>
              <p className="text-secondary text-lg leading-relaxed">
                توفير رعاية صحية شاملة ومتاحة للجميع من خلال منصة رقمية متكاملة
                تربط المرضى بأفضل الأطباء المتخصصين، مع التركيز على تجربة مريض
                متميزة ورعاية طبية عالية الجودة.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white p-8 rounded-2xl border border-primaryBorder">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="w-10 h-10 text-primary" />
                <h2 className="text-2xl font-bold text-primaryText">رؤيتنا</h2>
              </div>
              <p className="text-secondary text-lg leading-relaxed">
                أن نكون المنصة الرقمية الرائدة في تقديم الخدمات الصحية في المنطقة،
                وأن نساهم في تحسين جودة الحياة من خلال توفير رعاية طبية مبتكرة
                ومتاحة للجميع في أي وقت ومن أي مكان.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primaryText mb-4">قيمنا</h2>
            <p className="text-secondary text-xl">المبادئ التي نؤمن بها ونعمل بها</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-background rounded-2xl border border-primaryBorder">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-primaryText mb-3">{value.title}</h3>
                <p className="text-secondary">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-white/90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;