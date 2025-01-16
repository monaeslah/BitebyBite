// Modal.js
import { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
function Modal ({ className = '', classNo = '', isOpen, onClose, children }) {
  const handleClickOutside = e => {
    if (e.target.id === 'modal-overlay') {
      onClose()
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => (document.body.style.overflow = 'auto')
  }, [isOpen])

  if (!isOpen) return null

  return ReactDOM.createPortal(
    <div
      id='modal-overlay'
      className={`modal-overlay ${className}`}
      onClick={handleClickOutside}
    >
      <div className={` ${classNo}`}>
        <FontAwesomeIcon
          className='close-button'
          icon={faWindowClose}
          onClick={onClose}
        />
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  )
}

export default Modal
