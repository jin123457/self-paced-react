import '../css/RestaurantList.css';
import { FOOD_CATEGORY } from '../constants.js';

function RestaurantList({ restaurants, openRestaurantDetailModal }) {
    return (
        <>
            <section className='restaurant-list-container'>
                <ul className='restaurant-list'>
                    {restaurants.map((restaurant) => (
                        <li key={restaurant.id} className='restaurant' onClick={() => openRestaurantDetailModal(restaurant)}>
                            <div className='restaurant__category'>
                                <img src={`./category-${FOOD_CATEGORY[restaurant.category]}.png`} alt={restaurant.category} className='category-icon' />
                            </div>
                            <div className='restaurant__info'>
                                <h3 className='restaurant__name text-subtitle'>{restaurant.name}</h3>
                                <p className='restaurant__description text-body'>{restaurant.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}

export default RestaurantList;
