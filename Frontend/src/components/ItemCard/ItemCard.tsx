import { useNavigate } from "react-router-dom";
import { PlusSignCircleIcon } from "hugeicons-react";

type ItemCardProps = {
    id: number | undefined;
    name: string | undefined;
    description: string | undefined;
    value: number | undefined;
    percentIncrease: number | undefined;
    to: string;
};

const ItemCard = (props: ItemCardProps) => {

    const navigate = useNavigate();
    const handleClick = () => navigate(props.to);

    return (
        <div className="flex flex-row w-full items-center h-20 justify-around rounded-2xl border-2 box-border hover:bg-gray-100 cursor-pointer" onClick={handleClick}>
            {props.id === undefined ?
                <PlusSignCircleIcon size={24} />
                :
                (<>
                    <div className="flex flex-row items-center">
                        <img src="/icon.png" alt="item logo" className="h-20 hidden sm:block" />
                        <div>
                            <h1 className="font-bold">{props.name}</h1>
                            <p className="truncate text-gray-400">{props.description}</p>
                        </div>
                    </div>
                    <img src="/graph.png" alt="item graph" className="hidden md:block" />
                    <div className="flex flex-col items-center">
                        <p>${props.value}</p>
                        <p>+ {props.percentIncrease}%</p>
                    </div>
                </>
                )}
        </div>
    );
};

export { ItemCard };