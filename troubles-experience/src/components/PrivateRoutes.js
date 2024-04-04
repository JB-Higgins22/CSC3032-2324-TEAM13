import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    try{
        localStorage.setItem('auth', ""); 
        const token = localStorage.getItem('token')
        fetch('http://localhost:4000/checkUser', {
            method: 'GET',
            headers: {
                'token': `Bearer ${token}`,
            },
        })
        .then(async response => {
            if(response.ok){
                
                localStorage.setItem('auth', true);  
            }
            else{
                localStorage.setItem('auth', "");
            }
        })
    }catch{
        console.error('Error submitting login details')
    }
    const auth = {'token': (Boolean(localStorage.getItem('auth'))).valueOf()};
    return(auth.token ? <Outlet/> : <Navigate to="/login"/>)
}



export default PrivateRoutes