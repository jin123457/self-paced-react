import './App.css';
import CategoryFilter from './components/CategoryFilter';
import Header from './components/Header';
import RestaurantList from './components/RestaurantList';
import Modal from './components/Modal';
import AddRestaurantModal from './components/AddRestaurantModal';
import RestaurantDetailModal from './components/RestaurantDetailModal';
import { useEffect, useState } from 'react';
import { FOOD_CATEGORY } from './constants';

function App() {
    const [restaurants, setRestaurants] = useState([]);
    const [category, setCategory] = useState(Object.keys(FOOD_CATEGORY).find((key) => FOOD_CATEGORY[key] === 'ALL'));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [modalKind, setModalKind] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000/restaurants')
            .then((response) => response.json())
            .then((data) => setRestaurants(data))
            .catch((error) => {
                console.error(error.message);
            });
    }, []);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await fetch('http://localhost:3000/restaurants');
                const restaurantsData = await response.json();

                if (category === '전체') {
                    setRestaurants(restaurantsData);
                    return;
                }

                const filteredRestaurants = restaurantsData.filter((restaurant) => restaurant.category === category);
                setRestaurants(filteredRestaurants);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchRestaurants();
    }, [category]);

    const openRestaurantDetailModal = (restaurant) => {
        setSelectedRestaurant(restaurant);
        setIsModalOpen(true);
        setModalKind('detail');
    };

    const openRestaurantAddModal = () => {
        setIsModalOpen(true);
        setModalKind('addForm');
    };

    const closeRestaurantModal = () => {
        setIsModalOpen(false);
        setModalKind('');
    };
    return (
        <>
            <Header openRestaurantAddModal={openRestaurantAddModal} />
            <main>
                <CategoryFilter category={category} onChangeCategory={setCategory} />
                <RestaurantList restaurants={restaurants} openRestaurantDetailModal={openRestaurantDetailModal} />
            </main>
            <aside>
                {isModalOpen && (
                    <Modal onChangeModal={setIsModalOpen}>
                        {modalKind === 'addForm' ? (
                            <AddRestaurantModal
                                closeRestaurantModal={closeRestaurantModal}
                                currentRestaurants={restaurants}
                                handleRestaurant={setRestaurants}
                            />
                        ) : (
                            <RestaurantDetailModal closeRestaurantModal={closeRestaurantModal} selectedRestaurant={selectedRestaurant} />
                        )}
                    </Modal>
                )}
            </aside>
        </>
    );
}

export default App;
