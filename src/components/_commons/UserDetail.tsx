interface UserDetailProps {
  username: string;
  userAvatarSrc?: string;
  userTitle: string;
  className?: string;
}

export default function UserDetail({
  username,
  userAvatarSrc,
  userTitle,
  className,
}: UserDetailProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {userAvatarSrc ? (
        <img
          src={userAvatarSrc}
          alt={`${username}'s avatar`}
          className="w-10 rounded-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/32x32/D1D5DB/4B5563?text=U";
            e.currentTarget.alt = "Lecturer avatar";
          }}
        />
      ) : (
        // Placeholder SVG if no image is provided
        <img src="/user-thumb.png" className="w-10 rounded-full object-cover" />
      )}
      <div>
        <p className="text-sm font-medium text-slate-700">{username}</p>
        <p className="text-xs text-slate-500">{userTitle}</p>
      </div>
    </div>
  );
}
