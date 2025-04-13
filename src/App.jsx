import './App.css';
import CategoryFilter from './components/CategoryFilter/CategoryFilter';
import Header from './components/Header/Header';
import RestaurantList from './components/RestaurantList/RestaurantList';
import Modal from './components/Modal/Layout/Modal';
import AddRestaurantModal from './components/Modal/AddRestaurantModal';
import RestaurantDetailModal from './components/Modal/RestaurantDetailModal';
import { useEffect, useState } from 'react';
import { FOOD_CATEGORY, MODAL_TYPE } from './constants';

function App() {
    const [restaurants, setRestaurants] = useState([]);
    const [category, setCategory] = useState(() => {
        return Object.keys(FOOD_CATEGORY).find((key) => FOOD_CATEGORY[key] === 'ALL');
    });
    const [modalState, setModalState] = useState({
        type: '',
        isOpen: false,
    });
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await fetch('http://localhost:3000/restaurants');
                const restaurantsData = await response.json();

                const filteredRestaurants = category === '전체' ? restaurantsData : restaurantsData.filter((restaurant) => restaurant.category === category);
                setRestaurants(filteredRestaurants);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchRestaurants();
    }, [category]);

    const openRestaurantDetailModal = (restaurant) => {
        setSelectedRestaurant(restaurant);
        setModalState({
            type: MODAL_TYPE.DETAIL,
            isOpen: true,
        });
    };

    const openRestaurantAddModal = () => {
        setModalState({
            type: MODAL_TYPE.ADD,
            isOpen: true,
        });
    };

    const closeRestaurantModal = () => {
        setModalState({
            type: '',
            isOpen: false,
        });
    };

    const modalComponents = {
        [MODAL_TYPE.ADD]: <AddRestaurantModal closeRestaurantModal={closeRestaurantModal} currentRestaurants={restaurants} handleRestaurant={setRestaurants} />,
        [MODAL_TYPE.DETAIL]: <RestaurantDetailModal closeRestaurantModal={closeRestaurantModal} selectedRestaurant={selectedRestaurant} />,
    };

    return (
        <>
            <Header openRestaurantAddModal={openRestaurantAddModal} />
            <main>
                <CategoryFilter category={category} onChangeCategory={setCategory} />
                <RestaurantList restaurants={restaurants} openRestaurantDetailModal={openRestaurantDetailModal} />
            </main>
            <aside>{modalState.isOpen && <Modal onChangeModal={closeRestaurantModal}>{modalComponents[modalState.type]}</Modal>}</aside>
        </>
    );
}

export default App;
