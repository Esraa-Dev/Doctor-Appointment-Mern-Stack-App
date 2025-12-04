import { Facebook, Instagram, Send } from "lucide-react";

export const FollowUs = () => {
  const socialLinks = [
    { icon: <Facebook className="w-4 h-4 text-white" />, url: "#" },
    { icon: <Instagram className="w-4 h-4 text-white" />, url: "#" },
    { icon: <Send className="w-4 h-4 text-white" />, url: "#" },
  ];

  return (
    <div className="order-4 lg:order-3">
      <h3 className="text-lg font-semibold mb-4">تابعنا</h3>
      <div className="flex gap-4">
        {socialLinks.map((item, index) => (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-secondary rounded-full flex-center hover:bg-secondary/80 transition-colors"
            aria-label="Social link"
          >
            {item.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

