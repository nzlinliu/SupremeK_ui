import React, { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { SITE_CONTACT } from './siteData';
import { BTN_WHITE, QualityLivingBanner } from './SharedSections';

interface ContactPageProps {
  scrollToLine?: boolean;
}

export const ContactPage: React.FC<ContactPageProps> = ({ scrollToLine }) => {
  const lineRef = useRef<HTMLDivElement | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (scrollToLine && lineRef.current) {
      lineRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [scrollToLine]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || (!phone.trim() && !email.trim())) {
      setSubmitted('error');
      return;
    }
    setSubmitted('success');
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="bg-[#23262d] text-white">
      {/* Top Banner */}
      <section className="relative w-full overflow-hidden">
        <img
          src="/site-assets/contact-banner.png"
          alt="Contact Us"
          referrerPolicy="no-referrer"
          className="w-full min-h-[250px] max-h-[460px] object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl sm:text-5xl font-semibold text-white">Contact Us</h1>
          <p className="mt-2 text-base sm:text-lg text-white/95">
            Let’s talk about your next project
          </p>
        </div>
      </section>

      {/* Keep in touch & Contact Info */}
      <section className="py-16">
        <div className="max-w-[1140px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-6 space-y-4">
              <h2 className="text-2xl sm:text-[2rem] font-medium text-white">Keep in touch</h2>
              <p className="text-base text-white/90 leading-relaxed max-w-lg">
                Whether you’re ready to start your next project or
                <br />
                simply have questions, our team is here to help. Reach out today
                <br />
                and let’s make your dream space a reality.
              </p>
            </div>

            <div className="md:col-span-5">
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (submitted !== 'idle') setSubmitted('idle');
                  }}
                  placeholder="Name"
                  className="w-full rounded-md bg-white px-3.5 py-2 text-[#23262d] placeholder:text-slate-400 text-base focus:outline-none focus:ring-2 focus:ring-[#dba14d]"
                />
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (submitted !== 'idle') setSubmitted('idle');
                  }}
                  placeholder="Phone"
                  className="w-full rounded-md bg-white px-3.5 py-2 text-[#23262d] placeholder:text-slate-400 text-base focus:outline-none focus:ring-2 focus:ring-[#dba14d]"
                />
                <input
                  type="email"
                  name="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (submitted !== 'idle') setSubmitted('idle');
                  }}
                  placeholder="Email"
                  className="w-full rounded-md bg-white px-3.5 py-2 text-[#23262d] placeholder:text-slate-400 text-base focus:outline-none focus:ring-2 focus:ring-[#dba14d]"
                />
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Message"
                  className="w-full rounded-md bg-white px-3.5 py-2 text-[#23262d] placeholder:text-slate-400 text-base focus:outline-none focus:ring-2 focus:ring-[#dba14d]"
                />

                {submitted === 'success' && (
                  <div className="rounded-md bg-emerald-100 border border-emerald-300 px-4 py-2 text-sm text-emerald-900">
                    Thank you for reaching out! Our team will contact you shortly.
                  </div>
                )}
                {submitted === 'error' && (
                  <div className="rounded-md bg-amber-100 border border-amber-300 px-4 py-2 text-sm text-amber-900">
                    Please provide your Name and Phone or Email.
                  </div>
                )}

                <div>
                  <button type="submit" className={BTN_WHITE}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Horizontal Divider (#line) */}
          <div ref={lineRef} id="line" className="border-t border-white my-10" />

          {/* 3 Contact Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center pt-2">
            <div className="space-y-2 flex flex-col items-center">
              <Mail className="w-12 h-12 text-[#dba14d] stroke-[1.5]" />
              <h5 className="text-xl font-medium text-white pt-1">Email Address</h5>
              <p className="text-white/90">
                <a href={`mailto:${SITE_CONTACT.email}`} className="hover:text-[#dba14d]">
                  {SITE_CONTACT.email}
                </a>
              </p>
            </div>

            <div className="space-y-2 flex flex-col items-center">
              <Phone className="w-12 h-12 text-[#dba14d] stroke-[1.5]" />
              <h5 className="text-xl font-medium text-white pt-1">Phone Number</h5>
              <p className="text-white/90">
                <a href={SITE_CONTACT.phoneHref} className="hover:text-[#dba14d]">
                  {SITE_CONTACT.phoneDisplay}
                </a>
              </p>
            </div>

            <div className="space-y-2 flex flex-col items-center">
              <MapPin className="w-12 h-12 text-[#dba14d] stroke-[1.5]" />
              <h5 className="text-xl font-medium text-white pt-1">Our Office</h5>
              <p className="text-white/90">{SITE_CONTACT.address}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Google Map */}
      <section className="w-full">
        <iframe
          title="Supreme Kitchen — 6 Highbrook Drive, East Tāmaki, Auckland"
          src={SITE_CONTACT.mapEmbedUrl}
          width="100%"
          height="450"
          className="border-0 block w-full"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      {/* Bottom Quality Living Badges on #23262d matching /contact-us */}
      <QualityLivingBanner bgClass="bg-[#23262d]" />
    </div>
  );
};
