<template>
    <div id="wrapper">
        <div class="container">
        <ul>
        <li v-for="ques in questions" :key="ques._id">
            <h2>{{ques.question}}</h2>
            <p>asked by: {{ques.username}}</p>
            <p>{{ques.questionAt}}</p>
                <textarea placeholder="ANSWER HERE !" v-model="answer"></textarea>
                <div class="btn">
                        <li v-for="ans in answers" :key="ans._id">
                            <div id="anss" v-if="ans.questionId === ques._id">
                                <div class="box">
                                <h3>{{ans.answer}}</h3>
                                <h6>answered by: {{ans.username}}</h6>
                                <p>{{ans.answerAt}}</p>
                                </div>
                            </div>
                        </li>
                    <input type="submit" value="View Answer" @click="showAnswer(ques._id)">
                    <input type="submit" value="Answer" @click="addAnswer(ques._id)">
                </div>
        </li>
        </ul>
    </div>
    </div>
      <!-- <div >
  
   <h3>ASK YOUR QUESITON HERE</h3>
   <div class="container">
      <div class="wrapper">
            <div class="input-data">
            <input type="text" v-model="answer">
            <div class="underline"></div>
            <label>WHAT ARE YOU WONDERING ?</label>
         </div>
      </div>
         <div class="but">
            <button class="btn btn-primary" type="submit" @click="addAnswer">SUBMIT</button>
        </div>
  </div>
   </div> -->
</template>

<script>

import axios from 'axios'
import Answer from '../../components/Answer.vue'
import Datepicker from 'vue3-datepicker'
export default {
    data() {
        return {
            questions: [], 
            answers: [],
            // allanswers: [],
            isHidden: false,
            selected: {},
            allanswers: []
        }
    },
    components: {
        Answer,
        Datepicker
    },
    methods: {
        async addAnswer(id) {
                await axios.post('http://localhost:3000/addAnswer', {
                    questionId: id,
                    username: this.$store.state.userData.username,
                    answer: this.answer,
                }).then(result => {
                    window.location.reload()
                     console.log('added')
                }).catch(err => {
                    console.log(err)
                })
            },
      async showAnswer(id) {
          await axios.post("http://localhost:3000/getUserAnswerByQuestionId", {
              questionId: id
          }).then(result => {
              this.answers = result.data;
              console.log(result)
          }).catch(err => {
              console.log(err)
          })
      },
        // select(question) {
        //     this.selected = question
        // },
        test(id) {
            alert(id)
        }
    },
    async mounted() {
        axios.get('http://localhost:3000/getQuestion').then(result => {
            this.questions = result.data
        }).catch(err => {
            console.log(err)
        })
        axios.get('http://localhost:3000/getAnswer').then(result => {
            this.allanswers = result.data
        }).catch(err => {
            console.log(err)
        })
    }
}
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
p {
    font-weight: bold;
}
#wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color:coral;
}
.container {
    width: 600px;
    padding: 15px 10px;
}
li {
    border: 1px solid #333;
}
#anss {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
}
.box {
    margin: 0;
    padding: 20px;
    border-radius: 0.5%;
    position: relative;
    width: 570px;
    height: 150px;
    resize: vertical;
    overflow:auto;
    background: #fff;
}

.container h2 {
    text-align: center;
    margin-bottom: 5px;
    color: black;
}
p {
    display: flex;
    font-size: 1em;
    justify-content: center;
    text-align: center;
    font-weight: bold;
    color: #333;
}
textarea {
    height: 40px;
    width: 570px;
    border: none;
    border-bottom: 2px solid #321f31;
    background-color: transparent;
    margin-bottom: 10px;
    resize: none;
    outline: none;
}

input[type="submit"], button {
    padding: 10px 15px;
    border: none;
    outline: none;
    border-radius: 5px;
    text-transform: uppercase;
    font-weight: bold;
    cursor: pointer;
    margin-right: 10px;
}

input[type="submit"] {
    color: #fff;
    background-color: #273c75;
}

li {
    border: none;
    border-style: none;
    list-style: none;
}

button {
    color: #333;
    background-color: transparent;
}
</style>