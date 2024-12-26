import React from 'react';
import Image from 'next/image';

// Tipo para las propiedades del componente
interface ProfileImageProps {
  imageUrl: string;
  fullName: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ imageUrl, fullName }) => {
  return (
    <div className="flex justify-center mb-4">
      <Image
        src={imageUrl}
        alt={fullName}
        width={96}
        height={96}
        className="rounded-full border-4 border-purple-600"
      />
    </div>
  );
};

export default ProfileImage;
