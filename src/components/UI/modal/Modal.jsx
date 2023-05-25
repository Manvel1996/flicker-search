import React from "react";
import "./Modal.css";

export default function Modal({ modalText, setModalText, visible, setVisible }) {
    function closeModal(){
        setVisible(false)
         setModalText('')
    }
    return (
      <div
        className={visible ? "modal active" : "modal"}
        onClick={closeModal}>
        <div
          className={visible ? "modal-content active" : "modal-content "}
          onClick={(e) => e.stopPropagation()}>
          <button onClick={closeModal} className="modal-close-button">X</button>
          <p className="modal-text">{modalText}</p>
        </div>
      </div>
    );
  }