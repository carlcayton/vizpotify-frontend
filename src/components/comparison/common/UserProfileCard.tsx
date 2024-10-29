import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserCircle } from 'lucide-react';

interface ProfileData {
  spotifyId: string;
  displayName: string;
  imageUrl?: string;
  followers?: number;
  following?: number;
}

const UserProfileCard = ({ profile }: { profile: ProfileData }) => (
  <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 transition-all duration-300 hover:bg-gray-800 hover:shadow-lg">
    <CardContent className="flex items-center gap-6 p-6">
      <Avatar className="transform transition-transform hover:scale-105">
        <AvatarImage src={profile.imageUrl} alt={profile.displayName} />
        <AvatarFallback>
          <UserCircle className="w-20 h-20 text-gray-400" />
        </AvatarFallback>
      </Avatar>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-white">{profile.displayName}</h3>
        <div className="flex gap-4 text-sm text-gray-400">
          {profile.followers && (
            <div>
              <span className="font-bold text-white">{profile.followers}</span> Followers
            </div>
          )}
          {profile.following && (
            <div>
              <span className="font-bold text-white">{profile.following}</span> Following
            </div>
          )}
        </div>
      </div>
    </CardContent>
  </Card>
);

export default UserProfileCard;