var vue = new Vue({
  el: '#app',
  data:{
    status: 'signup',
    newUser: {
      name: '',
      surname: '',
      email: '',
      password: '',
      iban: ''
    },
    currentUser: null,
    errorMessage: null,
    accounts: [],
    newTransaction: {},
    transactions: [],
    amount: 0
  },
  methods:{
      signup: function() {
          this.errorMessage = null;
          this.$http.post('http://localhost:3001/signup', this.newUser)
          .then(function(response){
            console.log("response:", response)
          })
          .catch(function(err){
            this.errorMessage = err.body.message;
            console.log(err);
          })
      },
      login: function() {
          this.errorMessage = null;
          this.$http.post('http://localhost:3001/login', {email: this.newUser.email, password: this.newUser.password})
          .then(function(response){
              localStorage.setItem('token', response.body.token);
              this.me();
          })
          .catch(function(err){
            this.errorMessage = err.body.message;
            console.log(err);
          })
      },
      logout: function() {
          this.currentUser = null;
          localStorage.removeItem('token');
      },
      me: function() {
          this.$http.get(`http://localhost:3001/me?token=${localStorage.getItem('token')}`)
          .then(function(response){
            console.log("response:", response);
            this.currentUser = response.body;
          })
      },
      createTransaction: function() {
          this.$http.post(`localhost:3001/trans/newTransaction?token=${localStorage.getItem('token')}`, this.newTransaction)
          .then(function(response){
            console.log("response:", response);
            this.newTransaction.iban = '';
            this.newTransaction.amount = 0
           
          })
      },
      allTransaction: function() {
          this.$http.get(`localhost:3001/trans/allTransaction?token=${localStorage.getItem('token')}`)
          .then(function(response){
              console.log("response:", response);
              this.transactions = response.body;
          })
      },
      
      getAllAccount: function() {
          this.$http.get(`localhost:3001/allAccount?token=${localStorage.getItem('token')}`)
          .then(function(response){
              this.accounts = response.body;
          })
      },


  },
  created(){
      if (localStorage.getItem('token')) {
        this.me();
        this.allTransaction();
        this.getAllAccount();

      }
  }
})


// inizio signUP and login

// Get the modal
var modal = document.getElementById('id01');

      // When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Get the modal
var modal = document.getElementById('id011');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
// fine signUP
