import { Heart, Users, Shield, Award, Target, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation('about');

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: t('values.healthFirst.title'),
      description: t('values.healthFirst.description')
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('values.privacySecurity.title'),
      description: t('values.privacySecurity.description')
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t('values.teamwork.title'),
      description: t('values.teamwork.description')
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: t('values.highQuality.title'),
      description: t('values.highQuality.description')
    }
  ];

  const stats = [
    { number: "500+", label: t('stats.specializedDoctors') },
    { number: "50k+", label: t('stats.satisfiedPatients') },
    { number: "24/7", label: t('stats.technicalSupport') },
    { number: "98%", label: t('stats.customerSatisfaction') }
  ];

  return (
    <div className="bg-background">
      <section className="py-20 bg-linear-to-r from-primary to-secondary text-white">
        <div className="container text-center">
          <h1 className="text-5xl font-bold mb-6">{t('heroTitle')}</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            {t('heroDescription')}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl border border-primaryBorder">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-10 h-10 text-primary" />
                <h2 className="text-2xl font-bold text-primaryText">{t('missionTitle')}</h2>
              </div>
              <p className="text-secondary text-lg leading-relaxed">
                {t('missionDescription')}
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-primaryBorder">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="w-10 h-10 text-primary" />
                <h2 className="text-2xl font-bold text-primaryText">{t('visionTitle')}</h2>
              </div>
              <p className="text-secondary text-lg leading-relaxed">
                {t('visionDescription')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primaryText mb-4">{t('valuesTitle')}</h2>
            <p className="text-secondary text-xl">{t('valuesSubtitle')}</p>
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

      <section className="py-20 bg-linear-to-r from-primary to-secondary">
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