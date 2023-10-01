import React from 'react';
import {FaFileImage,FaPaperPlane } from "react-icons/fa";

const MainMessage= ({inputHandle,newMessage,sendMessage,emojiSend,ImageSend}) => {
 
     const emojis = [
          '😀', '🤭', '😄', '😁',
          '😗', '😅', '😂', '🤣',
          '😊', '😇', '🙂', '🙃',
          '😉', '😌', '😍', '😝',
          '😜', '🧐', '🤓', '😎',
          '😕', '🤑', '🥴', '😱'
      ]


  return (

     <div className='message-send-section'>
          <input type="checkbox" id='emoji' />
             

          <div className='file hover-image'>
               <div className='add-image'>
                    Add Image 
               </div>
               <input onChange={ImageSend} type="file" id="pic" className='form-control' />
               <label htmlFor='pic'> <FaFileImage/> </label>
          </div>
          
         

     <div className='message-type'>
          <input type="text" onChange={inputHandle} name='message' id='message' placeholder='Aa' className='form-control' value={newMessage}/>
          <div className='file hover-gift'>
               <label htmlFor='emoji'> 😃 </label>
          </div>
     </div>

     <div onClick={sendMessage} className='file'>
     <FaPaperPlane/>
     </div>

     <div className='emoji-section'>
          <div className='emoji'>
               {
                    emojis.map(e => <span onClick={()=>emojiSend(e)} >{e}</span>)
              
              }

          </div>
     </div>

     </div>
  )
};

export default MainMessage;