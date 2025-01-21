import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faRedo } from '@fortawesome/free-solid-svg-icons'

const Timer = () => {
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [progressColor, setProgressColor] = useState('#fff')

  // Countdown logic
  useEffect(() => {
    let timerInterval = null

    if (isRunning) {
      timerInterval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(timerInterval)
            playAlarm()
          } else {
            setMinutes(prev => prev - 1)
            setSeconds(59)
          }
        } else {
          setSeconds(prev => prev - 1)
        }

        updateBackgroundColor(minutes, seconds)
      }, 1000)
    }

    return () => clearInterval(timerInterval)
  }, [minutes, seconds, isRunning])

  // Play alarm sound
  const playAlarm = () => {
    const alarmSound = new Audio('https://www.soundjay.com/button/beep-07.wav')
    alarmSound.play()
    alert("Time's up!")
  }

  // Update background color
  const updateBackgroundColor = (mins, secs) => {
    const totalSeconds = mins * 60 + secs
    const percentage = totalSeconds / 3659 // 60:59 max time
    const red = Math.min(255, 255 - Math.floor(percentage * 255))
    const green = Math.max(0, Math.floor(percentage * 255))
    setProgressColor(`rgb(${red}, ${green}, 100)`)
  }

  const handleStart = () => {
    if (minutes > 60 || (minutes === 60 && seconds > 59)) {
      alert('Please enter a time less than or equal to 60:59')
      return
    }
    setIsRunning(true)
    updateBackgroundColor(minutes, seconds)
  }

  const handleReset = () => {
    setIsRunning(false)
    setMinutes(0)
    setSeconds(0)
    setProgressColor('#fff')
  }

  return (
    <div
      style={{
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: progressColor,
        minHeight: '100vh',
        transition: 'background-color 0.5s ease',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <h1>Countdown Timer</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type='number'
          value={minutes}
          onChange={e =>
            setMinutes(Math.max(0, Math.min(60, Number(e.target.value))))
          }
          placeholder='Minutes'
          style={{
            width: '80px',
            fontSize: '20px',
            textAlign: 'center',
            marginRight: '10px'
          }}
          disabled={isRunning}
        />
        :
        <input
          type='number'
          value={seconds}
          onChange={e =>
            setSeconds(Math.max(0, Math.min(59, Number(e.target.value))))
          }
          placeholder='Seconds'
          style={{
            width: '80px',
            fontSize: '20px',
            textAlign: 'center',
            marginLeft: '10px'
          }}
          disabled={isRunning}
        />
      </div>
      <div style={{ fontSize: '40px', marginBottom: '20px' }}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <div>
        <button
          onClick={handleStart}
          style={{
            width: '140px',

            padding: '10px',
            fontSize: '24px',
            marginRight: '10px',
            backgroundColor: '#1a3a52',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
          disabled={isRunning}
        >
          <FontAwesomeIcon icon={faPlay} />
        </button>
        <button
          onClick={handleReset}
          style={{
            width: '140px',
            padding: '10px',
            fontSize: '24px',
            backgroundColor: '#ff6b6b',
            color: 'white',
            border: 'none',
            borderRadius: '5px',

            cursor: 'pointer'
          }}
        >
          <FontAwesomeIcon icon={faRedo} />
        </button>
      </div>
    </div>
  )
}

export default Timer
