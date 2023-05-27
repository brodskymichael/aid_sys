import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import imagen from '../assets/image.svg';
import videoi from '../assets/video.svg';
import question from '../assets/question.svg';
import uploadMedia from '../assets/uploadMedia.svg';
import '../styles/modalUsersB.css';
import Form from 'react-bootstrap/Form';
import { postMessage, sendQuestion } from '../redux/actions/index';
import { useDispatch } from 'react-redux';
import { flushSync } from 'react-dom';







const ModalUsersB = ({show, handleClose, handleShow, userB, userA, socket}) => {
  const [textarea, setTextarea] = useState('')
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [loading, setLoading] = useState("")
  const [loadingV, setLoadingV] = useState("")
  
    
  //console.log(user[0])

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "Images");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dnhajywli/image/upload",
      {
        method: "POST",
        body: data,
      }
    )
    const file = await res.json();
    //console.log(file.secure_url)
    
    setImage(file.secure_url)
    
    setLoading(false)
    
    document.getElementById('img').style.display = "block"

  }
  const uploadVideo = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "Images");
    setLoadingV(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dnhajywli/video/upload",
      {
        method: "POST",
        body: data,
      }
    )
    const file = await res.json();
    //console.log(file.secure_url)
    
    setVideo(file.secure_url)
    
    setLoadingV(false)
    
    document.getElementById('vid').style.display = "block"

  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(textarea)
    //console.log(image)
    let form = {
      body: textarea,
      image: image,
      video: video,
      receptorid: userA._id,
      emisorid:userB._id
    }
    
    socket.emit("newMessage", form);
    
    //dispatch(postMessage(form))
    handleClose()
    setImage('')
    setVideo('')
    setTextarea('')
    
    document.getElementById('img').style.display = "none"
    document.getElementById('vid').style.display = "none"
  }
  const showFileInput = () =>{
    document.getElementById('textarea-id').style.display = "none"
    document.getElementById('file-id').style.display = "block"
    document.getElementById('video-id').style.display = "none"
  }
  const showTextInput = () =>{
    document.getElementById('textarea-id').style.display = "block"
    document.getElementById('file-id').style.display = "none"
    document.getElementById('video-id').style.display = "none"
  }
  const showVideoInput = () =>{
    document.getElementById('textarea-id').style.display = "none"
    document.getElementById('file-id').style.display = "none"
    document.getElementById('video-id').style.display = "block"
  }

  const sendQuestion2 = ()=>{

    socket.emit("askMood", {user: userA._id});
    //dispatch(sendQuestion({user: userA._id}))
    //handleClose()
    alert('Question for mood sent!')
  }

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
          <Modal.Title>Send media to user: {userA.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Control as="textarea" id='textarea-id' rows={3} placeholder='What do you want to talk about?' onChange={(e) => setTextarea(e.target.value)} />
              <Form.Control id='file-id' type="file" accept="image/png, image/jpeg, image/jpg" style={{display: 'none'}} onChange={uploadImage}/>
              {loading? ( <h3>Loading Images...</h3>) : <></>}
              <img src={image} style={{width:'200px', height:'250px', display:'none'}} id="img" />
              <Form.Control id='video-id' type="file" accept="video/*" style={{display: 'none'}} onChange={uploadVideo}/>
              {loadingV? ( <h3>Loading Video...</h3>) :<></>}
              <video src={video} style={{width:'200px', height:'250px',display:'none'}} id="vid"/>
            </Form.Group>   
            <Form.Group>
              <button type='button' className='options-media' onClick={showFileInput}><img src={imagen}/> Image</button>
              <button type='button' className='options-media'  onClick={showVideoInput}><img src={videoi}/> Video</button>
              <button className='options-media' onClick={sendQuestion2} type="button"><img src={question}/> Question</button>
              <button type='button' className='options-media' onClick={showTextInput}><img src={uploadMedia}/> Text</button>
            </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className='botonesAbajo' onClick={handleClose}>
            Cancel
          </button>
          <button className='botonesAbajo' onClick={handleSubmit}>
            Send
          </button>
        </Modal.Footer>
      </Modal>
    </>

  );
}

export default ModalUsersB