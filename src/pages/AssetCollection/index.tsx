import { useNavigate } from 'react-router-dom';

const baseUrl = 'https://supnl.github.io/repositorio-bmaz';

const AssetCollection: React.FC<{
    parentLabel: string;
    label: string;
    assets: string[];
}> = ({ parentLabel, label, assets }) => {
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate(-1)}>Voltar</button>
            <h1>
                {parentLabel} - {label}
            </h1>
            {assets.map((file) => {
                const filePath = baseUrl + '/assets' + file;
                if (file.endsWith('.mp3')) {
                    // Embed mp3 player
                    return (
                        <audio key={file} controls>
                            <source src={filePath} type='audio/mp3' />
                        </audio>
                    );
                }
                return null;
            })}
        </div>
    );
};

export default AssetCollection;
