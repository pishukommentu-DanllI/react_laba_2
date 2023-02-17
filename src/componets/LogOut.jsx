import React from 'react'
import { useNavigate } from 'react-router-dom';

export const LogOut = ({setUser}) => {
    const navigate = useNavigate();
    React.useEffect(() => {
        setUser(false);
        navigate('/', { replace: true });
    }, [])

  return (
    <div>Выход</div>
  )
}
