import { useParams } from 'react-router-dom';
import { ArrowUp02Icon } from 'hugeicons-react';
import { ItemCard } from '../components';

// const data = [
//     {
//         name: '21/08/2024',
//         value: 2400,
//     },
//     {
//         name: '22/08/2024',
//         value: 1398,
//     },
//     {
//         name: '23/08/2024',
//         value: 9800,
//     },
//     {
//         name: '24/08/2024',
//         value: 3908,
//     },
//     {
//         name: '25/08/2024',
//         value: 4800,
//     }
// ];

// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';


{/* <LineChart
    width={600}
    height={300}
    data={data}
>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis dataKey="value" />
    <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
</LineChart> */}


const sets = [
    {
        id: 1,
        name: "Set 1",
        description: "Set 1 Description",
        value: 326.8,
        percentIncrease: 0.5,
    },
    {
        id: 2,
        name: "Set 2",
        description: "Set 2 Description",
        value: 42.3,
        percentIncrease: 0.5,
    },
    {
        id: 3,
        name: "Set 3",
        description: "Set 3 Description",
        value: 2003.4,
        percentIncrease: 20,
    },
    {
        id: 4,
        name: "Set 4",
        description: "Set 4 Description",
        value: 66.7,
        percentIncrease: 34.3,
    },
];

const Collection = () => {

    const { id } = useParams();

    const collectionValue = 28083.11;

    const collectionPercentageIncrease = 12.3;

    return (
        <div className='w-3/4 flex flex-col gap-5'>
            <div className='w-full flex flex-row justify-between items-center'>
                <h1 className='text-2xl font-bold'>
                    Collection {id}
                </h1>
                <div className='flex flex-col items-end gap-4'>
                    <p className='text-3xl'>
                        ${collectionValue}
                    </p>
                    <p className='flex flex-row text-green-500'>
                        <ArrowUp02Icon size={24} />
                        {collectionPercentageIncrease}%
                    </p>
                </div>
            </div>
            <div className='w-full p-2 flex flex-col gap-1'>
                {
                    sets.map(set =>
                        <ItemCard
                            key={set.id}
                            id={set.id}
                            name={set.name}
                            description={set.description}
                            value={set.value}
                            percentIncrease={set.percentIncrease}
                            to={`/nonopage`}
                        />)
                }
                <ItemCard to="/search" id={undefined} name={undefined} description={undefined} value={undefined} percentIncrease={undefined}/>
            </div>
        </div>
    );
};

export { Collection };