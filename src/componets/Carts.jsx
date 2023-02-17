import React from 'react'

export const Carts = ({cart, Delete_carts, add_to_cart, TurnDown, make_Order}) => {
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

    let res = cart.map((e) => {
        return (
            <div key={e.id} className='BlockCart'>
                <div className='BlockInfoCart'>
                    <p>{e.name}</p>
                    <p>Count: {e.count}</p>
                </div>

                <div className='BlockBtn'>
                    <button className='bubbly-button' onClick={() => add_to_cart(e)}>Add</button>
                    <button className='bubbly-button' onClick={() => TurnDown(e)}>Turn down</button>
                    <button className='bubbly-button' onClick={() => Delete_carts(e)}>Delete</button>
                </div>
            </div>
        )
    })
  return (
    <>
        <div className='ContanerCart'>
            {res.length !== 0 
            ? 
                cart.map((e) => {
                    return (
                        <div key={e.id} className='BlockCart'>
                            <div className='BlockInfoCart'>
                                <p>{e.name}</p>
                                <p>Count: {e.count}</p>
                            </div>
            
                            <div className='BlockBtn'>
                                <button className='bubbly-button' onClick={() => add_to_cart(e)}>Add</button>
                                <button className='bubbly-button' onClick={() => TurnDown(e)}>Turn down</button>
                                <button className='bubbly-button' onClick={() => Delete_carts(e)}>Delete</button>
                            </div>
                        </div>
                    )
                })
            : 
                <span>Тут пусто</span>}
        </div>
        {res.length !== 0 
        ?
            <div className='BlockBtnOrder'>
                <button className='bubbly-button' onClick={() => make_Order()}>Make Order</button>
            </div>
        :
            ''
        }
    </>
  )
}
