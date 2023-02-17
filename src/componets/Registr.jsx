import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'


export const Registr = ({setUser}) => {
    const  [name, setName] = useState('');
    const  [email, setEmail] = useState('');
    const  [password, setPassword] = useState('');

    const [nameIsValid, setNameIsValid] = useState(ValidName(name));
    const [emailIsValid, setEmailIsValid] = useState(ValidEmail(email))
    const [passwordValid, setPasswordValid] = useState(ValidPassword(password)) 

    const navigate = useNavigate();

    function ValidName(name) {
        return name.length >= 4
    }

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
    
    function ValidEmail(email) {
        const regExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        return email.match(regExp) !== null
    }

    function ValidPassword(password) {
        const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/
        return password.match(regExp) !== null
    }
    

    let [message, setMessage] = useState(''); 
    function save() {
        
        setNameIsValid(ValidName(name))
        if (!(nameIsValid && emailIsValid && passwordValid)) {
            setMessage(<p>Не корректные данные</p>)

        } else if (localStorage.getItem('name') === name && localStorage.getItem('password') === password) {
            setMessage(<p>Данный пользователй уже зарегестрирован.</p>);
            
            return;
        } else {
            localStorage.setItem('name', name);
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            navigate('/log', { replace: true });
        }
      }
  return (
    
    <form className='BlockInput'>
        <input value={name} placeholder='Name' onChange={e => {setName(e.target.value);setNameIsValid(ValidName(e.target.value))}} style={!nameIsValid ? {backgroundColor: 'rgb(255, 124, 75)'} : {}}/>
        <p style={nameIsValid? {display:'none'} : {color:'red'}}>Не верное имя пользователя</p>
        <input value={email} placeholder='Email' onChange={e => {setEmail(e.target.value);setEmailIsValid(ValidEmail(e.target.value))}} style={!emailIsValid ? {backgroundColor: 'rgb(255, 124, 75)'} : {}}/>
        <p style={emailIsValid? {display:'none'} : {color:'red'}}>Не верный email</p>
        <input value={password} type='password' placeholder='Password' onChange={e => {setPassword(e.target.value);setPasswordValid(ValidPassword(e.target.value))}} style={!passwordValid ? {backgroundColor: 'rgb(255, 124, 75)'} : {}}/>
        <p style={passwordValid? {display:'none'} : {color:'red'}}>Не верный password. Пароль должен состоять не менее чем из 6 символов включая строчные, заглавные, цифры и спецсимволы.</p>
        <div className='BlockBtnReg'>
            <button className='bubbly-button' onClick={save}>Registration</button>
        </div>
        <span style={{color:'red'}}>{message}</span>
    </form>

  )
}