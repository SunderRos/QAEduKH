<template>
<div class="image">
    <div class="container">
        <div class="text">Welcome To QAEduKH</div>
        <div class="text">
                <div class="input-data" id="text2">
                    Don't have an account yet? You can sign up here.
                </div>
            </div>
             <div class="but" >
                 <input type="submit" @click="signUpButton" value="Sign Up">
             </div>

        <form v-if="!result.isMatched">
            <div>
            <div class="form-row">
                    <span style="color: red">Email or Password is not correct</span>
                <div class="input-data">
                    <input type="email" v-model="email" placeholder="Email">                    
                </div>
            </div>
            <div class="form-row">
                <div class="input-data">
                    <input type="password" placeholder="Password" v-model="password">
                </div>
            </div>
            </div>
        </form>

        <form v-else>
            <div>
            <div class="form-row" v-if="result.emailEmpty">
                <div class="input-data">
                    <input type="email" v-model="email">
                    <div class="input-data">
                        <span style="color: red">Please enter email</span>
                    </div>
                </div>
            </div>
             <div class="form-row" v-else-if="result.uniqueEmail">
                <div class="input-data">
                    <input type="email" v-model="email">
                    <div class="input-data">
                        <span style="color: red">Email already exists, Please try another one.</span>
                    </div>
                </div>
            </div>
            <div class="form-row" v-else>
                <div class="input-data">
                    <input type="email" v-model="email" placeholder="Email">
                </div>
            </div>
             <div class="form-row" v-if="result.passowrdEmpty || result.password_confirmPasswoedCheck || result.invalidPassword">
                <div class="input-data">
                    <input type="password" v-model="password">
                    <div class="input-data" v-if="result.passowrdEmpty">
                    <div class="input-data"><span style="color: red">Please enter password</span></div>
                </div>
                <div class="input-data" v-else-if="result.password_confirmPassowoedCheck">
                <div class="input-data"><span style="color: red">Password and Confirm Password are not matched</span></div> 
                </div>
                <div class="input-data" v-else-if="result.invalidPassword">
                    <div class="input-data"><span style="color: red">Password must be at least 6 characters</span></div>
                </div>
                </div>
            </div>
            <div class="form-row" v-else>
                <div class="input-data">
                    <input type="password" v-model="password" placeholder="Password">
                </div>
            </div>
          
            </div>
        </form>
         <div class="but">
            <input type="submit" @click="signInButton" value="Login">
        </div>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      email:"",
      password:"",
      result: {emailEmpty: false, passwordEmpty: false, isMatched: true}
    }
  },
    methods:{
      signUpButton(){
        this.$router.push({name: "signup"})
      },
      signInButton(){
        this.$store.dispatch('login', {
          email: this.email,
          password: this.password,
        }).then(result=>{
          this.result = result.data;
          if(result.data.success){
            this.$router.push('/')
          }
          else if(result.data.block){
            alert("Your account has been banned!");
          } 
        }).catch(err=>{
          console.log(err);
        })
      }
    },

}
</script>
<style scoped>
*{
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
.image{
     background: url('../assets/backgroundm.png') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 40px;
  /* background: linear-gradient(115deg, #56d8e4 10%, #9f01ea 90%); */
}
.container{
  max-width: 800px;
  background: #fff;
  width: 800px;
  padding: 25px 40px 10px 40px;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
}
.container .text{
  text-align: center;
  font-size: 35px;
  font-weight: 600;
  background: -webkit-linear-gradient(right, #55c246, #9aee73, #df752f, #dd2d2d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.container #text2{
    text-align: center;
  font-size: 20px;
  font-weight: 600;
  background: -webkit-linear-gradient(right, #55c246, #9aee73, #df752f, #dd2d2d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.container form{
  padding: 30px 0 0 0;
}
.container form .form-row{
  display: flex;
  margin: 32px 0;
}

.but {
    display: flex;
    justify-content: center;
}

.but input {
    border: none;
    padding: 0.5em;
    border-radius: 0.25em;
    background-color: rgb(209, 236, 55);
    font-size: 1.3em;
    color: #305e1b;
    font-weight: 500;
}

form .form-row .input-data{
  width: 100%;
  height: 40px;
  margin: 0 20px;
  position: relative;
}
form .form-row .textarea{
  height: 70px;
}
.input-data input,
.textarea textarea{
  display: block;
  width: 100%;
  height: 100%;
  border: none;
  font-size: 17px;
  border-bottom: 2px solid rgba(0,0,0, 0.12);
}
.input-data input:focus ~ label, .textarea textarea:focus ~ label,
.input-data input:valid ~ label, .textarea textarea:valid ~ label{
  transform: translateY(-20px);
  font-size: 14px;
  color: #d1425a;
}
.textarea textarea{
  resize: none;
  padding-top: 10px;
}
.input-data label{
  position: absolute;
  pointer-events: none;
  bottom: 10px;
  font-size: 16px;
  transition: all 0.3s ease;
}
.textarea label{
  width: 100%;
  bottom: 40px;
  background: #fff;
}
.input-data .underline{
  position: absolute;
  bottom: 0;
  height: 2px;
  width: 100%;
}
.input-data .underline:before{
  position: absolute;
  content: "";
  height: 2px;
  width: 100%;
  background: #d1425a;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.3s ease;
}
.input-data input:focus ~ .underline:before,
.input-data input:valid ~ .underline:before,
.textarea textarea:focus ~ .underline:before,
.textarea textarea:valid ~ .underline:before{
  transform: scale(1);
}
.submit-btn .input-data{
  overflow: hidden;
  height: 45px!important;
  width: 25%!important;
}
.submit-btn .input-data .inner{
  height: 100%;
  width: 300%;
  position: absolute;
  left: -100%;
  background: -webkit-linear-gradient(right, #56d8e4, #9f01ea, #56d8e4, #9f01ea);
  transition: all 0.4s;
}
.submit-btn .input-data:hover .inner{
  left: 0;
}
.submit-btn .input-data input{
  background: none;
  border: none;
  color: #fff;
  font-size: 17px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  position: relative;
  z-index: 2;
}
@media (max-width: 700px) {
  .container .text{
    font-size: 30px;
  }
   .container #text2{
    font-size: 15px;
  }
  .container form{
    padding: 10px 0 0 0;
  }
  .container form .form-row{
    display: block;
  }
  form .form-row .input-data{
    margin: 35px 0!important;
  }
  .submit-btn .input-data{
    width: 40%!important;
  }
   .invalid-feedback{
   position:absolute;
   bottom: -20px;
 }
}

</style>