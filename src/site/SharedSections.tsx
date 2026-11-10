import React, { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { COLLECTION_CARDS, PARTNER_LOGOS, SITE_CONTACT, SiteRoute } from './siteData';

// Exact button helper classes matching rewriteBootstrap.css
export const BTN_YELLOW =
  'inline-block rounded-[25px] bg-[#dba14d] text-[#23262d] px-[25px] py-[7px] text-sm sm:text-base font-medium border border-[#dba14d] hover:bg-[#23262d] hover:text-white hover:border-white transition-colors duration-200 cursor-pointer whitespace-nowrap';

export const BTN_WHITE =
  'inline-block rounded-[25px] text-white border border-white px-[25px] py-[7px] text-sm sm:text-base font-normal hover:bg-[#dba14d] hover:text-[#23262d] hover:border-[#dba14d] transition-colors duration-200 cursor-pointer whitespace-nowrap';

export const PartnerLogosStrip: React.FC = () => {
  return (
    <section className="bg-white py-6">
      <div className="max-w-[1140px] mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 min-h-[130px] items-center">
          {PARTNER_LOGOS.map((logo) => (
            <div key={logo.src} className="flex items-center justify-center p-2">
              <img
                src={logo.src}
                alt={logo.alt}
                referrerPolicy="no-referrer"
                className="max-h-20 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const QualityLivingBanner: React.FC<{ bgClass?: string }> = ({
  bgClass = 'bg-[#42444a]',
}) => {
  return (
    <section className={`${bgClass} text-white py-12`}>
      <div className="max-w-[1140px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6">
            <h2 className="text-2xl sm:text-[2rem] font-medium leading-snug text-white">
              Designed with Precision, Made for Quality Living
            </h2>
          </div>
          <div className="md:col-span-6 grid grid-cols-3 gap-6 items-center">
            <img
              src="/site-assets/badge-best-choice.png"
              alt="Best Choice"
              referrerPolicy="no-referrer"
              className="w-full max-w-[140px] mx-auto object-contain"
            />
            <img
              src="/site-assets/badge-premium.png"
              alt="Premium Quality"
              referrerPolicy="no-referrer"
              className="w-full max-w-[140px] mx-auto object-contain"
            />
            <img
              src="/site-assets/badge-kiwi-made.png"
              alt="Kiwi Made"
              referrerPolicy="no-referrer"
              className="w-full max-w-[140px] mx-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export const ThreeCollectionCards: React.FC<{
  onNavigate: (route: SiteRoute) => void;
  showReadMore?: boolean;
}> = ({ onNavigate, showReadMore = true }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {COLLECTION_CARDS.map((col) => (
        <div
          key={col.category}
          onClick={() => onNavigate({ page: 'collection', category: col.category })}
          className="relative overflow-hidden group cursor-pointer bg-[#1a1c22]"
        >
          <img
            src={col.image}
            alt={`${col.line1} ${col.line2}`}
            referrerPolicy="no-referrer"
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/55 pointer-events-none" />
          <div className="absolute top-0 left-0 p-6 text-white">
            <h3 className="text-2xl sm:text-[1.75rem] font-medium leading-tight">{col.line1}</h3>
            <h3 className="text-2xl sm:text-[1.75rem] font-medium leading-tight">{col.line2}</h3>
          </div>
          {showReadMore && (
            <div className="absolute bottom-0 left-0 p-6">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate({ page: 'collection', category: col.category });
                }}
                className={BTN_WHITE}
              >
                Read More
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export const ConsultationSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!name.trim() || (!phone.trim() && !email.trim())) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
  };

  return (
    <section className="bg-[#23262d] text-white py-[50px] border-t border-white/10">
      <div className="max-w-[1140px] mx-auto px-4">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-6 space-y-2">
              <h2 className="text-2xl sm:text-[2rem] font-medium text-white mb-5">
                Start Your Journey with Us
              </h2>
              <p className="text-base text-white/90">Book your free consultation today!</p>
              <p className="text-base text-white/90 pt-1">
                Call us at{' '}
                <a href={SITE_CONTACT.phoneHref} className="text-[#dba14d] hover:underline">
                  {SITE_CONTACT.phoneShort}
                </a>{' '}
                <span className="text-[#dba14d]">or email us at</span>
              </p>
              <p className="text-base text-white/90">
                <a
                  href={`mailto:${SITE_CONTACT.email}`}
                  className="text-[#dba14d] hover:underline"
                >
                  {SITE_CONTACT.email}
                </a>{' '}
                to start
              </p>
              <p className="text-base text-white/90">planning your dream home.</p>
            </div>

            <div className="md:col-span-6 space-y-4">
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (status !== 'idle') setStatus('idle');
                  }}
                  placeholder="Name"
                  className="w-full rounded-md bg-white px-3.5 py-2 text-[#23262d] placeholder:text-slate-400 text-base focus:outline-none focus:ring-2 focus:ring-[#dba14d]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (status !== 'idle') setStatus('idle');
                  }}
                  placeholder="Phone"
                  className="w-full rounded-md bg-white px-3.5 py-2 text-[#23262d] placeholder:text-slate-400 text-base focus:outline-none focus:ring-2 focus:ring-[#dba14d]"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== 'idle') setStatus('idle');
                  }}
                  placeholder="Email"
                  className="w-full rounded-md bg-white px-3.5 py-2 text-[#23262d] placeholder:text-slate-400 text-base focus:outline-none focus:ring-2 focus:ring-[#dba14d]"
                />
              </div>

              <div>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Message"
                  className="w-full rounded-md bg-white px-3.5 py-2 text-[#23262d] placeholder:text-slate-400 text-base focus:outline-none focus:ring-2 focus:ring-[#dba14d]"
                />
              </div>

              {status === 'success' && (
                <div className="rounded-md bg-emerald-100 border border-emerald-300 px-4 py-2.5 text-sm text-emerald-900">
                  Send Success. Our team will get back to you shortly.
                </div>
              )}
              {status === 'error' && (
                <div className="rounded-md bg-amber-100 border border-amber-300 px-4 py-2.5 text-sm text-amber-900">
                  Please enter your Name and Phone or Email to book a consultation.
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            <button type="submit" className={BTN_WHITE}>
              Book a Consultation
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export const SiteFooter: React.FC<{
  onNavigate: (route: SiteRoute) => void;
  onOpenTraining?: () => void;
}> = ({ onNavigate, onOpenTraining }) => {
  return (
    <footer className="bg-white text-[#23262d] py-[50px]">
      <div className="max-w-[1140px] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8">
          <div className="md:col-span-3">
            <button
              type="button"
              onClick={() => onNavigate({ page: 'home' })}
              className="cursor-pointer text-left"
            >
              <img
                src="/site-assets/footer-logo.png"
                alt="Supreme Kitchen"
                referrerPolicy="no-referrer"
                className="max-w-full h-auto max-h-20 object-contain"
              />
            </button>
          </div>

          <div className="md:col-span-3 space-y-2.5">
            <h5 className="text-lg font-medium text-[#23262d] mb-3">Projects</h5>
            <p>
              <button
                type="button"
                onClick={() => onNavigate({ page: 'collection', category: 'kitchen' })}
                className="text-[#23262d] hover:text-[#dba14d] transition-colors cursor-pointer"
              >
                Kitchen Collection
              </button>
            </p>
            <p>
              <button
                type="button"
                onClick={() => onNavigate({ page: 'collection', category: 'wardrobe' })}
                className="text-[#23262d] hover:text-[#dba14d] transition-colors cursor-pointer"
              >
                Wardrobe Collection
              </button>
            </p>
            <p>
              <button
                type="button"
                onClick={() => onNavigate({ page: 'collection', category: 'vanity' })}
                className="text-[#23262d] hover:text-[#dba14d] transition-colors cursor-pointer"
              >
                Vanity Collection
              </button>
            </p>
          </div>

          <div className="md:col-span-3 space-y-2.5">
            <h5 className="text-lg font-medium text-[#23262d] mb-3">Service</h5>
            <p>
              <button
                type="button"
                onClick={() => onNavigate({ page: 'about' })}
                className="text-[#23262d] hover:text-[#dba14d] transition-colors cursor-pointer"
              >
                About Us
              </button>
            </p>
            <p>
              <button
                type="button"
                onClick={() => onNavigate({ page: 'contact' })}
                className="text-[#23262d] hover:text-[#dba14d] transition-colors cursor-pointer"
              >
                Contact Us
              </button>
            </p>
            {onOpenTraining && (
              <p>
                <button
                  type="button"
                  onClick={onOpenTraining}
                  className="text-slate-500 hover:text-[#dba14d] text-sm transition-colors cursor-pointer"
                >
                  Staff IT Training Deck
                </button>
              </p>
            )}
          </div>

          <div className="md:col-span-3 space-y-3">
            <h5 className="text-lg font-medium text-[#23262d] mb-3">Informations</h5>
            <p className="flex items-center gap-2 text-sm sm:text-base">
              <Phone className="w-4 h-4 text-[#dba14d] shrink-0" />
              <a href={SITE_CONTACT.phoneHref} className="hover:text-[#dba14d] transition-colors">
                {SITE_CONTACT.phoneDisplay}
              </a>
            </p>
            <p className="flex items-center gap-2 text-sm sm:text-base">
              <Mail className="w-4 h-4 text-[#dba14d] shrink-0" />
              <a
                href={`mailto:${SITE_CONTACT.email}`}
                className="hover:text-[#dba14d] transition-colors break-all"
              >
                {SITE_CONTACT.email}
              </a>
            </p>
            <p className="flex items-start gap-2 text-sm sm:text-base">
              <MapPin className="w-4 h-4 text-[#dba14d] shrink-0 mt-1" />
              <span>{SITE_CONTACT.address}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
