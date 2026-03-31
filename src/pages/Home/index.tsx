import { mainTopics } from '../../router';

const Home: React.FC = () => {
    return (
        <div>
            <h1>Repositório BMAZ</h1>
            <p>
                Repositório da Banda Marcial Antonio Zocante (BMAZ) para ter
                registros dos arquivos com um acesso fácil
            </p>
            <ul>
                {mainTopics.map(({ label, key }) => (
                    <li key={key}>
                        <h1>
                            <a href={`#/${key}`}>{label}</a>
                        </h1>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
