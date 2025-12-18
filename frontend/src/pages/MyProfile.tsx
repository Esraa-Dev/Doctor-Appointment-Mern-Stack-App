import { useState } from "react";
import { useGetProfile } from "../hooks/patient/useGetProfile";
import { PATIENT_SIDEBAR_TABS } from "../constants/patientSidebarTabs";
import { PatientPersonalInfo } from "../components/features/patient/PatientPersonalInfo";
import { PatientSidebarTabs } from "../components/features/patient/PatientSidebarTabs";
import { ProfileHeader } from "../components/features/patient/ProfileHeader";
import Loading from "../components/ui/Loading";

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const { data: profile, isLoading, error } = useGetProfile();
  console.log(profile)

  if (isLoading) return <Loading />
  if (error) {
    return (
      <div className="p-6 bg-background text-red-700 rounded-xl text-center h-full">
        <div className="mt-2 text-sm">{error.message}</div>
      </div>
    );
  }

  return (
    <div className="bg-background py-10">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-full">
          <section className="lg:col-span-1">
            <div className="bg-white/50 rounded-2xl border border-primaryBorder p-4 h-full">
              <ProfileHeader
                firstName={profile.firstName} lastName={profile.lastName} image={profile.image} createdAt={profile.createdAt}
              />
              <div className="space-y-2">
                <PatientSidebarTabs
                  tabs={PATIENT_SIDEBAR_TABS}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              </div>
            </div>
          </section>
          <section className="lg:col-span-3">
            {activeTab === 'personal' && (
              <PatientPersonalInfo userData={profile} />
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;