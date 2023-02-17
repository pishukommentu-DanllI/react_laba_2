import React from 'react'

export const ShowPets = ({pets, user, add_to_cart}) => {
    // console.log(pets)

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

    let res =  pets.map((e, index) => {
        return (
            <div className='BlockPets' key={e.id}>
                <div className='BlockTitle'>
                    <span>{e.name}</span>
                </div>
                {user 
                ? 
                    <div className='BlockBtn'>
                        <button className='bubbly-button' onClick={() => add_to_cart(e)}>Add to Cart</button>
                    </div>
                :
                    ''
                }
                
            </div>
        )
    })
  return (
    <div className='ContenerPets'>{res}</div>
  )
}
