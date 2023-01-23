import { useNavigate } from "react-router-dom";
import { useFetch } from "./useFetch";

const Categories = () => {

    const navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    };

    const { data, isPending, error } = useFetch('http://localhost:8000/categories');

    return (
        <div className="categories">
            <div className="categories-container">
                <div className="categories-title">
                    <h1>KATEGORIE</h1>
                </div>

                <div className="categories-list">

                    {isPending && <div>Loading...</div>}
                    {error && <div>{error}</div>}

                    {data && data.map(category => {
                        return (
                            <div className="categories-list-item" key={category.name} onClick={() => routeChange(`/game/${category.name}/2`)}>
                                <img src={category.image} alt="" />
                                <p>{category.name}</p>
                            </div>
                        )
                    })}

                </div>
            </div>

            <div className='bottom-left-svg'>
                <img src="./assets/start/bottom-left.svg" alt="" />
            </div>

            <div className='top-right-svg'>
                <img src="./assets/start/top-right.svg" alt="" />
            </div>
        </div>

    );
}

export default Categories;