import Modal from 'react-modal'
import { GenericModalProps } from '../Utils/Interfaces'

export function GenericModal({isOpen, closeModal, text}: GenericModalProps) {

  /**
   * Cria os estilos customizado do modal
   */
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  };


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      {text}
    </Modal>
  )
}