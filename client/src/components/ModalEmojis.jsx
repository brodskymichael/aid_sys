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
import Swal from 'sweetalert2';

const ModalEmojis = ({show, handleClose, handleShow,usuario, socket}) => {
  if(show){
    const dispatch = useDispatch()
    const [moodSelected, setMood] = useState(0)

    const updateMood= async (mood)=>{
      setMood(mood)
    }

    const sendMood = ()=>{
      //await dispatch(changeMood({user:usuario,mood:mood}))
      if(moodSelected){
        socket.emit("updateMood", {user:usuario,mood:moodSelected});
        handleClose()
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Please select a mood to send!",
        })
      }
      
    }
    return (
      <>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          //style={{height:'400px', width: '600px', overflow:'hidden'}}
        >
          <Modal.Header>
            <Modal.Title className='tittle-modal'>Choose mood</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {moodSelected?
          <p>Mood selected: {moodSelected==1? <img src={goodMood} />:<></>}
          {moodSelected==2? <img src={ok} />:<></>}
          {moodSelected==3? <img src={sad} />:<></>}
          {moodSelected==4? <img src={down} />:<></>}
          {moodSelected==5? <img src={bad} />:<></>}
          </p>:<></>
          }
          <button className='button-emojis'><img src={goodMood} onClick={(e)=>updateMood(1)}></img><h1 className='text-emoji'>Good Mood</h1></button>
          <button className='button-emojis'><img src={ok} onClick={(e)=>updateMood(2)}></img><h1 className='text-emoji'>Ok</h1></button>
          <button className='button-emojis'><img src={sad} onClick={(e)=>updateMood(3)}></img><h1 className='text-emoji'>Sad</h1></button>
          <button className='button-emojis'><img src={down} onClick={(e)=>updateMood(4)}></img><h1 className='text-emoji'>Down</h1></button>
          <button className='button-emojis'><img src={bad} onClick={(e)=>updateMood(5)}></img><h1 className='text-emoji'>Bad</h1></button>
  
          </Modal.Body>
          <Modal.Footer>
          <button onClick={sendMood}>OK</button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default ModalEmojis