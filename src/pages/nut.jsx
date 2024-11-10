// NutritionalInfo.js
const NutritionalInfo = ({ nutritionalInfo }) => (
  <div className='nut-info'>
    <h3>Nutritional Information:</h3>
    <p>Calories: {nutritionalInfo.calories}</p>
    <p>Carbohydrates: {nutritionalInfo.carbohydrates}</p>
    <p>Fat: {nutritionalInfo.fat}</p>
    <p>Protein: {nutritionalInfo.protein}</p>
  </div>
)

export default NutritionalInfo
