import './CategoryFilter.css';
import { FOOD_CATEGORY } from '../../constants';

const categoryData = Object.keys(FOOD_CATEGORY);

function CategoryFilter({ category, onChangeCategory }) {
    return (
        <>
            <section className='restaurant-filter-container'>
                <select
                    name='category'
                    id='category-filter'
                    className='restaurant-filter'
                    aria-label='음식점 카테고리 필터'
                    value={category}
                    onChange={(e) => onChangeCategory(e.target.value)}
                >
                    {categoryData.map((currentCategory) => (
                        <option key={currentCategory} value={currentCategory}>
                            {currentCategory}
                        </option>
                    ))}
                </select>
            </section>
        </>
    );
}

export default CategoryFilter;
