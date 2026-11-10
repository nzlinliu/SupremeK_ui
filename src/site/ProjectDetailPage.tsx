import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ALL_PROJECTS, SiteRoute } from './siteData';
import { ConsultationSection } from './SharedSections';

interface ProjectDetailPageProps {
  projectId: string;
  onNavigate: (route: SiteRoute) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  projectId,
  onNavigate,
}) => {
  const project =
    ALL_PROJECTS.find((p) => p.id === projectId) || ALL_PROJECTS[0];

  const collectionName =
    project.category === 'kitchen'
      ? 'Kitchen Collection'
      : project.category === 'wardrobe'
      ? 'Wardrobe Collection'
      : 'Vanity Collection';

  return (
    <div className="bg-[#23262d] text-white">
      {/* Top Banner */}
      <section className="relative w-full overflow-hidden max-h-[500px]">
        <img
          src="/site-assets/about-banner.png"
          alt="Tailored Designs for Every Style"
          referrerPolicy="no-referrer"
          className="w-full h-[260px] md:h-[460px] object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-2xl sm:text-4xl font-semibold text-white">
            Tailored Designs for Every Style
          </h2>
          <p className="mt-2 text-sm sm:text-lg text-white/90">
            Kitchen, Wardrobe, and Vanity Solutions to Match Your Vision
          </p>
        </div>
      </section>

      {/* Main Project Content */}
      <section className="py-12">
        <div className="max-w-[1140px] mx-auto px-4 space-y-10">
          <div>
            <button
              type="button"
              onClick={() => onNavigate({ page: 'collection', category: project.category })}
              className="inline-flex items-center gap-2 text-sm text-[#dba14d] hover:underline cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to {collectionName}</span>
            </button>
          </div>

          {/* Primary Showcase Image */}
          <div>
            <img
              src={project.image}
              alt={`${collectionName} ${project.title}`}
              referrerPolicy="no-referrer"
              className="w-full max-h-[680px] object-cover rounded-xs"
            />
          </div>

          {/* Built With A Minimalist / Classical / Luxurious */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center py-4">
            <div className="sm:col-span-4 text-center">
              <h2 className="text-2xl sm:text-3xl font-medium leading-snug">
                Built With A
                <br />
                <span className="text-[#dba14d]">{project.style}</span>
              </h2>
              <p className="mt-2 text-white/80">{project.projectCode}</p>
            </div>
            <div className="sm:col-span-8 text-white/80 text-base leading-relaxed">
              Crafted in Auckland with meticulous joinery tolerances, moisture-resistant cabinetry
              substrates, and premium European hardware tailored to everyday New Zealand living.
            </div>
          </div>

          {/* Detail Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {project.gallery.map((imgUrl, idx) => (
              <div key={idx} className="overflow-hidden aspect-[4/3] bg-[#181a1f]">
                <img
                  src={imgUrl}
                  alt={`${project.title} view ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <ConsultationSection />
    </div>
  );
};
