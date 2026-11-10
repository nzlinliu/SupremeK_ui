import React from 'react';
import { HOME_DESIGN_PROJECTS, HOME_SERVICES, SiteRoute } from './siteData';
import {
  BTN_WHITE,
  BTN_YELLOW,
  ConsultationSection,
  PartnerLogosStrip,
  QualityLivingBanner,
  ThreeCollectionCards,
} from './SharedSections';

interface HomePageProps {
  onNavigate: (route: SiteRoute) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#23262d] text-white">
      {/* 1. Hero Slider Banner */}
      <section className="relative w-full overflow-hidden bg-[#1a1c22]">
        <img
          src="/site-assets/hero-home.png"
          alt="Supreme Kitchen Hero"
          referrerPolicy="no-referrer"
          className="w-full max-h-[600px] min-h-[300px] object-cover mx-auto"
        />
        <div className="absolute inset-0 bg-black/35" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="max-w-4xl mx-auto space-y-4">
            <h1
              className="text-2xl sm:text-4xl lg:text-[2.65rem] font-semibold text-white leading-tight drop-shadow-sm"
              style={{ textWrap: 'balance' }}
            >
              Supreme Craftsmanship, Supreme Comfort, Supreme Kitchens
            </h1>
            <h3 className="hidden md:block text-lg lg:text-2xl font-normal text-white/95 drop-shadow-sm">
              Proudly Kiwi Made, with Excellence in Every Detail
            </h3>
            <div className="pt-3">
              <button
                type="button"
                onClick={() => onNavigate({ page: 'contact' })}
                className={BTN_YELLOW}
              >
                Book a Consultation
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Indicator Bar (matching Bootstrap active indicator) */}
        <div className="absolute bottom-4 inset-x-0 flex justify-center">
          <span className="w-8 h-1 bg-white rounded-xs opacity-90" />
        </div>
      </section>

      {/* 2. Home About Us Intro */}
      <section className="py-16">
        <div className="max-w-[1140px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-6 space-y-2">
              <p className="text-sm sm:text-base tracking-wide text-white/90 mb-3">ABOUT US</p>
              <h2 className="text-2xl sm:text-[2rem] font-medium leading-tight">
                New Zealand’s <span className="text-[#dba14d]">Preferred</span>
              </h2>
              <h2 className="text-2xl sm:text-[2rem] font-medium leading-tight">
                Kitchen <span className="text-[#dba14d]">Design &amp;</span>
              </h2>
              <h2 className="text-2xl sm:text-[2rem] font-medium leading-tight">
                <span className="text-[#dba14d]">Installation</span> Service
              </h2>
            </div>

            <div className="md:col-span-6 space-y-6 pt-2 md:pt-6">
              <p className="text-base text-white/90 leading-relaxed">
                At Supreme Kitchen, we bring expertise and precision to every project, crafting
                kitchens that align with your lifestyle and vision. Our New Zealand-based team is
                dedicated to quality and exceptional value, providing a seamless experience from
                design through to installation.
              </p>
              <div>
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'about' })}
                  className={BTN_WHITE}
                >
                  About Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Three Collection Cards (Kitchen / Wardrobe / Vanity) */}
      <section className="pb-16">
        <div className="max-w-[1140px] mx-auto px-4">
          <ThreeCollectionCards onNavigate={onNavigate} showReadMore={true} />
        </div>
      </section>

      {/* 4. OUR SERVICE — From Vision to Completion */}
      <section className="py-16">
        <div className="max-w-[1140px] mx-auto px-4">
          <div className="max-w-3xl space-y-3 mb-12">
            <h5 className="text-base sm:text-lg font-medium text-[#dba14d]">OUR SERVICE</h5>
            <h2 className="text-2xl sm:text-[2rem] font-medium text-white">
              From Vision to Completion
            </h2>
            <p className="text-base text-white/90 leading-relaxed">
              Our streamlined process combines expert planning, personalized design, and precise
              execution, ensuring a seamless journey from concept to completion.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOME_SERVICES.map((svc) => (
              <div key={svc.title} className="text-center space-y-4">
                <div className="h-20 flex items-center justify-center">
                  <img
                    src={svc.icon}
                    alt={svc.title}
                    referrerPolicy="no-referrer"
                    className="mx-auto max-h-16 w-auto object-contain"
                  />
                </div>
                <h5 className="text-lg font-bold text-white pt-1">{svc.title}</h5>
                <div className="text-sm sm:text-base text-white/85 leading-relaxed">
                  {svc.lines.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. OUR VALUED PARTNERS Banner + White Partner Strip */}
      <section className="relative w-full overflow-hidden">
        <img
          src="/site-assets/partners-bg.png"
          alt="Our Valued Partners"
          referrerPolicy="no-referrer"
          className="w-full min-h-[220px] max-h-[420px] object-cover"
        />
        <div className="absolute inset-0 bg-black/35 flex items-center">
          <div className="max-w-[1140px] w-full mx-auto px-4">
            <h5 className="text-base sm:text-lg font-medium text-[#dba14d] mb-2">
              OUR VALUED PARTNERS
            </h5>
            <h2 className="text-2xl sm:text-4xl font-medium text-white max-w-2xl leading-snug">
              Trusted by Industry Leaders in Quality and Innovation
            </h2>
          </div>
        </div>
      </section>

      <PartnerLogosStrip />

      {/* 6. DESIGN PROJECTS — Inspired Spaces, Thoughtfully Crafted */}
      <section className="py-16">
        <div className="max-w-[1140px] mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <p className="text-sm sm:text-base tracking-wide text-white/90">DESIGN PROJECTS</p>
            <h2 className="text-2xl sm:text-[2rem] font-medium text-white">
              Inspired Spaces, Thoughtfully Crafted
            </h2>
            <p className="text-base text-white/85 leading-relaxed">
              With exceptional craftsmanship and attention to detail, our projects bring unique
              style and functionality to every space.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {HOME_DESIGN_PROJECTS.map((proj, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onNavigate({ page: 'project', projectId: proj.id })}
                className="overflow-hidden block w-full group cursor-pointer bg-[#1a1c22] focus:outline-none"
              >
                <img
                  src={proj.image}
                  alt={proj.label}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </button>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => onNavigate({ page: 'collection', category: 'kitchen' })}
              className={BTN_WHITE}
            >
              Show More
            </button>
          </div>
        </div>
      </section>

      {/* 7. Quality Living Banner */}
      <QualityLivingBanner bgClass="bg-[#42444a]" />

      {/* 8. Book a Consultation Section */}
      <ConsultationSection />
    </div>
  );
};
