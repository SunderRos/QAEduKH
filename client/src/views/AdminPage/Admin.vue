<template>
    <div id="wrapper">
       <div class="container">
           <div id="top-bar">
               <div id="logo">
                  <a href="#" @click="backhome">  <img src="../../assets/LogoMakr-4CIYGM.png" alt=""></a>
                </div>
                <div>
                  <div id="user-top">
                    <p>{{getUserData.username}}</p> <img id="prof" src="../../assets/79785398d8508e60b512cb61ae7b438ff2963685_hq.jpeg" alt="">
                     <div class="dropdown">
                            <button class="btn btn-primary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img src="../../assets/profile-setting.png" alt="">
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <a class="dropdown-item" href="#" v-on:click="pushAdmin" v-if="getUserData.admin">Manage Articles</a>
                                <a class="dropdown-item" href="#">Profile</a>
                                <a class="dropdown-item" href="#" @click="gouser">As user</a>
                                <a href="#" class="dropdown-item">Setting</a>
                                <a class="dropdown-item" href="#" v-on:click="logout">Logout</a>
                            </div>
                        </div>
                  </div>
                </div>
           </div>
       </div>
    </div>
     <div class="row" id="wrape2">
            <div class="col-3" id="left-side">
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">Tutorial, Question & User Management</th>
                        </tr>
                    </thead>
                    <tbody id="nav">
                        <tr>
                            <td scope="row"><router-link :to="{name: 'Blog'}"><div class="i1" style="height:100%;width:100%"><img src="../../assets/tuto.png" alt="">Tutorial</div></router-link></td>
                        </tr>
                        <tr>
                            <td scope="row"><router-link :to="{name: 'User'}"><div class="i2" style="height:100%;width:100%"><img src="../../assets/anime-icon-png-13.jpeg" alt="">User</div></router-link></td>
                        </tr>
                           <tr>
                            <td scope="row"><router-link :to="{name: 'Question'}"><div class="i2" style="height:100%;width:100%"><img src="../../assets/download.png" alt="">Question</div></router-link></td>
                        </tr>
                         <tr>
                            <td scope="row"><router-link :to="{name: 'Feedback'}"><div class="i2" style="height:100%;width:100%"><img src="../../assets/download.png" alt="">Feedback</div></router-link></td>
                        </tr>
                    </tbody>
                    <br>
                    <br>
                
                </table>
            </div>
            <div class="col-9" id="right-side">
          <router-view></router-view>
            </div>
     </div>
    
</template>

<script>
export default {
 methods: {
        pushAdmin(){
            this.$router.push({name: "Admin"})
        },
        gouser() {
            this.$router.push('/')
        },
        logout(){
            this.$store.dispatch('logout').then(result=>{
                if(result.success){
                    this.$router.push({name: 'signin'})
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        backhome() {
            this.$router.push({name: 'Home'})
        }
    },
    computed:{
        getUserData(){
            return this.$store.getters.getUserData;
        }
    }
}
</script>

<style scoped>
/* .container{
    height: 800px;
} */
#wrapper{
    width: 100%;
    background-color: coral;
    color: white;
}
th {
    color: black;
}
.i1 {
    color: black;
}

.i2 {
    color: black;
}
#logo img{
    width: 250px;
}
p {
  font-size: 25px;
}
#user-top img{
    width: 50px;
}
#user-top{
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
#prof:hover{
  transform: scale(1.5);
}
#user-top p{
    margin-bottom: 0;
    margin-right: 10px;
}
#navbar ul li{
    display: inline-block;
    margin-left: 30px;
}
#navbar ul{
    margin-top: 15px;
}
#top-bar{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#navbar a:hover{
     color: #FFC300;
}

#navbar a{
    color: white;
    text-decoration: none;
}

#navbar a.router-link-active{
    color: #FFC300;
}
.dropdown-toggle{
    padding: 0px;
    color: rgb(61, 61, 61);
    background-color: unset;
    border-color: unset;
}
.dropdown{
    margin-left: 10px;
}
.dropdown-toggle::after{
    display: none;
}
.col-3{
    padding-left: 0;
    padding-right: 0;
}
#wrape2{
    border: 1px solid rgb(216, 211, 211);
}
#body{
    background-color: rgb(61, 61, 61);
    width: 100%;
    /* height: 100vh; */
}
img{
    width: 250px;
}
#userImage, .dropdown img{
    width: 50px;
}
.dropdown-toggle{
    padding: 0px;
    color: unset;
    background-color: unset;
    border-color: unset;
}
.dropdown{
    margin-left: 10px;
}
.dropdown-toggle::after{
    display: none;
}

#wrape1{
    align-items: center;
}
p{
    color: white;
}
#profile{
    display: flex;
    align-items: baseline;
}
#profile p{
    margin-right: 10px;
}
#left-side{
    background-color: rgb(133, 213, 216);
}
#left-side img{
    width: 30px;
    margin-right: 15px;
}
#left-side table{
    color: white;
}
#left-side .table td, #left-side .table th{
    border-top: none;
}
#left-side td:hover {
    background-color: coral;
}

#left-side a{
  text-decoration: none;
  color: white;
  width: 100%;
}

#right-side{
    background-color: white;
    height: 730px;
}
#right-side p{
    color: black;
}

#nav div{
    padding: 12px;
}

#nav td{
    padding: 0;
}

#nav a.router-link-active div{
     color: white;
     background-color: #5DADE2;

}


</style>