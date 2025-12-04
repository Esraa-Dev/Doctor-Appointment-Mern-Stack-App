import { Bell } from "lucide-react";

const NotificationBtn = () => {
  return (
    <button
      onClick={() => console.log("Notifications clicked")}
      className="relative border border-primaryBorder transition-all rounded-full p-2 hover:bg-gray-100"
      aria-label="Notification"
    >
      <Bell size={20} className="text-textPrimary" />
      <span className="absolute -top-1 -left-1 w-3 h-3 bg-primary rounded-full border-2 border-white"></span>
    </button>
  );
};

export default NotificationBtn;
