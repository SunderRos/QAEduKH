<template>
  <div >
  <br>
  <br>
   <div class="top"> ASK YOUR QUESITON HERE </div>
   <div class="container">
      <div class="wrapper">
            <div class="input-data">
            <input type="text" v-model="question">
            <div class="underline"></div>
            <label>WHAT ARE YOU WONDERING ?</label>
         </div>
      </div>
         <div class="but">
            <button class="btn btn-primary" type="submit" @click="askQues">SUBMIT</button>
        </div>
  </div>
   </div>
</template>

<script>
import axios from 'axios'
import Datepicker from 'vue3-datepicker'

export default {
    data() {
        return {
            question: '',
        }
    },
    methods: {
        async askQues() {
                this.$router.push({name: 'ShowQA'})
                await axios.post('http://localhost:3000/addQuestion', {
                    userId: this.$store.state.userData._id,
                    username: this.$store.state.userData.username,
                    question: this.question
                }).then(result => {
                     console.log('added')
                }).catch(err => {
                    console.log(err)
                })
            }
    },
    components:{
      Datepicker
    },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');
*{
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
}
.container {
    height: 80vh;
}
.but {
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0.3em;
}
.top {
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(58, 58, 12);
    font-size: 50px;
    font-weight: 600;
}
body{
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
.wrapper{
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 30px;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
}
.wrapper .input-data{
  height: 30px;
  width: 100%;
  position: relative;
}
.wrapper .input-data input{
  height: 100%;
  width: 100%;
  border: none;
  font-size: 17px;
  border-bottom: 2px solid silver;
}
.input-data input:focus ~ label,
.input-data input:valid ~ label{
  transform: translateY(-20px);
  font-size: 15px;
  color: #4158d0;
}
.wrapper .input-data label{
  position: absolute;
  bottom: 10px;
  left: 0;
  color: grey;
  pointer-events: none;
  transition: all 0.3s ease;
}
.input-data .underline{
  position: absolute;
  height: 2px;
  width: 100%;
  bottom: 0;
}
.input-data .underline:before{
  position: absolute;
  content: "";
  height: 100%;
  width: 100%;
  background: #4158d0;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.3s ease;
}
.input-data input:focus ~ .underline:before,
.input-data input:valid ~ .underline:before{
  transform: scaleX(1);
}
</style>