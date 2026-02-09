import { useNavigate } from 'react-router-dom';
import { perTopicMap } from '../../router';

const Topic: React.FC<{ label: string; name: string }> = ({ label, name }) => {
    const navigate = useNavigate();

    const referencedTopic = perTopicMap[name];
    if (!referencedTopic) return <h1>Não encontrado</h1>;

    const rootPath = `#/${name}`;

    return (
        <div>
            <button onClick={() => navigate(-1)}>Voltar</button>
            <h1>{label}</h1>
            <ul>
                {Object.entries(referencedTopic).map(([key, { label }]) => {
                    return (
                        <li key={key}>
                            <a href={rootPath + `/${key}`}>{label}</a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Topic;
