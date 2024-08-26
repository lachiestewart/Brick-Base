import { useNavigate } from "react-router-dom";

const ItemCard = () => {

    const itemId = 1;
    const itemName = "Item Name";
    const itemDescription = "Item Description";
    const itemValue = 326.8;
    const itemPercentIncrease = 0.5;
    const itemTo = `/collection/${itemId}`;

    const navigate = useNavigate();
    const handleClick = () => navigate(itemTo);

    return (
        <div className="flex flex-row w-full items-center h-20 justify-around rounded-2xl border-2 box-border hover:bg-gray-100 cursor-pointer" onClick={handleClick}>
            <div className="flex flex-row items-center">
                <img src="/icon.png" alt="item logo" className="h-20 hidden sm:block" />
                <div>
                    <h1 className="font-bold">{itemName}</h1>
                    <p className="truncate text-gray-400">{itemDescription}</p>
                </div>
            </div>
            <img src="/graph.png" alt="item graph" className="hidden md:block" />
            <div className="flex flex-col items-center">
                <p>${itemValue}</p>
                <p>+ {itemPercentIncrease}%</p>
            </div>
        </div>
    );
};

export { ItemCard };