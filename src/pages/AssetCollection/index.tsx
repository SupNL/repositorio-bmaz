import type { JSX } from 'react';
import GoBackButton from '../../components/GoBackButton';

const assetRelativePath : string = import.meta.env.VITE_ASSETS_RELATIVE_PATH ?? '';

const AssetCollection: React.FC<{
    parentLabel: string;
    label: string;
    assets: { label: string; file: string }[];
}> = ({ parentLabel, label, assets }) => {
    return (
        <div>
            <GoBackButton />
            <h1>
                {parentLabel} - {label}
            </h1>
            {assets
                .map(({ label, file }) => {
                    const filePath = assetRelativePath + '/assets' + file;
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
                        <div key={file}>
                            <h4>{label}</h4>
                            {item ?? 'Arquivo não identificado'}
                        </div>
                    );
                })}
        </div>
    );
};

export default AssetCollection;
