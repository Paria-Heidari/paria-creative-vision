import type { Photo } from '@/types/photo.types';
import PhotoCard from './PhotoCard';

interface PhotoGridProps {
  photos: Photo[];
  onDelete?: (id: string) => void;
}

export default function PhotoGrid({ photos, onDelete }: PhotoGridProps) {
  if (photos?.length === 0) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-dashed border-slate-200">
        <p className="font-inter text-[13px] text-slate-400">No photos yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {photos?.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} onDelete={onDelete} />
      ))}
    </div>
  );
}