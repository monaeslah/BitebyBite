import { useEffect, useState } from 'react'

const SurpriseCard = ({ surprise, reselect }) => {
  const [randomRecipe, setRandomRecipe] = useState(null)

  useEffect(() => {
    setRandomRecipe(surprise)
  }, [surprise])
  return (
    <div>
      {randomRecipe &&
        randomRecipe.photos.map((item, index) => (
          <img src={item} alt={randomRecipe.name} key={index} />
        ))}
      <p>{randomRecipe && randomRecipe.name}</p>
      <button onClick={reselect}>try me</button>
    </div>
  )
}
export default SurpriseCard
