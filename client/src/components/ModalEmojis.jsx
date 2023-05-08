import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import goodMood from '../assets/goodMood.svg';
import ok from '../assets/ok.svg';
import down from '../assets/down.svg';
import sad from '../assets/sad.svg';
import bad from '../assets/bad.svg';
import '../styles/modalEmoji.css';

const Example = ({show, handleClose, handleShow, usuario}) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>How do you feel?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <button className='button-emojis'><img src={goodMood}/></button>
            <button className='button-emojis'><img src={ok}/></button>
            <button className='button-emojis'><img src={down}/></button>
            <button className='button-emojis'><img src={sad}/></button>
            <button className='button-emojis'><img src={bad}/></button>
            
        </Modal.Body>
        <Modal.Footer>
          <button className='botonesAbajo' onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example