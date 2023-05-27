import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import goodMood from '../assets/goodMood.svg';
import ok from '../assets/ok.svg';
import down from '../assets/down.svg';
import sad from '../assets/sad.svg';
import bad from '../assets/bad.svg';
import breakbutton from '../assets/breakbutton.svg';
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
        <Modal.Header>
          <Modal.Title className='tittle-modal'>I am on break and will be back soon</Modal.Title>
        </Modal.Header>
        <Modal.Body className='pic'>
          <img src={breakbutton} width='200px' height='250px'/>
        </Modal.Body>
        <Modal.Footer>
          <button className='botonesAbajo' onClick={handleClose}>
           Back from Break
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example