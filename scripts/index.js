 // DOM elements
const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

const setupUI = (user) =>{
   //Toggle UI elements
   if(user){
      // account info
         const html = `
         <div>Logged in as ${user.email}</div>
      `;
      accountDetails.innerHTML = html;

      loggedInLinks.forEach(item => item.style.display = 'block');
      loggedOutLinks.forEach(item => item.style.display = 'none');
   }
   else{
      // clear account info
      accountDetails.innerHTML = '';

      loggedOutLinks.forEach(item => item.style.display = 'block');
      loggedInLinks.forEach(item => item.style.display = 'none');
   }
}
// setup guides
const setupGuides = (data) => {
   if(data.length){
      let html = '';
      data.forEach(doc => {
         const posts = doc.data();
         if(posts.userID == auth.currentUser.uid || posts.userID == 0){
            
            const li = `
               <li >
               <div class="collapsible-header "> <h4> ${posts.title} </h4> </div>
               <div class="collapsible-body white" id = ""> 
                  <p> ${posts.content} </p>
               </div>
               
               </li>
            `;
            html += li;
         }

      });
      guideList.innerHTML = html
   }
   else{
      guideList.innerHTML = '<h4 class="center-align">Login to learn more.</h4> '
   }
};
 
// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});