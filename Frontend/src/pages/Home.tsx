import { ItemCard } from "../components";

const Home = () => {
    return (
        <div className="w-full p-2 flex flex-col gap-1">
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
        </div>
    );
};

export { Home };