import React from 'react'

export const Order = ({orders}) => {
    let res = orders.map((e) => {
        return (
            <div className='BlockCart' key={e.id}>
                <div className='BlockInfoCart'>
                    <p>{e.name}</p>
                    <p>Count: {e.count}</p>
                </div>
            </div>
        )
    })
  return (
    <div className='ContanerCart'>
        {res.length  !== 0
        ?
            orders.map((e) => {
                return (
                    <div className='BlockCart' key={e.id}>
                        <div className='BlockInfoCart'>
                            <p>{e.name}</p>
                            <p>Count: {e.count}</p>
                        </div>
                    </div>
                )
            })
        :
            <p>Тут пусто</p>
        }
    </div>
  )
}
