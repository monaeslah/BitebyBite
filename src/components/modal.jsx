// Modal.js
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

function Modal ({ isOpen, onClose, children }) {
  // Ensure modal closes when clicking outside of modal content
  const handleClickOutside = e => {
    if (e.target.id === 'modal-overlay') {
      onClose()
    }
  }

  // Prevent scrolling on the main page when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => (document.body.style.overflow = 'auto')
  }, [isOpen])

  // Render only if the modal is open
  if (!isOpen) return null

  return ReactDOM.createPortal(
    <div
      id='modal-overlay'
      className='modal-overlay'
      onClick={handleClickOutside}
    >
      <div className='modal-content'>
        <button className='close-button' onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  )
}

export default Modal
