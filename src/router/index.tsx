import type { JSX } from 'react';
import Home from '../pages/Home';
import Topic from '../pages/Topic';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import AssetCollection from '../pages/AssetCollection';
import mainTopics from '../static/mainTopics.json';
import perTopicMap from '../static/perTopicMap.json';
import hiddenTopics from '../static/hiddenTopics.json';
import hiddenPerTopicMap from '../static/hiddenPerTopicMap.json';

const buildTopicsAsRoutes = (
    mainTopics: { label: string; key: string }[],
    perTopicMap: Record<
        string,
        Record<
            string,
            { label: string; assets: { label: string; file: string }[] }
        >
    >,
    overrideFolder?: string
) => {
    const subTopicRoutes: {
        path: string;
        element: JSX.Element;
    }[] = [];
    const mainTopicRoutes = mainTopics.map(({ label, key }) => ({
        path: `/${key}`,
        element: <Topic name={key} label={label} />,
    }));

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
                        overrideFolder={overrideFolder}
                    />
                ),
            });
        });
    });
    return [...mainTopicRoutes, ...subTopicRoutes];
};

const mainRoutes = buildTopicsAsRoutes(mainTopics, perTopicMap);
const nlRoutes = buildTopicsAsRoutes(
    hiddenTopics,
    hiddenPerTopicMap,
    '/secret_assets'
);

const dictRoutes = [
    {
        path: '/',
        element: <Home />,
    },
    ...mainRoutes,
    ...nlRoutes,
];

const routes = createHashRouter(dictRoutes);

const Router = () => {
    return <RouterProvider router={routes} />;
};

export { mainTopics, perTopicMap };

export default Router;
