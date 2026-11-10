import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import { SiteRoute } from './siteData';

interface SiteNavbarProps {
  route: SiteRoute;
  onNavigate: (route: SiteRoute) => void;
}

export const SiteNavbar: React.FC<SiteNavbarProps> = ({ route, onNavigate }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleGo = (next: SiteRoute) => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    onNavigate(next);
  };

  return (
    <header className="bg-[#23262d] sticky top-0 z-40 border-b border-white/5">
      <nav className="max-w-[1140px] mx-auto px-4 py-3 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Logo */}
        <button
          type="button"
          onClick={() => handleGo({ page: 'home' })}
          className="shrink-0 cursor-pointer focus:outline-none"
        >
          <img
            src="/site-assets/logo.png"
            alt="Supreme Kitchen"
            referrerPolicy="no-referrer"
            className="max-h-[50px] w-auto object-contain"
          />
        </button>

        {/* Zone 2 & 3: Desktop Navigation Links + Call Now CTA */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-7 text-base font-normal text-white">
            <li>
              <button
                type="button"
                onClick={() => handleGo({ page: 'home' })}
                className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer hover:text-[#dba14d] ${
                  route.page === 'home' ? 'text-[#dba14d]' : 'text-white'
                }`}
              >
                Home
              </button>
            </li>

            {/* Projects Dropdown */}
            <li
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setDropdownOpen((o) => !o)}
                className={`inline-flex items-center gap-1.5 py-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer hover:text-[#dba14d] ${
                  route.page === 'collection' || route.page === 'project'
                    ? 'text-[#dba14d]'
                    : 'text-white'
                }`}
              >
                <span>Projects</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {dropdownOpen && (
                <ul className="absolute left-0 top-full w-52 bg-white text-[#23262d] rounded-md shadow-lg py-1.5 border border-slate-200 z-50">
                  <li>
                    <button
                      type="button"
                      onClick={() => handleGo({ page: 'collection', category: 'kitchen' })}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100 hover:text-[#dba14d] transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Kitchen Collection
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => handleGo({ page: 'collection', category: 'wardrobe' })}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100 hover:text-[#dba14d] transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Wardrobe Collection
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => handleGo({ page: 'collection', category: 'vanity' })}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100 hover:text-[#dba14d] transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Vanity Collection
                    </button>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <button
                type="button"
                onClick={() => handleGo({ page: 'about' })}
                className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer hover:text-[#dba14d] ${
                  route.page === 'about' ? 'text-[#dba14d]' : 'text-white'
                }`}
              >
                About Us
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() => handleGo({ page: 'contact' })}
                className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer hover:text-[#dba14d] ${
                  route.page === 'contact' ? 'text-[#dba14d]' : 'text-white'
                }`}
              >
                Contact Us
              </button>
            </li>
          </ul>

          <button
            type="button"
            onClick={() => handleGo({ page: 'contact', scrollToLine: true })}
            className="group inline-flex items-center gap-2 rounded-[25px] border border-white px-[25px] py-[7px] text-white hover:bg-[#dba14d] hover:border-[#dba14d] hover:text-[#23262d] transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Phone className="w-4 h-4 text-[#dba14d] group-hover:text-white fill-current transition-colors" />
            <span>Call Now</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((m) => !m)}
          aria-label="Toggle navigation"
          className="lg:hidden p-2 rounded bg-white text-[#23262d] cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Collapsible Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#23262d] border-t border-white/10 px-4 py-4 space-y-3 text-white">
          <button
            type="button"
            onClick={() => handleGo({ page: 'home' })}
            className="block w-full text-left py-1.5 hover:text-[#dba14d] cursor-pointer"
          >
            Home
          </button>
          <div className="space-y-1.5 pl-3 border-l border-white/15">
            <p className="text-xs text-[#dba14d] font-medium">Projects</p>
            <button
              type="button"
              onClick={() => handleGo({ page: 'collection', category: 'kitchen' })}
              className="block w-full text-left py-1 text-sm hover:text-[#dba14d] cursor-pointer"
            >
              Kitchen Collection
            </button>
            <button
              type="button"
              onClick={() => handleGo({ page: 'collection', category: 'wardrobe' })}
              className="block w-full text-left py-1 text-sm hover:text-[#dba14d] cursor-pointer"
            >
              Wardrobe Collection
            </button>
            <button
              type="button"
              onClick={() => handleGo({ page: 'collection', category: 'vanity' })}
              className="block w-full text-left py-1 text-sm hover:text-[#dba14d] cursor-pointer"
            >
              Vanity Collection
            </button>
          </div>
          <button
            type="button"
            onClick={() => handleGo({ page: 'about' })}
            className="block w-full text-left py-1.5 hover:text-[#dba14d] cursor-pointer"
          >
            About Us
          </button>
          <button
            type="button"
            onClick={() => handleGo({ page: 'contact' })}
            className="block w-full text-left py-1.5 hover:text-[#dba14d] cursor-pointer"
          >
            Contact Us
          </button>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleGo({ page: 'contact', scrollToLine: true })}
              className="inline-flex items-center gap-2 rounded-[25px] border border-white px-[25px] py-[7px] text-white hover:bg-[#dba14d] hover:border-[#dba14d] hover:text-[#23262d] transition-colors cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#dba14d]" />
              <span>Call Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
