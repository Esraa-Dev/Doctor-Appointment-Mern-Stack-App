import { Link } from "react-router-dom";
import { NAV_LINKs } from "../constants/navigation";


export const QuickLinks = () => {
  return (
    <div className="order-3 lg:order-3">
      <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
      <ul className="flex flex-col gap-2">
        {NAV_LINKs.map((link, index) => (
          <li key={index}>
            <Link
              to={link.href}
              className="text-gray-300 hover:text-primary transition-colors duration-200"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
