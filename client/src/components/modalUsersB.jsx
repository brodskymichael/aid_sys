import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import image from '../assets/image.svg';
import video from '../assets/video.svg';
import question from '../assets/question.svg';
import uploadMedia from '../assets/uploadMedia.svg';
import '../styles/modalUsersB.css';
import Form from 'react-bootstrap/Form';


const ModalUsersB = ({show, handleClose, handleShow, user}) => {

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Send media to user: {user}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" rows={3} placeholder='What do you want to talk about?' />
            </Form.Group>   
            <Form.Group>
                <button className='options-media'><img src={image}/> Image</button>
                <button className='options-media'><img src={video}/> Video</button>
                <button className='options-media'><img src={question}/> Question</button>
                <button className='options-media'><img src={uploadMedia}/> Choose media from disk</button>
            </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className='botonesAbajo' onClick={handleClose}>
            Cancel
          </button>
          <button className='botonesAbajo'>
            Send
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUsersB