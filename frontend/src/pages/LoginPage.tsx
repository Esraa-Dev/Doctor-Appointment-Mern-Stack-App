import { useTranslation } from 'react-i18next';
import LoginForm from '../components/forms/LoginForm'

const LoginPage = () => {
    const { i18n } = useTranslation();
    return (
        <LoginForm key={i18n.language} />)
}

export default LoginPage