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
import { useDispatch } from 'react-redux';
import { changeMood } from '../redux/actions';

const ModalEmojis = ({show, handleClose, handleShow,usuario, socket}) => {
  if(show){
    const dispatch = useDispatch()

    const updateMood= async (mood)=>{
      //await dispatch(changeMood({user:usuario,mood:mood}))
      socket.emit("updateMood", {user:usuario,mood:mood});
      handleClose()
    }
    return (
      <>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title className='tittle-modal'>Choose mood</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <button className='button-emojis'><img src={goodMood} onClick={(e)=>updateMood(1)}></img><h1 className='text-emoji'>Good Mood</h1></button>
          <button className='button-emojis'><img src={ok} onClick={(e)=>updateMood(2)}></img><h1 className='text-emoji'>Ok</h1></button>
          <button className='button-emojis'><img src={sad} onClick={(e)=>updateMood(3)}></img><h1 className='text-emoji'>Sad</h1></button>
          <button className='button-emojis'><img src={down} onClick={(e)=>updateMood(4)}></img><h1 className='text-emoji'>Down</h1></button>
          <button className='button-emojis'><img src={bad} onClick={(e)=>updateMood(5)}></img><h1 className='text-emoji'>Bad</h1></button>
  
          </Modal.Body>
          <Modal.Footer>
          
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default ModalEmojis