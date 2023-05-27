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

const Messages = ({show, handleClose, messages, users}) => {
  if(messages && messages.length){
   let rev= messages.slice().reverse()
   console.log(messages)
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className='pic-msg'>
          {rev?.map((e,i)=>{
            return (
              <div className='msg' key={i}>
                {users?.map((u)=>{
                  if(u._id===e.emisorid) return (<h5 key={i}>Message from: {u.user}</h5>)
                })}
                <p key={i}>{e.body}</p>
                {e.image?<img src={e.image} width='200px' height='250px' key={i}></img>:<></>}
                {e.video?<video src={e.video} width='200px' height='250px' key={i}></video>:<></>}
              </div>
            )
          })}
 
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
    return(<></>)
}

export default Messages