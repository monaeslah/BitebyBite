// InstructionsList.js
const InstructionsList = ({ instructions }) => (
  <div className='instructions-list'>
    {instructions.map((step, index) => (
      <div key={index} className='instruction-step' data-step={index + 1}>
        <p>{step}</p>
      </div>
    ))}
  </div>
)

export default InstructionsList
