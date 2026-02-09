import type { JSX } from 'react';
import { useNavigate } from 'react-router-dom';

const AssetCollection: React.FC<{
    parentLabel: string;
    label: string;
    assets: { label: string; file: string }[];
}> = ({ parentLabel, label, assets }) => {
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate(-1)}>Voltar</button>
            <h1>
                {parentLabel} - {label}
            </h1>
            {assets
                .map(({ label, file }) => {
                    const filePath = '/assets' + file;
                    let item: JSX.Element | null = null;
                    if (file.endsWith('.mp3')) {
                        // Embed mp3 player
                        item = (
                            <audio key={file} controls>
                                <source src={filePath} type='audio/mp3' />
                            </audio>
                        );
                    }
                    return (
                        <div>
                            <h4>{label}</h4>
                            {item ?? 'Arquivo não identificado'}
                        </div>
                    );
                })}
        </div>
    );
};

export default AssetCollection;
