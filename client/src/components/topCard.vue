<template>
<div class="wrapper">
      <div class="title">
          {{blog.title}}
          </div> 
          <div class="writer">
              written by: {{blog.writer}}</div>
          <div class="image">
              <img :src="require(`../assets/blog/${blog._id}/${blog._id}.jpg`)" width="450" height="400" alt="...">
          </div>
          <div class="description">
              {{blog.description}}
          </div>
          
</div>
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
#wrapper {
  margin: 0;
  padding: 0;
  align-items: center;
  min-height: 100vh;
  background: #060c21;
}
.title {
    font-size: 36px;
    font-weight: 600;
}
ul {
  list-style-type: none;
  padding: 10px;
}
.fa-file {
  height: 32px;
}
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