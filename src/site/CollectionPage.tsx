import React, { useEffect, useMemo, useState } from 'react';
import { ALL_PROJECTS, DesignStyle, SiteRoute } from './siteData';
import { ConsultationSection, ThreeCollectionCards } from './SharedSections';

interface CollectionPageProps {
  category: 'kitchen' | 'wardrobe' | 'vanity';
  onNavigate: (route: SiteRoute) => void;
}

const STYLES: DesignStyle[] = ['Minimalist', 'Classical', 'Luxurious'];

export const CollectionPage: React.FC<CollectionPageProps> = ({ category, onNavigate }) => {
  // Match original site highlight default per collection while also allowing interactive filtering
  const defaultHighlight: DesignStyle =
    category === 'kitchen' ? 'Minimalist' : category === 'wardrobe' ? 'Classical' : 'Luxurious';

  const [selectedStyle, setSelectedStyle] = useState<DesignStyle | 'ALL'>('ALL');

  useEffect(() => {
    setSelectedStyle('ALL');
  }, [category]);

  const projects = useMemo(() => {
    const byCat = ALL_PROJECTS.filter((p) => p.category === category);
    if (selectedStyle === 'ALL') return byCat;
    return byCat.filter((p) => p.style === selectedStyle);
  }, [category, selectedStyle]);

  return (
    <div className="bg-[#23262d] text-white">
      {/* Top Banner */}
      <section className="relative w-full overflow-hidden">
        <img
          src="/site-assets/partners-bg.png"
          alt="Tailored Designs for Every Style"
          referrerPolicy="no-referrer"
          className="w-full min-h-[250px] max-h-[460px] object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-2xl sm:text-4xl font-semibold text-white">
            Tailored Designs for Every Style
          </h1>
          <p className="mt-2 text-sm sm:text-lg text-white/90">
            Kitchen, Wardrobe, and Vanity Solutions to Match Your Vision
          </p>
        </div>
      </section>

      {/* Collection Intro Text */}
      <section className="py-10">
        <div className="max-w-[1140px] mx-auto px-4 text-center space-y-1">
          <h4 className="text-lg sm:text-2xl font-normal text-white leading-relaxed">
            Explore our curated collections across three distinctive styles—Minimalist, Luxurious,
          </h4>
          <h4 className="text-lg sm:text-2xl font-normal text-white leading-relaxed">
            and Classical—crafted to elevate every space with elegance and functionality.
          </h4>
        </div>
      </section>

      {/* Three Collection Switcher Cards */}
      <section className="pb-6">
        <div className="max-w-[1140px] mx-auto px-4">
          <ThreeCollectionCards onNavigate={onNavigate} showReadMore={false} />
        </div>
      </section>

      {/* Three Style Tabs (Minimalist / Classical / Luxurious) */}
      <section className="pb-10">
        <div className="max-w-[1140px] mx-auto px-4">
          <div className="grid grid-cols-3">
            {STYLES.map((st) => {
              const isHighlighted =
                selectedStyle === 'ALL' ? st === defaultHighlight : selectedStyle === st;
              return (
                <button
                  key={st}
                  type="button"
                  onClick={() =>
                    setSelectedStyle((curr) => (curr === st ? 'ALL' : st))
                  }
                  className={`py-4 text-center transition-colors cursor-pointer ${
                    isHighlighted
                      ? 'border-t-4 border-[#dba14d] text-[#dba14d] font-medium'
                      : 'border-t-2 border-neutral-500 text-white hover:text-[#dba14d]'
                  }`}
                >
                  <span className="text-base sm:text-xl">{st}</span>
                </button>
              );
            })}
          </div>
          {selectedStyle !== 'ALL' && (
            <div className="text-right mt-2">
              <button
                type="button"
                onClick={() => setSelectedStyle('ALL')}
                className="text-xs text-[#dba14d] hover:underline cursor-pointer"
              >
                Show all {category} projects
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Project Article Cards Grid */}
      <section className="pb-16">
        <div className="max-w-[1140px] mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => onNavigate({ page: 'project', projectId: proj.id })}
                className="bg-[#212529] border border-white/10 rounded-md overflow-hidden group cursor-pointer"
              >
                <div className="overflow-hidden aspect-[4/3] bg-[#181a1f]">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-105"
                  />
                </div>
                <div className="p-4 text-white flex items-center justify-between">
                  <h5 className="text-lg font-medium group-hover:text-[#dba14d] transition-colors">
                    {proj.title}
                  </h5>
                  <span className="text-xs text-white/55">{proj.style}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Form */}
      <ConsultationSection />
    </div>
  );
};
