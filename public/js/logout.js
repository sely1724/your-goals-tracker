// logout button click event handler
const logout = async () => {
   const response = await fetch('/api/user/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
   });

   if (response.ok) {
      // if successful, redirect to homepage
      document.location.replace('/');
   } else {
      // if unsuccessful, display an alert
      alert('Failed to log out.');
   }
};

document.querySelector('#logout-button').addEventListener('click', logout);