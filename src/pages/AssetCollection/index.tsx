import type { JSX } from 'react';
import GoBackButton from '../../components/GoBackButton';

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const assetRelativePath: string =
    import.meta.env.VITE_ASSETS_RELATIVE_PATH ?? '';

const AssetCollection: React.FC<{
    parentLabel: string;
    label: string;
    assets: { label: string; file: string }[];
    overrideFolder?: string;
}> = ({ parentLabel, label, assets, overrideFolder }) => {
    const folder = overrideFolder ?? '/assets';
    return (
        <div>
            <GoBackButton />
            <h1>
                {parentLabel} - {label}
            </h1>
            {assets.map(({ label, file }) => {
                const filePath = assetRelativePath + folder + file;
                let item: JSX.Element | null = null;
                if (file.endsWith('.mp3')) {
                    // Embed mp3 player
                    item = <AudioPlayer key={file} src={filePath} />;
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
