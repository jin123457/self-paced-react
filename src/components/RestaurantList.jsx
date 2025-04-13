import '../css/RestaurantList.css';
import { FOOD_CATEGORY } from '../constants.js';

function RestaurantList({ restaurants, openRestaurantDetailModal }) {
    return (
        <>
            <section className='restaurant-list-container'>
                <ul className='restaurant-list'>
                    {restaurants.map((restaurant) => {
                        const { id, category, name, description } = restaurant;

                        return (
                            <li key={id} className='restaurant' onClick={() => openRestaurantDetailModal(restaurant)}>
                                <div className='restaurant__category'>
                                    <img src={`./category-${FOOD_CATEGORY[category]}.png`} alt={category} className='category-icon' />
                                </div>
                                <div className='restaurant__info'>
                                    <h3 className='restaurant__name text-subtitle'>{name}</h3>
                                    <p className='restaurant__description text-body'>{description}</p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </section>
        </>
    );
}

export default RestaurantList;
