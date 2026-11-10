import React, { useCallback, useEffect, useState } from 'react';
import { AboutPage } from './site/AboutPage';
import { CollectionPage } from './site/CollectionPage';
import { ContactPage } from './site/ContactPage';
import { HomePage } from './site/HomePage';
import { ProjectDetailPage } from './site/ProjectDetailPage';
import { SiteFooter } from './site/SharedSections';
import { SiteRoute } from './site/siteData';
import { SiteNavbar } from './site/SiteNavbar';
import { TrainingDeckApp } from './TrainingDeckApp';

function parseLocationToRoute(pathname: string, hash: string): SiteRoute {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (clean === '/about-us') return { page: 'about' };
  if (clean === '/contact-us') {
    return { page: 'contact', scrollToLine: hash === '#line' };
  }
  if (clean === '/page/category/kitchen-collection') {
    return { page: 'collection', category: 'kitchen' };
  }
  if (clean === '/page/category/wardrobe-collection') {
    return { page: 'collection', category: 'wardrobe' };
  }
  if (clean === '/page/category/vanity-collection') {
    return { page: 'collection', category: 'vanity' };
  }
  if (clean.startsWith('/page/project/')) {
    return { page: 'project', projectId: clean.replace('/page/project/', '') };
  }
  return { page: 'home' };
}

function routeToPath(route: SiteRoute): string {
  switch (route.page) {
    case 'home':
      return '/';
    case 'about':
      return '/about-us';
    case 'contact':
      return route.scrollToLine ? '/contact-us#line' : '/contact-us';
    case 'collection':
      return `/page/category/${route.category}-collection`;
    case 'project':
      return `/page/project/${route.projectId}`;
  }
}

export default function App() {
  const [showTrainingPortal, setShowTrainingPortal] = useState(false);
  const [route, setRoute] = useState<SiteRoute>(() =>
    parseLocationToRoute(window.location.pathname, window.location.hash)
  );

  const handleNavigate = useCallback((next: SiteRoute) => {
    setRoute(next);
    const nextUrl = routeToPath(next);
    try {
      window.history.pushState({}, '', nextUrl);
    } catch {
      // Ignore history pushState restrictions in sandboxed frames
    }
    if (!(next.page === 'contact' && next.scrollToLine)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const onPopState = () => {
      setRoute(parseLocationToRoute(window.location.pathname, window.location.hash));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  if (showTrainingPortal) {
    return <TrainingDeckApp onBackToSite={() => setShowTrainingPortal(false)} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#23262d] text-white">
      <SiteNavbar route={route} onNavigate={handleNavigate} />

      <main className="flex-1">
        {route.page === 'home' && <HomePage onNavigate={handleNavigate} />}
        {route.page === 'collection' && (
          <CollectionPage category={route.category} onNavigate={handleNavigate} />
        )}
        {route.page === 'project' && (
          <ProjectDetailPage projectId={route.projectId} onNavigate={handleNavigate} />
        )}
        {route.page === 'about' && <AboutPage />}
        {route.page === 'contact' && <ContactPage scrollToLine={route.scrollToLine} />}
      </main>

      <SiteFooter
        onNavigate={handleNavigate}
        onOpenTraining={() => {
          setShowTrainingPortal(true);
          window.scrollTo({ top: 0 });
        }}
      />
    </div>
  );
}
