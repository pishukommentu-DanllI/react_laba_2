import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';
import { ShowPets } from './componets/ShowPets';
import { Loader } from './componets/Loader';
import { Registr } from './componets/Registr';
import { LogOut } from './componets/LogOut';
import { Login } from './componets/Login';
import { Header } from './componets/Header';
// import { nanoid } from 'nanoid'
import { Carts } from './componets/Carts';
import { Order } from './componets/Order';
import { useNavigate } from 'react-router-dom';



function App() {

  const [message, setMessage] = useState('message');

  const [api, setApi] = useState();
  const [pets, setPets] = useState([]);

  const [carts, setCarts] = useState([]);

  const [user, setUser] = useState(false)

  const [IsPostLoading, setIsPostLoading] = useState(false);

  const [orders, setOrders] = useState([]);

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


  async function get_api_respone(url) {
    let response = await fetch(url)
    
    if (response.ok) {
      let json = await response.json()
      return json;
    } else {
      setApi('Ошибка Http: ' + response.status);
      
    }
  }

  useEffect(() => {
    async function get_posts() {
    setIsPostLoading(true);

    setTimeout( async () => {
      let data = await get_api_respone('https://petstore.swagger.io/v2/pet/findByStatus?status=available');

      const pets = data.reduce((acc, n) => {
        const i = acc.findIndex(m => m.id === n.id);
        if (!~i || !acc[i].checked) {
          acc.push(n);
          if (~i) {
            acc.splice(i, 1);
          }
        }
        return acc;
      }, [])

      setPets(pets)
      setIsPostLoading(false);
    }, 1000)
    }
    get_posts()
  }, [])

  function f(e, id) {
  
    return e.id === id
  }

    
  function add_to_cart(event) {
    if (carts.find((e) => f(e, event.id))) {
        setCarts(carts.map((e, index) => {
          if (e.id === event.id) {
            return {...e, count: e.count + 1}
          } else {
            return e
          }
        }))
    } else {
      setCarts([...carts, {id:event.id, count:1, name:event.name}])
    } 

    setMessage(`${event.name} add To cart`)
    ShowMessage();
  
  }

  function TurnDown(event) {
    let list = []
    for (let e of carts) {
      if (e.id === event.id && e.count - 1 >= 1) {
        list.push({...e, count:e.count - 1})
    } else if (e.id !== event.id) {
        list.push(e)
    }}
  
    setCarts(list);
    
    setMessage(`${event.name} Turn down`)
    ShowMessage();
  }
  
  function Delete_carts(event) {
    let list = [];
    for (let e of carts) {
      if (e.id !== event.id) {
        list.push(e)
      }
    }
    setCarts(list)
  
    setMessage(`${event.name} Delete`)
    ShowMessage();
  }
  function make_Order() {
    setOrders([...carts, ...orders]);
    setCarts([]);
    navigate('/order', { replace: true });
    setMessage("Make order")
    ShowMessage();
  }
  
  function ShowMessage() {
    let b = document.querySelector('.MessageUser');
    b.classList.add('MessageUser_active');
    b.classList.remove('MessageUser_passiv');
  
    setTimeout(() => {
      b.classList.add('MessageUser_passiv');
      b.classList.remove('MessageUser_active');
    }, 3000)
  }

  return (
    <>
      <Header user={user}/>

      <div className='MessageUser MessageUser_passiv'>
        <p className='message'>{message}</p>
      </div>

      <div className='contaner'>
        <Routes>
          <Route path='/' element={IsPostLoading ? <Loader/> : <ShowPets pets={pets} user={user} add_to_cart={add_to_cart}/>}/>
          <Route path='/reg' element={<Registr setUser={setUser}/>}/>
          <Route path='/logout' element={<LogOut setUser={setUser}/>}/>
          <Route path='/log' element={<Login setUser={setUser}/>}/>
          <Route path='/cart' element={<Carts cart={carts} add_to_cart={add_to_cart} TurnDown={TurnDown} Delete_carts={Delete_carts}  make_Order={make_Order}/>}/>
          <Route path='/order' element={<Order orders={orders}/>}/>
        </Routes>

      </div>
    </>
    
  )
}

export default App;
