import Modal from "react-modal";
import { NewTransactionModalProps } from "../Utils/Interfaces";

export function GenericModal({isOpen, closeModal, text}: NewTransactionModalProps) {

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