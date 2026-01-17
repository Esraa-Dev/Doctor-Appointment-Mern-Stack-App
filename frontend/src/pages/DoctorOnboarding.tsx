import { useTranslation } from 'react-i18next';
import { DoctorOnboardingForm } from '../components/forms/DoctorOnboardingForm'

const DoctorOnboarding = () => {
  const { i18n } = useTranslation();
  return (
    <DoctorOnboardingForm key={i18n.language} />
  )
}

export default DoctorOnboarding
