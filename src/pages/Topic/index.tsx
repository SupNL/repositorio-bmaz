import perTopicMap from '../../static/perTopicMap.json';
import hiddenPerTopicMap from '../../static/hiddenPerTopicMap.json';
import GoBackButton from '../../components/GoBackButton';

const mappedPerTopicMap: Record<
    string,
    Record<
        string,
        {
            label: string;
            assets: { label: string; file: string }[];
        }
    >
> = {
    ...perTopicMap,
    ...hiddenPerTopicMap,
};

const Topic: React.FC<{
    label: string;
    name: string;
    overrideTopic?: Record<
        string,
        Record<
            string,
            {
                label: string;
                assets: {
                    label: string;
                    file: string;
                }[];
            }
        >
    >;
}> = ({ label, name }) => {
    const referencedTopic = mappedPerTopicMap[name];
    if (!referencedTopic) return <h1>Não encontrado</h1>;

    const rootPath = `#/${name}`;

    return (
        <div>
            <GoBackButton />
            <h1>{label}</h1>
            <ul>
                {Object.entries(referencedTopic)
                    .sort((a, b) => a[1].label.localeCompare(b[1].label))
                    .map(([key, { label }]) => {
                        return (
                            <li key={key}>
                                <h3>
                                    <a href={rootPath + `/${key}`}>{label}</a>
                                </h3>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default Topic;
