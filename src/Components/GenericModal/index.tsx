import Modal from 'react-modal'
import { GenericModalProps } from '../../Utils/Interfaces'
import { customStyles } from './styles'

export function GenericModal({isOpen, closeModal, text}: GenericModalProps) {
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