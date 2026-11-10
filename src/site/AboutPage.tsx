import React from 'react';
import { WHY_CHOOSE_ITEMS } from './siteData';
import { ConsultationSection, PartnerLogosStrip } from './SharedSections';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#23262d] text-white">
      {/* Top Banner */}
      <section className="relative w-full overflow-hidden">
        <img
          src="/site-assets/about-banner.png"
          alt="About Us"
          referrerPolicy="no-referrer"
          className="w-full min-h-[250px] max-h-[460px] object-cover"
        />
        <div className="absolute inset-0 bg-black/35 flex items-center justify-center text-center px-4">
          <h1 className="text-3xl sm:text-5xl font-semibold text-white">About Us</h1>
        </div>
      </section>

      {/* Welcome to Supreme Kitchen Split Section */}
      <section className="py-16 bg-[#23262d]">
        <div className="max-w-[1140px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-6">
              <img
                src="/site-assets/about-feature.png"
                alt="Supreme Kitchen Craftsmanship"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="md:col-span-6 space-y-5">
              <p className="text-sm sm:text-base font-medium text-[#dba14d] tracking-wide">
                WELCOME TO SUPREME KITCHEN
              </p>

              <h3 className="text-2xl sm:text-[1.85rem] font-medium leading-snug text-white">
                New Zealand’s Preferred{' '}
                <span className="text-[#dba14d]">Kitchen Design &amp; Installation</span> Service
              </h3>

              <p className="text-base text-white/90 leading-relaxed pt-2">
                At Supreme Kitchen, we bring expertise and precision to every project, crafting
                kitchens that align with your lifestyle and vision. Our New Zealand-based team is
                dedicated to quality and exceptional value, providing a seamless experience from
                design through to installation.
              </p>

              <p className="text-base font-medium text-white pt-1">
                Designed with Precision, Made for Quality Living
              </p>

              <div className="grid grid-cols-3 gap-6 pt-4 items-center">
                <img
                  src="/site-assets/badge-premium.png"
                  alt="Premium"
                  referrerPolicy="no-referrer"
                  className="w-full max-w-[130px] object-contain"
                />
                <img
                  src="/site-assets/badge-best-choice.png"
                  alt="Best Choice"
                  referrerPolicy="no-referrer"
                  className="w-full max-w-[130px] object-contain"
                />
                <img
                  src="/site-assets/badge-kiwi-made.png"
                  alt="Kiwi Made"
                  referrerPolicy="no-referrer"
                  className="w-full max-w-[130px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US — The Supreme Difference */}
      <section className="py-16 bg-[#42444a] text-white">
        <div className="max-w-[1140px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <p className="text-sm sm:text-base font-medium text-[#dba14d] tracking-wide">
                WHY CHOOSE US
              </p>
              <h3 className="text-2xl sm:text-[2rem] font-medium text-white">
                The Supreme Difference
              </h3>
              <p className="text-base text-white/90 leading-relaxed">
                At Supreme Kitchen, we combine speed, precision, and thoughtful planning to create
                stunning, functional spaces tailored to your lifestyle.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {WHY_CHOOSE_ITEMS.map((item, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.icon}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-[72px] h-auto object-contain shrink-0"
                    />
                    <h5 className="text-lg font-medium text-white">{item.title}</h5>
                  </div>
                  <p className="text-sm sm:text-base text-white/85 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partner Logos Strip */}
      <PartnerLogosStrip />

      {/* Consultation Form */}
      <ConsultationSection />
    </div>
  );
};
