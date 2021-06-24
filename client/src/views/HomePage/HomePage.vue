<template>
    <div id="wrapper">
       <div class="container">
           <div id="top-bar">
               <div id="logo">
                   <a href="#" @click="backhome"><img src="../../assets/LogoMakr-4CIYGM.png" alt=""></a>
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
                                <a class="dropdown-item" href="#" @click="goProfile">Profile</a>
                                <a href="#" class="dropdown-item">Setting</a>
                                <a class="dropdown-item" href="#" v-on:click="logout">Logout</a>
                            </div>
                        </div>
                  </div>
                  <div id="navbar">
                    <ul>
                      <li>
                       <router-link :to="{ name: 'Home'}">HOME</router-link>
                      </li>
                       <li>
                       <router-link :to="{ name: 'MyFavorite'}">MY FAVORITE</router-link>
                      </li>
                       <li>
                       <router-link :to="{ name: 'ContactUs'}">CONTACT US</router-link>
                      </li>
                       <li>
                       <router-link :to="{ name: 'About'}">ABOUT</router-link>
                      </li>
                    </ul>
                  </div>
                </div>
           </div>
           <div>
             <router-view></router-view>
           </div>
       </div>
    </div>
</template>

<script>

export default {
    methods: {
        pushAdmin(){
            this.$router.push({name: "Admin"})
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
        },
        goProfile() {
            this.$router.push({name: 'Profile'})
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

</style>