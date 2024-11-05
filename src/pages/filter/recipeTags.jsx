import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getRecipes } from '../../config/utilCurd'

const CategoryPage = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const recipes = await getRecipes()

        const categoryMap = {}
        recipes.forEach(recipe => {
          recipe.tags.forEach(tag => {
            if (!categoryMap[tag]) {
              categoryMap[tag] = {
                count: 1,
                image: recipe.photos[0]
              }
            } else {
              categoryMap[tag].count += 1
            }
          })
        })

        const categoryArray = Object.keys(categoryMap).map(tag => ({
          name: tag,
          count: categoryMap[tag].count,
          image: categoryMap[tag].image
        }))

        setCategories(categoryArray)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])

  return (
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
  )
}

export default CategoryPage
