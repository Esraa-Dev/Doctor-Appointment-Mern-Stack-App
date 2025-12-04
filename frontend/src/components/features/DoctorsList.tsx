import React, { useState } from 'react';
import { Search, MapPin, Calendar, Star } from 'lucide-react';

const DoctorsList = () => {
  const [filters, setFilters] = useState({
    specialization: '',
    gender: 'all'
  });

  const doctors = [
    {
      id: 1,
      name: 'د. آتنا جوبياري',
      specialty: 'جراحة الأطفال',
      location: 'القاهرة',
      rating: 4.8,
      reviews: 140,
      nextDate: '٢٤ ديسمبر',
      available: true,
      gender: 'female'
    },
    {
      id: 2,
      name: 'د. محمد مصطفائي',
      specialty: 'التغذية والحمية',
      location: 'الجيزة',
      rating: 4.6,
      reviews: 120,
      nextDate: '٢٥ ديسمبر',
      available: true,
      gender: 'male'
    },
    {
      id: 3,
      name: 'د. آزاده موسوي',
      specialty: 'جراح أطفال',
      location: 'القاهرة',
      rating: 4.9,
      reviews: 210,
      nextDate: '٢٦ ديسمبر',
      available: true,
      gender: 'female'
    },
    {
      id: 4,
      name: 'د. مهني أحمدي',
      specialty: 'أخصائية تغذية',
      location: 'الإسكندرية',
      rating: 4.7,
      reviews: 95,
      nextDate: '٢٧ ديسمبر',
      available: true,
      gender: 'female'
    }
  ];

  const specializations = [
    'كل التخصصات',
    'جراحة الأطفال',
    'التغذية والحمية',
    'طب الأطفال',
    'القلب',
    'الأعصاب',
    'الجلدية',
    'العظام'
  ];

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredDoctors = doctors.filter(doctor => {
    if (filters.gender !== 'all' && doctor.gender !== filters.gender) return false;
    if (filters.specialization && filters.specialization !== 'كل التخصصات' && 
        !doctor.specialty.includes(filters.specialization)) return false;
    return true;
  });

  return (
    <div className="py-12 bg-background">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-primaryText mb-3">بحث عن الأطباء</h1>
          <p className="text-secondary text-lg">ابحث عن أفضل الأطباء المتخصصين</p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <div className="absolute inset-y-0 right-3 flex items-center">
                <Search className="h-5 w-5 text-secondary" />
              </div>
              <input
                type="text"
                placeholder="ابحث عن طبيب..."
                className="w-full p-3 pr-10 border border-primaryBorder rounded-xl bg-white focus:outline-none focus:border-primary text-right"
              />
            </div>

            {/* Specialization Filter */}
            <select
              value={filters.specialization}
              onChange={(e) => handleFilterChange('specialization', e.target.value)}
              className="w-full md:w-48 p-3 border border-primaryBorder rounded-xl bg-white focus:outline-none focus:border-primary text-right"
            >
              {specializations.map((spec) => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>

            {/* Gender Filter */}
            <select
              value={filters.gender}
              onChange={(e) => handleFilterChange('gender', e.target.value)}
              className="w-full md:w-40 p-3 border border-primaryBorder rounded-xl bg-white focus:outline-none focus:border-primary text-right"
            >
              <option value="all">جميع الأطباء</option>
              <option value="female">طبيبات</option>
              <option value="male">أطباء</option>
            </select>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 text-center">
          <p className="text-primaryText">
            عرض <span className="font-bold text-primary">{filteredDoctors.length}</span> طبيب
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-xl border border-primaryBorder p-6 hover:border-primary transition-colors">
              
              {/* Doctor Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-right">
                  <h3 className="font-bold text-primaryText text-lg mb-1">{doctor.name}</h3>
                  <p className="text-primary font-medium text-sm">{doctor.specialty}</p>
                </div>
                
                {/* Rating */}
                <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-bold text-primaryText text-sm">{doctor.rating}</span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center justify-end gap-2 text-secondary text-sm mb-4">
                <MapPin className="w-4 h-4" />
                <span>{doctor.location}</span>
              </div>

              {/* Reviews */}
              <div className="text-sm text-primaryText mb-4">
                ⭐ {doctor.reviews} تقييم
              </div>

              {/* Next Date */}
              <div className="flex items-center justify-between mb-6 text-sm">
                <div className="flex items-center gap-2 text-secondary">
                  <Calendar className="w-4 h-4" />
                  <span>موعد متاح: {doctor.nextDate}</span>
                </div>
              </div>

              {/* CTA Button */}
              <button className="w-full py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors">
                احجز موعد
              </button>
            </div>
          ))}
        </div>

        {/* Load More */}
        {filteredDoctors.length > 0 && (
          <div className="text-center mt-12">
            <button className="px-8 py-3 border-2 border-primaryBorder text-primaryText rounded-xl hover:border-primary hover:text-primary transition-colors">
              عرض المزيد
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;