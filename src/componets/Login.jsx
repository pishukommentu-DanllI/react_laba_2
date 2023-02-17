import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Login = ({setUser}) => {
    const  [name, setName] = useState('');
    const  [password, setPassword] = useState('');

    const [valid, setValid] = useState(true);

    let [message, setMessage] = useState(''); 

    const navigate = useNavigate();

    let animateButton = function(e) {

        e.target.classList.remove('animate');
        
        e.target.classList.add('animate');
        setTimeout(function(){
          e.target.classList.remove('animate');
        },700);
      };
      
      let bubblyButtons = document.getElementsByClassName("bubbly-button");
      
      for (var i = 0; i < bubblyButtons.length; i++) {
        bubblyButtons[i].addEventListener('click', animateButton, false);
      }

      
    function login() {
        let nameLocal = localStorage.getItem('name');
        let passwordLocal = localStorage.getItem('password');

        if (nameLocal === name && password === passwordLocal) {
            setUser(true);
            navigate('/', { replace: true });
        } else {
            setValid(false)
            setMessage(<p style={{color:'red'}}>Не верные данные</p>)
        }
    }
  return (
    <>
    <form className='BlockInput' onSubmit={e => e.preventDefault()}>
        <input value={name} placeholder='Name' onChange={e => setName(e.target.value)} style={!valid ? {backgroundColor: 'rgb(255, 124, 75)'} : {}}/>
        <input value={password} type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} style={!valid ? {backgroundColor: 'rgb(255, 124, 75)'} : {}}/>
        <div className='BlockBtnLog'>
            <button className='bubbly-button' onClick={login}>Login</button>
        </div>
    </form>
    {message}
    </>
  )
}