const AuthenticateUser =async () =>{
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:4000/checkUser', {
          method: 'GET',
          headers: {
            'token': `Bearer ${token}`,
          },
        });
        if (response.ok) {
            return true;

        } else {
            return false;
        }
      } catch (error) {
        console.error('Error checking user authentication:', error);
        ; 
      }

return false;
}
export default AuthenticateUser;