import type { ProfileHeaderProps } from "../../../types/types";
import { formatYear } from "../../../utils/formatYear";

export const ProfileHeader = ({
  firstName,
  lastName,
  image,
  createdAt,
}: ProfileHeaderProps) => {
  return (
      <div className="bg-linear-to-br from-primary to-secondary rounded-xl border border-primaryBorder p-6 mb-4">
        <div className="text-center mb-6">
          {image ? (
            <img
              src={image}
              alt={firstName}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
          ) : (
            <div className="w-24 h-24 bg-white/90 rounded-full flex items-center justify-center text-primary text-3xl font-bold mx-auto mb-4">
              {firstName.charAt(0)}
            </div>
          )}

          <h2 className="text-xl font-bold text-white">
            {firstName + " " + lastName}
          </h2>

          <p className="text-white text-sm">
            عضو منذ {formatYear(createdAt)}{" "}
          </p>
        </div>
      </div>
    
  );
};
