import React, { useState } from 'react';
import { Monitor } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  caption?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  caption,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-slate-100 border border-slate-200 text-slate-600 p-6 text-center ${className}`}
      >
        <Monitor className="w-8 h-8 text-slate-400 mb-2" />
        <p className="text-xs font-semibold text-slate-700">{alt}</p>
        {caption && <p className="text-xs text-slate-500 mt-1">{caption}</p>}
      </div>
    );
  }

  return (
    <figure className="relative w-full h-full overflow-hidden bg-slate-100">
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover ${className}`}
      />
      {caption && (
        <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/80 via-slate-950/45 to-transparent px-4 py-2.5 text-xs text-slate-100">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
