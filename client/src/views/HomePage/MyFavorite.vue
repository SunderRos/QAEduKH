<template>
  <!-- <div id="wrapper">
     <ul id="bl">
       <li v-for="blog in blogs" :key="blog._id">
         <div v-for="favorite in favorites" :key="favorite._id">
           <div v-for="user in users" :key="user._id">
             <span></span>
         <h1>{{blog.title}}</h1>
         <img :src="require(`../../assets/blog/${blog._id}/${blog._id}.jpg`)" width="450" height="400" alt="">
         <p>{{blog.description}}</p>
           <button class="like__btn" @click="remove(blog.title)">
           <br>
           <span>
             <span>
             <h5>REMOVE FROM FAVORITE</h5>
             </span>
           </span>
            <fa icon="file"></fa>
          </button>
          </div>
          </div>
       </li>
     </ul>
  </div> -->
  <!-- <div id="wrapper">
    <myfavoritecom v-for="blog in blogs" :key="blog._id" :blog="blog"></myfavoritecom>
    <h1>helo</h1>
  </div> -->
    <div>
        <h2 id="my-favlist">My Favorite</h2>
        <myfavoritecom v-for="blog in blogs" :key="blog._id" :blog="blog"></myfavoritecom>
    </div>
</template>

<script>
import axios from 'axios'
import myfavoritecom from '../../components/myfavoritecom.vue';
export default {
  data() {
    return {
      blogs: [],
    }
  },
   components: { 
       myfavoritecom 
  },
  computed: {
  },
  methods: {
      async remove(title) { 
            await axios.post('http://localhost:3000/removefromFavorite', {blogTitle: title}).then(result => {
                alert(title + " has been removed from the favorite list !")
            }).catch(err => {
                console.log(err)
            })
        }
  },
  async mounted() {
      const UserFavorites = await axios.post('http://localhost:3000/getFavoriteUser', {userId: this.$store.getters.getUserData._id});
      const blogs = await axios.get('http://localhost:3000/getBlog');
      if(UserFavorites.data) {
          UserFavorites.data.favoriteList.forEach(element => {
          this.blogs.push(blogs.data.filter(blog => blog.title == element.blogTitle))
      });
      }
        
        // axios.post('http://localhost:3000/getBlogRatingByBlogTitle', {blogTitle: this.$route.params.title}).then(result=>{
        //    if(result.data.length!=0){
        //        this.overallRating = result.data[0].overallRating

        //         //get individual rating score
        //         const individualScore = result.data[0].rating.filter(element => element.rateBy == this.$store.state.userData._id).map(element=>element.score)
        //         // console.log(individualScore)
        //         this.currentRate = (individualScore)/2
        //    }
        //    else{
        //        this.overallRating = null;
        //    }
        // }).catch(err=>{
        //     console.log(err);
        // });

    // axios.get("http://localhost:3000/getBlog").then(result => {
    //   this.blogs = result.data;
    // }).catch(err => {
    //   console.log(err)
    // })
    // axios.get("http://localhost:3000/getFavorite").then(result => {
    //   this.favorites = result.data;
    // }).catch(err => {
    //   console.log(err)
    // })
    
    // axios.get("http://localhost:3000/getUser").then(result => {
    //   this.users = result.data
    // }).catch(err => {
    //   console.log(err)
    // })
   
  },
  
  
  
}
</script>

<style scoped>
#wrapper {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #060c21;
}
ul {
  list-style-type: none;
  padding: 10px;
}
/* .fa-heart {
  size: 12px;
} */
#count {
  font-size: 15px;
  padding-right: 5px;
}
.content {
  padding: 0px;
  box-sizing: border-box;
  color: #fff;
}
li {
  padding: 10px;
}
img {
  padding: 5px;
}
#my-favlist{
    display: inline-block;
    border-bottom: 2px solid #F39C12;
    margin-bottom: 35px;
}
.col-2 img{
    width: 150px;
}
.col-10 h4{
    display: inline-block;
      margin-right: 15px;
}
.col-10 img{
    width: 25px;
    margin-bottom: 10px;
}



.button .remove{
    background-color:unset;
    border: 2px solid #81a0a1;
    color: #c29393;
    margin-left: 10px;
    border-radius: 5px;
    width: 125px;
    height: 40px;
}
.button .remove:hover{
    background-color: rgb(167, 141, 141);
}
.button{
   position: absolute;
   bottom: 5px;
   right: 15px;
}
.row{
    padding-bottom: 70px;
    border-bottom:1px solid #F39C12;
}

@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap");


.like__btn {
  padding: 5px 15px;
  margin-right: 15px;
  padding-right: 15px;
  background: #0080ff;
  font-size: 12px;
  font-family: "Open Sans", sans-serif;
  border-radius: 5px;
  color: #e8efff;
  outline: none;
  border: none;
  cursor: pointer;
}


</style>