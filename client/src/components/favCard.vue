<template>
        <button class="like__btn" v-on:click="addToWatchList(blog.title)">
          <span><h5>ADD TO YOUR FAVORITE</h5></span>
          <span><fa icon="file"></fa></span>
          </button>
</template>

<script>
import axios from 'axios';
export default {
  
  data() {
    return {
      overallRating: 'N/A',
    }
  },
    methods:{
     
      async addToWatchList(title){
        await axios.post('http://localhost:3000/addtoFavorite', {userId: this.$store.getters.getUserData._id, blogTitle: this.blog.title}).then(result=>{
          if(!result.data.exist){
            alert(this.blog.title +' has been added to your favorite');
          }
          else{
            alert(this.blog.title +' is already in your favorite');
          }
        })
      }
    },
    props:['blog'],
    mounted() {
        axios.post('http://localhost:3000/getBlogRatingByBlogTitle', {blogTitle: this.blog.title}).then(result=>{
          if(result.data.length!=0){
            this.overallRating = result.data[0].overallRating
          }
           
        }).catch(err=>{
            console.log(err);
        });
    }
}
</script>

<style scoped>
.movie_card p{
    color: black;
    padding: 0;
}
.movie_card{
      padding: 0 !important;
      width: 11rem;
      border-radius: 10px;
      box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.2), 0 4px 15px 0 rgba(0, 0, 0, 0.19);
    }
    .movie_card img{
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      /* height: 33rem; */
    }
    .movie_info{
      color: #5e5c5c;
    }

    .movie_info i{
      font-size: 20px;
    }
    .card-title{
      /* width: 80%; */
      height: 4rem;
      margin-bottom:0;
    }
    .play_button:hover{
      opacity: 1;
    }
    .play_button{
      width: 70px;
      position: absolute;
      right: 50px;
      bottom: 220px;
      opacity: 0.55;
      /* background-color: #ff3d49;
      height: 40px;
      border-radius: 50%;
      
      font-size: 27px;
      padding-left: 21px;
      padding-top: 16px;
      color: #FFFFFF;
      cursor: pointer; */
    }
    .addlist_button{
      width: 33px;
      position: absolute;
      right: 5px;
      bottom: 113px;
    }
    /* .AddList_button{
      width: 35px;
      position: absolute;
      bottom: 110px;
      left: 5px;
    } */

    .credits{
      margin-top: 20px;
      margin-bottom: 20px;
      border-radius: 8px;
      border: 2px solid #8e24aa;
      font-size: 18px;
    }
    .credits .card-body{
      padding: 0;
    }
    .credits p{
      padding-top: 15px;
      padding-left: 18px;
    }
    .credits .card-body i{
      color: #8e24aa;
    }
.bottom-card img{
    width: 20px;
    margin-bottom:5px;
}
.card-img-top{
  height: 250px;
}
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
.fa-file {
  height: 32px;
}
</style>