import { Star, MapPin, Calendar } from "lucide-react";

const TopDoctors = () => {
  const doctors = [
    {
      id: 5,
      name: "د. خالد إبراهيم",
      specialty: "الأسنان",
      rating: 4.6,
      experience: 14,
      location: "الجيزة",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=300&fit=crop",
      price: 180
    },
    {
      id: 6,
      name: "د. ليلى مصطفى",
      specialty: "الباطنة",
      rating: 4.8,
      experience: 11,
      location: "القاهرة",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop",
      price: 170
    },
    {
      id: 7,
      name: "د. ياسر محمود",
      specialty: "الجلدية",
      rating: 4.7,
      experience: 9,
      location: "الإسكندرية",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop",
      price: 220
    },
    {
      id: 8,
      name: "د. منى أحمد",
      specialty: "النساء والتوليد",
      rating: 4.9,
      experience: 13,
      location: "الجيزة",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop",
      price: 280
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primaryText mb-3">فريق الأطباء</h2>
          <p className="text-secondary text-lg">أطباء متخصصون لرعايتك الصحية</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-xl border border-primaryBorder overflow-hidden hover:shadow-lg transition-shadow">
              {/* Full Width Image with Rating */}
              <div className="w-full h-48 overflow-hidden relative">
                <img 
                  src={doctor.image} 
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
                {/* Rating Badge - Top Left */}
                <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-sm font-bold text-primaryText">{doctor.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="text-right mb-3">
                  <h3 className="font-bold text-primaryText text-lg mb-1">{doctor.name}</h3>
                  <p className="text-primary font-medium">{doctor.specialty}</p>
                </div>

                <div className="flex items-center justify-between mb-3 text-sm text-secondary">
                  <div className="flex items-center gap-1 text-primaryText">
                    <Calendar className="w-4 h-4" />
                    <span>{doctor.experience} سنة</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-sm text-primaryText mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{doctor.location}</span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-primaryBorder">
                  <div className="text-left">
                    <span className="text-xl font-bold text-primary">{doctor.price}</span>
                    <span className="text-primaryText text-sm"> ج.م</span>
                  </div>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-secondary transition-colors">
                    احجز
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-3 border border-primaryBorder text-primaryText rounded-xl hover:border-secondary hover:text-secondary transition-colors">
            عرض جميع الأطباء
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopDoctors;