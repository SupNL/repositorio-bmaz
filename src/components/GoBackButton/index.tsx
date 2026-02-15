import { useNavigate } from 'react-router-dom';

const GoBackButton = () => {
    const navigate = useNavigate();

    const navigateBack = () => {
        const pathSegments = window.location.hash
            .split('/')
            .filter(Boolean)
            .filter((str) => str !== '#');
        if (pathSegments.length > 0) {
            const parentPath =
                '/' + (pathSegments.slice(0, -1).join('/') ?? '');
            navigate(parentPath);
            return;
        }
        navigate('/');
    };

    return <button onClick={navigateBack}>Voltar</button>;
};

export default GoBackButton;
