<template>
                <table class="table fixed_header">
                    <thead>
                        <tr>
                        <th class="id">No</th>
                        <th class="username">USERNAME</th>
                        <th class="email">EMAIL</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, index) in users" v-bind:key="user._id">
                        <th class="id">{{index+1}}</th>
                        <td class="username">{{user.username}}</td>
                        <td class="email">{{user.email}}</td>
                        <td v-if="user.admin">
                            <img src="../../assets/79785398d8508e60b512cb61ae7b438ff2963685_hq.jpeg" alt="" class="admin-icon">
                        </td>
                        <td v-else>
                            <a href="#" v-if="user.block" v-on:click="btnUnblock(user._id)"><img src="../../assets/Unblock.png" alt="" class="action-block"></a>
                            <a href="#" v-else v-on:click="btnBlock(user._id)"><img src="../../assets/Block.png" alt="" class="action-block" ></a>
                            <a :href="`#myModal${user._id}`" class="trigger-btn" data-toggle="modal"><img src="../../assets/delete.png" alt="" class="action-delete"></a>
                        </td>
                         <div :id="`myModal${user._id}`" class="modal fade">
                            <ConfirmModalUser :user="user"></ConfirmModalUser>
                        </div>   
                        </tr>
                       
                    </tbody>
                </table>

    
    
</template>

<script>
import axios from 'axios'
import ConfirmModalUser from '../../components/ConfirmModalUser'
export default {
    data() {
        return {
            users: []
        }
    },
    components:{
        ConfirmModalUser,
    },
    methods:{
        btnDelete(id){
            axios.delete("http://localhost:3000/deleteUser", { data: {id}}).then(result=>{
                if(result.data.success){
                    this.users = this.users.filter(user => user._id != id);
                }
            }).catch(err=>{
                console.log(err);
            })
        },

        btnBlock(id){
            axios.post("http://localhost:3000/blockUser", {id}).then(result=>{
                if(result.data.success){
                    console.log("Success");
                    this.users[this.users.findIndex(user=> user._id == id)].block = true;
                }
            }).catch(err=>{
                console.log(err);
            })
        },

        btnUnblock(id){
            axios.post("http://localhost:3000/unblockUser", {id}).then(result=>{
                if(result.data.success){
                    this.users[this.users.findIndex(user=> user._id == id)].block = false;
                }
            }).catch(err=>{
                console.log(err);
            })
        }

        
    },
    mounted() {
            axios.get("http://localhost:3000/getUser").then(result =>{
                this.users = result.data;
            }).catch(err =>{
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