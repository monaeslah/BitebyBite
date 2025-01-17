import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getRecipes } from '../../config/utilCurd'
import appetizer from '../../assets/tag_images/apetit.jpeg'
import healthy from '../../assets/tag_images/healthy.jpeg'
import drinks from '../../assets/tag_images/drinks.jpeg'
import breakfast from '../../assets/tag_images/breakfast.jpeg'
import lunch from '../../assets/tag_images/lunch.jpeg'
import dinner from '../../assets/tag_images/dinner.jpeg'
import vegi from '../../assets/tag_images/vegi.jpeg'

const CategoryPage = () => {
  const [categories, setCategories] = useState([])
  const [countries, setCountries] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const recipes = await getRecipes()

        // Map for tag images
        const tagImageMap = {
          Appetizers: appetizer,
          Healthy: healthy,
          Drinks: drinks,
          Lunch: lunch,
          breakfast: breakfast,
          dinner: dinner,
          Breakfast: breakfast,
          Dinner: dinner,
          Vegetarian: vegi
        }

        // Category map
        const categoryMap = {}
        const countryMap = {}

        recipes.forEach(recipe => {
          // Handle tags
          recipe.tags.forEach(tag => {
            if (!categoryMap[tag]) {
              categoryMap[tag] = {
                count: 1,
                image: tagImageMap[tag]
              }
            } else {
              categoryMap[tag].count += 1
            }
          })

          // Handle countries
          if (recipe.country?.label) {
            const countryName = recipe.country.label
            if (!countryMap[countryName]) {
              countryMap[countryName] = {
                count: 1
              }
            } else {
              countryMap[countryName].count += 1
            }
          }
        })

        // Convert category map to array
        const categoryArray = Object.keys(categoryMap).map(tag => ({
          name: tag,
          count: categoryMap[tag].count,
          image: categoryMap[tag].image
        }))

        // Convert country map to array
        const countryArray = Object.keys(countryMap).map(country => ({
          name: country,
          count: countryMap[country].count
        }))

        setCategories(categoryArray)
        setCountries(countryArray)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])

  return (
    <div id='category'>
      {' '}
      <div className='category-page'>
        {categories.map((category, index) => (
          <Link to={`/tag/${category.name}`} key={index}>
            <div className='category-card'>
              <img
                src={category.image}
                alt={category.name}
                className='category-image'
              />
              <div className='category-overlay'>
                <h3 className='category-title'>{category.name}</h3>
                <span className='category-count'>{category.count}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* <div className='country-tags'>
        {countries.map((country, index) => (
          <Link to={`/tag/${country.name}`} key={index}>
            <div className='country-card'>
              <div className='country-overlay'>
                <h3 className='country-title'>{country.name}</h3>
                <span className='country-count'>{country.count}</span>
              </div>
            </div>
          </Link>
        ))}
      </div> */}
    </div>
  )
}

export default CategoryPage
