<template>
                <table class="table fixed_header">
                    <thead>
                        <tr>
                        <th class="id">No</th>
                        <th class="username">USERNAME</th>
                        <th class="email">QUESTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(ques, index) in questions" v-bind:key="ques._id">
                        <th class="id">{{index+1}}</th>
                        <td class="username">{{ques.username}}</td>
                        <td class="email">{{ques.question}}</td>
                        <td>
                            <a :href="`#myModal${ques._id}`" class="trigger-btn" data-toggle="modal"><img src="../../assets/delete.png" alt="" class="action-delete"></a>
                        </td>
                         <div :id="`myModal${ques._id}`" class="modal fade">
                            <ConfirmModalQues :ques="ques"></ConfirmModalQues>
                        </div>   
                        </tr>
                       
                    </tbody>
                </table>

    
    
</template>

<script>
import axios from 'axios'
import ConfirmModalQues from '../../components/ConfirmModalQues'
export default {
    data() {
        return {
            questions: []
        }
    },
    components:{
        ConfirmModalQues,
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