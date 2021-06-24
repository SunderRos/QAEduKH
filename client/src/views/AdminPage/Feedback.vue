<template>
                <table class="table fixed_header">
                    <thead>
                        <tr>
                        <th class="id">USERNAME</th>
                        <th class="username">SUBJECT</th>
                        <th class="email">FEEDBACK</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="feedback in feedbacks" v-bind:key="feedback._id">
                        <th class="id">{{feedback.username}}</th>
                        <td class="username">{{feedback.feedbackTitle}}</td>
                        <td class="email">{{feedback.message}}</td>
                        <td>
                            <a :href="`#myModal${feedback._id}`" class="trigger-btn" data-toggle="modal"><img src="../../assets/delete.png" alt="" class="action-delete"></a>
                        </td>
                         <div :id="`myModal${feedback._id}`" class="modal fade">
                            <ConfirmModalFeedback :feedback="feedback"></ConfirmModalFeedback>
                        </div>   
                        </tr>
                       
                    </tbody>
                </table>

    
    
</template>

<script>
import axios from 'axios'
import ConfirmModalFeedback from '../../components/ConfirmModalFeedback.vue'
export default {
    data() {
        return {
            feedbacks: []
        }
    },
    components:{
        ConfirmModalFeedback,
    },
    methods:{
      
    },
    mounted() {
            axios.get("http://localhost:3000/getUser").then(result =>{
                this.users = result.data;
            }).catch(err =>{
                console.log(err)
            })
              axios.get("http://localhost:3000/getQuestion").then(result => {
                this.questions = result.data;
            }).catch(err => {
                console.log(err)
            })
            axios.get("http://localhost:3000/getFeedback").then(result => {
                this.feedbacks = result.data;
            }).catch(err => {
                console.log(err)
            })
        },
}
</script>

<style scoped>



table .action-delete{
    width: 40px;
}
table .action-block{
    width: 30px;
}
table td{
    vertical-align: middle;
}

.fixed_header{
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
}

.fixed_header tbody{
  display: block;
  width: 100%;
  overflow: auto;
  height: 650px;
}

.fixed_header thead tr {
   display: block;
}


.fixed_header th, .fixed_header td {
  /* padding: 5px;
  text-align: left; */
  width: 200px;
}
.fixed_header .title{
    width: 300px;
    
}
.fixed_header .id{
    width: 100px;
    vertical-align: middle;
    
}

.fixed_header .username{
    width: 200px;
    
}
.fixed_header .email{
    width: 300px;
    
}
.admin-icon{
    width: 40px;
    position: relative;
    left: 10px;
}


/* #right-side thead th {
    position: sticky;
    top: 0;
    background-color: white;
    border-bottom: 2px solid black;

} */


</style>