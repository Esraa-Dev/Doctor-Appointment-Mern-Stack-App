import { BrandInfo } from "./BrandInfo";
import { QuickLinks } from "./QuickLinks";
import { ContactInfo } from "./ContactInfo";
import { FollowUs } from "./FollowUs";
import { FooterCopyright } from "./FooterCopyright";

export const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8 text-right flex flex-col justify-center items-center px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 container flex-1">
                <BrandInfo />
                <ContactInfo />
                <QuickLinks />
                <FollowUs />
            </div>
            <FooterCopyright />
        </footer>
    );
};
