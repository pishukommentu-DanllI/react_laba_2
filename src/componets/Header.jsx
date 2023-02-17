import React from 'react'
import {Routes, Route} from 'react-router-dom';
import {Link} from 'react-router-dom';

export const Header = ({user}) => {
  return (
    <header>

        <div className='BlockHello'>
            {user 
            ?
                <h3 style={{color: 'white'}}>Hello, {localStorage.getItem('name')}</h3>
            : 
                ""
            }
        </div>

        <nav>
        <Routes>
        
            <Route path='/' element={
                <>  
                {user ? 
                    <>
                    <Link to='/cart'>Cart</Link>
                    <Link to='/order'>Order</Link>
                    <Link to='/logout'>LogOut</Link>
                    </>
                :
                    <>
                    <Link to='/reg'>Registration</Link>
                    <Link to='/log'>Login</Link>
                    </>
                }
                </>
            }/>

            <Route path='/reg' element={
                <>
                <Link to='/'>Home</Link>
                <Link to='/log'>Login</Link>
                </>
            }/>

            
            <Route path='/log' element={
                <>
                    <Link to='/'>Home</Link>
                    <Link to='/reg'>Registration</Link>
                </>
            }/>

            <Route path='/cart' element={
                <>
                    <Link to='/'>Home</Link>
                    <Link to='/order'>Order</Link>
                    <Link to='/logout'>LogOut</Link>
                </>
            }/>

            <Route path='/order' element={
                <>
                    <Link to='/'>Home</Link>
                    <Link to='/cart'>Cart</Link>
                    <Link to='/logout'>LogOut</Link>
                </>
            }/>

        </Routes>

            
        </nav>
    </header>
  )
}