import { useState } from "react"
import "./App.css"
import "./style.css"

function App() {
  const [options, setOptions] = useState(["Burger", "Salad", "Fish", "Meat", "Ice Cream", "Pasta", "Vegetables", "Pizza"])
  const [numOptions, setNumOptions] = useState(8)
  const [inputOptions, setInputOptions] = useState(options)

  const handleSpin = () => {
    const box = document.getElementById("wheel")
    const min = 1024
    const max = 9999
    const deg = Math.floor(Math.random() * (max - min)) + min
    box.style.transform = `rotate(${deg}deg)`
    console.log(min, max, deg)
  }

  const handleNumOptionsChange = (e) => {
    const value = parseInt(e.target.value, 10)
    setNumOptions(value)
    setInputOptions(new Array(value).fill(""))
  }

  const handleInputChange = (index, value) => {
    const newOptions = [...inputOptions]
    newOptions[index] = value
    setInputOptions(newOptions)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setOptions(inputOptions)
  }

  return (
    <>
      <div className="container">
        <h1>Spin the Wheel</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Number of Options:
            <select value={numOptions} onChange={handleNumOptionsChange}>
              {[2, 4, 6, 8, 10, 12].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </label>
          <br />
          {inputOptions.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleInputChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
            />
          ))}
          <br />
          <button type="submit">Update Wheel</button>
        </form>
        <div className="wheel-container">
          <div id="wheel" className="wheel">
            {options.map((option, index) => (
              <div key={index} className="segment">
                {option}
              </div>
            ))}
          </div>
        </div>
        <button className="spin-button" onClick={handleSpin}>Spin</button>
      </div>
    </>
  )
}

export default App
