<template>
    <div id="wrapper">
        <div id="middle-bar">
            <div>
                <ul>
                    <li><router-link :to="{path: '/Home/ShowQA'}">SHOW QA</router-link></li>
                    <li><router-link :to="{path: '/Home/ShowTutorial'}">SHOW TUTORIAL</router-link></li>
                    <li><router-link :to="{path: '/Home/TopUpvote'}">TOP UPVOTE ARTICLES</router-link></li>
                    <li><router-link :to="{path: '/askQuestion'}">ASK QUESTION</router-link></li>
                </ul>
            </div>
            <!-- <div id="ask-question">
                <div>
                    <p>
                        ASK QUESTION
                    </p>
                </div>
                    <div>
                    
                    <div class="col-12 col-md-10 col-lg-8">
                        <form class="card card-sm">
                            <div class="card-body row no-gutters align-items-center">
                                <div class="col-auto">
                                    <img src="../../assets/1200px-Icon-round-Question_mark.svg.png" alt="">
                                </div>
                                <div class="col">
                                    <form>
                                        <input class="form-control form-control-lg form-control-borderless" type="search" @click="askQuestion" v-model="question" placeholder="What are you wondering?">
                                    </form>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div> -->
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            question: '',
        }
    },
    methods: {
        addQuestion() {
            axios.post('http://localhost:3000/addQuestion', {
                question: this.question,
            }).then(result => {
                console.log(result)
                this.result = result.data;
                console.log(this.result)
                console.log(result.data.success)
                if(result.data.success){
                this.$router.push({name: '/Home/ShowQA'});
           }
            }).catch(err=>{
            console.log(err)
              })
        }
    }
}
</script>

<style scoped>

#middle-bar{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
#middle-bar ul{
    margin-top: 0;
    margin-bottom: 0;
    padding: 0;
}
#middle-bar ul li{
    display: inline-block;
    margin-right: 50px;
}
.form-control-borderless {
    border: none;
}

.form-control-borderless:hover, .form-control-borderless:active, .form-control-borderless:focus {
    border: none;
    outline: none;
    box-shadow: none;
}
.card-body{
    padding: 0;
}
#ask-question .col-lg-8, #ask-question .col-md-10, #ask-question .col-12{
    max-width: none;
    padding: 0;
    padding-left: 15px;
}
#ask-question p{
    margin-top: 0;
    margin-bottom: 0;
}

#ask-question{
    display: flex;
    align-items: center;
}

#ask-question img{
    width: 30px;
    margin-left: 10px;
}
a:hover{
    color: #FFC300;
}
a{
   color: white; 
   text-decoration: none;
}
a.router-link-active{
    color: #FFC300;
}
</style>