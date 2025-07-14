interface UserDetailProps {
  userName: string;
  userAvatarSrc?: string;
  userTitle: string;
}

export default function UserDetail({ userName, userAvatarSrc, userTitle }: UserDetailProps) {
  return (
    <div className="flex items-center gap-2.5">
      {userAvatarSrc ? (
        <img
          src={userAvatarSrc}
          alt={`${userName}'s avatar`}
          className="w-10 rounded-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/32x32/D1D5DB/4B5563?text=U";
            e.currentTarget.alt = "Lecturer avatar";
          }}
        />
      ) : (
        // Placeholder SVG if no image is provided
        <img src="/user-thumb.png" className="w-10 rounded-full object-cover"/>
      )}
      <div>
        <p className="text-sm font-medium text-gray-900">{userName}</p>
        <p className="text-xs text-gray-500">{userTitle}</p>
      </div>
    </div>
  );
}
