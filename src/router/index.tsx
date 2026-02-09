import type { JSX } from 'react';
import Home from '../pages/Home';
import Topic from '../pages/Topic';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import AssetCollection from '../pages/AssetCollection';

const mainTopics = [
    { label: 'BMAZ', key: 'bmaz' },
    { label: 'BMAZ Combo', key: 'bmaz-combo' },
];

const perTopicMap: Record<
    string,
    Record<string, { label: string; assets: [{ file: string }] }>
> = {
    bmaz: {
        beliver: {
            label: 'Believer',
            assets: [{ file: 'believer.mp3' }],
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
        const mappedFiles = value.assets.map(({ file }) => path + `/${file}`);
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

const routes = createHashRouter([
    {
        path: '/',
        element: <Home />,
    },
    ...mainTopicRoutes,
    ...subTopicRoutes,
]);

const Router = () => {
    return <RouterProvider router={routes} />;
};

export { mainTopics, perTopicMap };

export default Router;
