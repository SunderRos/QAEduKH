<template>
<div class="image">
    <div class="container">
        <div class="text">Welcome To QAEduKH </div>
        
        <div class="text">
                <div class="input-data" id="text2">
                    Already have an account yet? You can login here.
                </div>
            </div>
             <div class="but" >
                 <input type="submit" @click="signInButton" value="Login">
             </div>
        <form>
            <div>

                <div class="form-row" v-if="result.usernameEmpty">
                    <div class="input-data">
                        <input type="text" v-model="username" placeholder="Username">
                        <label>Please enter username</label>

                    </div>
                </div>
                <div class="form-row" v-else>
                    <div class="input-data">
                        <input type="text" v-model="username" placeholder="Username">
                    </div>
                </div>

                <div class="form-row" v-if="result.emailEmpty">
                    <div class="input-data">
                        <input type="email" v-model="email" placeholder="Email Address">
                        <label>Please enter email address</label>
                    </div>
                </div>
                <div class="form-row" v-else-if="result.uniqueEmail">
                    <div class="input-data">
                        <input type="email" v-model="email" placeholder="Email Address">
                        <label>Email already exists</label>
                    </div>
                </div>
                <div class="form-row" v-else>
                    <div class="input-data">
                        <input type="email" v-model="email" placeholder="Email Address">
                    </div>
                </div>

                <div class="form-row" v-if="result.passwordEmpty || result.password_confirmPasswordCheck || result.invalidPassword">
                    <div class="input-data">
                        <input type="password" v-model="password" placeholder="Password">
                        <label v-if="result.passwordEmpty">Please enter password</label>
                        <label v-else-if="result.password_confirmPasswordCheck">Password and Confirm Password are not matched</label>
                        <label v-else-if="result.invalidPassword">Password contains at least 6 characters</label>
                    </div>
                </div>
                <div class="form-row" v-else>
                    <div class="input-data">
                        <input type="password" v-model="password" placeholder="Password">
                    </div>
                </div>

                <div class="form-row" v-if="result.confirmPasswordEmpty">
                    <div class="input-data">
                        <input type="password" v-model="confirmPassword" placeholder="Confirm Password">
                                            <label>Please enter confirm password</label>

                    </div>
                </div>
                <div class="form-row" v-else>
                    <div class="input-data">
                        <input type="password" v-model="confirmPassword" placeholder="Confirm Password">
                    </div>
                </div>
                <!-- <div class="form-row" submit-btn>
                <div class="input-data">
                    <div class="inner">
                        <input type="submit" @click="signUpButton" value="Sign Up">
                    </div>
                </div>
        </div>
            </div>
             <div class="form-row">
                <div class="input-data" id="text2">
                    Already have an account yet? You can login here.
                </div>
            </div>
             <div class="form-row" submit-btn>
                <div class="input-data">
                    <div class="inner">
                        <input type="submit" @click="signInButton" value="Login">
                    </div>
                </div> -->
            </div>
        </form>
        <div class="but">
           <input type="submit" @click="signUpButton" value="Sign Up">
        </div>
        
    </div>
</div>
</template>

<script>

import axios from 'axios'

export default {
  data() {
    return {
      username:'',
      email: '',
      password: '',
      confirmPassword: '',
      result: {
        usernameEmpty:false, emailEmpty:false, passwordEmpty:false, confirmPasswordEmpty:false, emailCheck:false, password_confirmPasswordCheck:false, uniqeEmail:true, invalidPassword: false
      }
    }
  },
    methods:{
      signInButton(){
        this.$router.push({name: "signin"})
      },
      signUpButton(){
        axios.post('http://localhost:3000/register', {
          username: this.username,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword}).then(result=>{
            console.log(result)
            this.result = result.data;
            console.log(this.result)
            console.log(result.data.success)
           if(result.data.success){
             this.$router.push({name: 'signin'});
           }
          }).catch(err=>{
            console.log(err)
          })
      }
    }
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