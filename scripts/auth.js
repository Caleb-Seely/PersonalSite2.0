// listen for auth status changes

auth.onAuthStateChanged(user => {
   if (user) {
     console.log('user logged in: ', user);
     db.collection('Notes').onSnapshot(snapshot => {
         setupGuides(snapshot.docs);
         setupUI(user);
    });
   } else {
      setupUI();
      setupGuides([]);
   }
 })

// create new guide
const createForm = document.querySelector('#create-form');

createForm.addEventListener('submit', (e) => {
   
  e.preventDefault();
  db.collection('Notes').add({
    title: createForm.title.value,
    content: createForm.content.value,
    userID: auth.currentUser.uid
  }).then(() => {
    // close the create modal & reset form
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    createForm.reset();
  }).catch(err => {
    console.log(err.message);
  });
});

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  //const email = signupForm['signup-email'].value;      //Uncomment these two lines for public access
  //const password = signupForm['signup-password'].value;

  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    console.log(cred.user);
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
   //  M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut()
});


// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('logins').add({
   email: loginForm['login-email'].value,
   password: loginForm['login-password'].value
   }).then(() =>{
      // get user info
      const email = loginForm['login-email'].value;
      const password = loginForm['login-password'].value;


         console.log(email + password);
      // log the user in
      auth.signInWithEmailAndPassword(email, password).then((cred) => {
         console.log(cred.user);
         // close the signup modal & reset form
         const modal = document.querySelector('#modal-login');
         M.Modal.getInstance(modal).close();
         loginForm.reset();
      });      
   })  


});