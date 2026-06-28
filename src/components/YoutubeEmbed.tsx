import { useState } from 'react';
import { Play } from 'lucide-react';

export function YoutubeEmbed({ videoId, title }: { videoId: string, title?: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-gray-100 group">
      {!isLoaded ? (
        <button 
          onClick={() => setIsLoaded(true)}
          className="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer"
          aria-label={`Play ${title || 'Video'}`}
        >
          <img 
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
            alt={title || "YouTube video thumbnail"}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
          <div className="relative z-10 w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-xl transform transition-transform duration-300 group-hover:scale-110 group-hover:bg-emerald-500">
            <Play className="w-8 h-8 ml-1" fill="currentColor" />
          </div>
        </button>
      ) : (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title || "YouTube video player"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}
