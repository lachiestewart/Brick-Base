import { ArrowUp02Icon } from "hugeicons-react";
import { ItemCard } from "../components";

const collections = [
    {
        id: 1,
        name: "Collection 1",
        description: "Collection 1 Description",
        value: 326.8,
        percentIncrease: 0.5,
    },
    {
        id: 2,
        name: "Collection 2",
        description: "Collection 2 Description",
        value: 42.3,
        percentIncrease: 0.5,
    },
    {
        id: 3,
        name: "Collection 3",
        description: "Collection 3 Description",
        value: 2003.4,
        percentIncrease: 20,
    },
    {
        id: 4,
        name: "Collection 4",
        description: "Collection 4 Description",
        value: 66.7,
        percentIncrease: 34.3,
    },
];

const MyCollections = () => {

    const collectionsValue = 326.8;
    const collectionsPercentageIncrease = 0.5;


    return (
        <div className='w-3/4 flex flex-col gap-5'>
            <div className='w-full flex flex-row justify-between items-center'>
                <h1 className='text-2xl font-bold'>
                    My Collections
                </h1>
                <div className='flex flex-col items-end gap-4'>
                    <p className='text-3xl'>
                        ${collectionsValue}
                    </p>
                    <p className='flex flex-row text-green-500'>
                        <ArrowUp02Icon size={24} />
                        {collectionsPercentageIncrease}%
                    </p>
                </div>
            </div>
            <div className='w-full p-2 flex flex-col gap-1'>
                {
                    collections.map(collection =>
                        <ItemCard
                            key={collection.id}
                            id={collection.id}
                            name={collection.name}
                            description={collection.description}
                            value={collection.value}
                            percentIncrease={collection.percentIncrease}
                            to={`/collection/${collection.id}`}
                        />)
                }
                <ItemCard to="/collection/new" id={undefined} name={undefined} description={undefined} value={undefined} percentIncrease={undefined}/>
            </div>
        </div>
    );
}

export { MyCollections };