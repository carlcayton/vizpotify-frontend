import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { ArtistDto, TrackDto } from '@/services/comparisonService';

type CommonItemType = 'artist' | 'track';

interface CommonItemsGridProps {
  items: (ArtistDto | TrackDto)[];
  type: CommonItemType;
  emptyMessage: string;
}

const CommonItemsGrid = ({ items, type, emptyMessage }: CommonItemsGridProps) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {items.length === 0 ? (
      <div className="col-span-full text-center text-gray-400 py-8">
        {emptyMessage}
      </div>
    ) : (
      items.map((item) => (
        <Card 
          key={item.id} 
          className="bg-gray-700 border-gray-600 hover:bg-gray-600 transition-colors overflow-hidden"
        >
          <div className="relative w-full pt-[100%]">
            <Image
              src={item.imageUrl || item.albumImageUrl || '/placeholder.png'}
              alt={item.name}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          </div>
          <CardContent className="p-4">
            <h3 className="font-medium text-white truncate">{item.name}</h3>
            {type === 'track' && (
              <p className="text-sm text-gray-400 truncate">
                {(item as TrackDto).artists.join(', ')}
              </p>
            )}
          </CardContent>
        </Card>
      ))
    )}
  </div>
);

export default CommonItemsGrid;