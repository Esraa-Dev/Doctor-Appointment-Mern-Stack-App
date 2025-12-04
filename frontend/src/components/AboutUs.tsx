// AboutUs.jsx
import React from 'react';
import { 
  Heart, 
  Shield, 
  Users, 
  Award, 
  Clock, 
  Star,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import CTAButton from './CTAButton';

const AboutUs = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Verified Doctors",
      description: "All our doctors are certified and verified with proper medical licenses"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Availability", 
      description: "Round-the-clock access to healthcare professionals and support"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Patient First",
      description: "Your health and comfort are our top priorities in every interaction"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Quality Care",
      description: "Highest standards of medical care and patient satisfaction"
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Patients Served' },
    { number: '500+', label: 'Expert Doctors' },
    { number: '25+', label: 'Medical Departments' },
    { number: '98%', label: 'Satisfaction Rate' }
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      specialty: "Cardiology"
    },
    {
      name: "Dr. Michael Chen",
      role: "Head of Operations", 
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      specialty: "Neurology"
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Medical Director",
      image: "https://images.unsplash.com/photo-1594824947933-d0501ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      specialty: "Pediatrics"
    }
  ];

  const values = [
    "Transparent pricing with no hidden costs",
    "Secure and confidential medical records",
    "Easy appointment scheduling and management",
    "Emergency care and urgent appointments",
    "Digital prescriptions and online consultations",
    "Multi-language support for international patients"
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-blue-600">MediBook</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are revolutionizing healthcare by making quality medical care accessible, 
            affordable, and convenient for everyone. Our platform connects patients with 
            trusted healthcare providers seamlessly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left Content */}
          <div>
            <div className="mb-10">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">
                Your Trusted Healthcare Partner
              </h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded with a vision to transform healthcare delivery, MediBook brings 
                together cutting-edge technology and medical expertise to provide 
                comprehensive healthcare solutions.
              </p>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                We believe everyone deserves access to quality healthcare. Our platform 
                eliminates traditional barriers, making it easier to connect with the 
                right medical professionals when you need them most.
              </p>
            </div>

            {/* Values List */}
            <div className="grid md:grid-cols-2 gap-4 mb-10">
              {values.map((value, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{value}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
              <CTAButton variant="primary" size="lg">
                Learn More About Us
                <ArrowRight className="w-5 h-5 ml-2" />
              </CTAButton>
              <CTAButton variant="outline" size="lg" className="border-blue-600 text-blue-600">
                Our Mission
              </CTAButton>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-10 text-white shadow-2xl">
              <div className="grid grid-cols-2 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl font-bold mb-2">{stat.number}</div>
                    <div className="text-blue-100 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-8 -right-8 bg-white rounded-2xl shadow-2xl p-8 w-72">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                  <Star className="w-7 h-7 text-green-600" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">4.9/5</div>
                  <div className="text-sm text-gray-600">Patient Rating</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-2xl p-8 w-72">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-7 h-7 text-blue-600" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">24/7</div>
                  <div className="text-sm text-gray-600">Support Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <div className="text-blue-600">
                  {feature.icon}
                </div>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Leadership Team */}
        <div className="text-center mb-24">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Meet Our Leadership Team
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-16">
            Experienced medical professionals dedicated to providing exceptional healthcare services
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-36 h-36 mx-auto mb-6 rounded-full overflow-hidden border-4 border-blue-100">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h4>
                <p className="text-blue-600 font-medium mb-1">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.specialty}</p>
                <div className="flex justify-center space-x-1 mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-20">
          <div className="grid md:grid-cols-2">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-12 text-white">
              <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
              <p className="text-lg leading-relaxed text-blue-100">
                To make quality healthcare accessible and affordable for everyone through 
                innovative technology and compassionate care. We strive to bridge the gap 
                between patients and healthcare providers.
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-12 text-white">
              <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
              <p className="text-lg leading-relaxed text-gray-300">
                To create a world where everyone has instant access to quality healthcare 
                services, regardless of their location or background, through a seamless 
                digital healthcare ecosystem.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">
            Ready to Experience Better Healthcare?
          </h3>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <CTAButton variant="primary" size="lg">
              Book Your First Appointment
            </CTAButton>
            <CTAButton variant="outline" size="lg" className="border-blue-600 text-blue-600">
              Contact Our Team
            </CTAButton>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;