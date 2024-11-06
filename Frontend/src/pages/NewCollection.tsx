import { useNavigate } from "react-router-dom";

const NewCollection = () => {

    const navigate = useNavigate();

    const handleCreateClick = () => {
        // create new collection
        handleCancelClick();
    }

    const handleCancelClick = () => navigate('/collections');

    return (
        <form className="w-3/4 flex flex-col gap-5 items-center">
            <h1 className="text-2xl font-bold">Create Collection</h1>
            <div className="w-1/2 flex flex-col gap-2">
                <label
                    htmlFor="collection-name"
                    className="font-bold">
                    Name
                </label>
                <input
                    id="collection-name"
                    type="text"
                    placeholder="Collection name"
                    className="w-full p-2 border-2 rounded-lg ml-1" />
            </div>
            <div className="w-1/2 flex flex-col gap-2">
                <label
                    htmlFor="collection-description"
                    className="font-bold">
                    Description
                </label>
                <textarea
                    id="collection-description"
                    placeholder="Collection description"
                    className="w-full p-2 border-2 rounded-lg ml-1 h-28" />
            </div>
            <div className="w-full flex flex-row justify-center gap-2">
                <button
                    className="p-2 border-2 rounded-lg"
                    onClick={handleCreateClick}>
                    Create
                </button>
                <button
                    className="p-2 border-2 rounded-lg"
                    onClick={handleCancelClick}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export { NewCollection };