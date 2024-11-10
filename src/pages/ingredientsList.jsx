const IngredientsList = ({ ingredients }) => (
  <div className='ingredient-list'>
    {ingredients.map((ingredient, index) => (
      <div key={index} className='ingredient-item'>
        <input type='checkbox' id={`ingredient-${index}`} />
        <label htmlFor={`ingredient-${index}`}>{ingredient}</label>
      </div>
    ))}
  </div>
)

export default IngredientsList
