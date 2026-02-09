import type { JSX } from 'react';
import Home from '../pages/Home';
import Topic from '../pages/Topic';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import AssetCollection from '../pages/AssetCollection';

const mainTopics = [
    { label: 'BMAZ', key: 'bmaz' },
    // { label: 'BMAZ Combo', key: 'bmaz-combo' },
];

const perTopicMap: Record<
    string,
    Record<string, { label: string; assets: { label: string; file: string }[] }>
> = {
    bmaz: {
        believer: {
            label: 'Believer',
            assets: [{ label: 'Áudio', file: 'believer.mp3' }],
        },
        california: {
            label: 'California Dreams',
            assets: [{ label: 'Áudio', file: 'california.mp3' }],
        },
        galeon: {
            label: 'Galeon',
            assets: [
                { label: 'Áudio completo', file: 'galeon_banda.mp3' },
                {
                    label: 'Áudio (Percussão apenas)',
                    file: 'galeon_percussao.mp3',
                },
                { label: 'Áudio (Sopro apenas)', file: 'galeon_sopro.mp3' },
            ],
        },
        gonna_fly_now: {
            label: 'Gonna Fly Now',
            assets: [{ label: 'Áudio', file: 'gonna_fly_now.mp3' }],
        },
        wanna_be: {
            label: 'Wanna Be',
            assets: [{ label: 'Áudio', file: 'wanna_be.mp3' }],
        },
        stand_by_me: {
            label: 'Stand By Me',
            assets: [
                { label: 'Áudio', file: 'stand_by_me.mp3' },
            ],
        },
        industry_baby: {
            label: 'Industry Baby',
            assets: [
                { label: 'Áudio', file: 'industry_baby.mp3' },
                { label: 'Áudio (Percussão apenas)', file: 'industry_baby_perc.mp3' },
            ],
        },
    },
};

const mainTopicRoutes = mainTopics.map(({ label, key }) => ({
    path: `/${key}`,
    element: <Topic name={key} label={label} />,
}));
const subTopicRoutes: {
    path: string;
    element: JSX.Element;
}[] = [];
Object.entries(perTopicMap).forEach(([parentKey, value]) => {
    const rootPath = `/${parentKey}`;
    Object.entries(value).forEach(([key, value]) => {
        const path = rootPath + `/${key}`;
        const mappedFiles = value.assets.map(({ label, file }) => ({
            label,
            file: path + `/${file}`,
        }));
        subTopicRoutes.push({
            path,
            element: (
                <AssetCollection
                    parentLabel={
                        mainTopics.find((topic) => topic.key === parentKey)
                            ?.label ?? ''
                    }
                    label={value.label}
                    assets={mappedFiles}
                />
            ),
        });
    });
});

const routes = createHashRouter(
    [
        {
            path: '/',
            element: <Home />,
        },
        ...mainTopicRoutes,
        ...subTopicRoutes,
    ],
    {}
);

const Router = () => {
    return <RouterProvider router={routes} />;
};

export { mainTopics, perTopicMap };

export default Router;
