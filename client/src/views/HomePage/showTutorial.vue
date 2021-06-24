<template>
  <div id="wrapper">
     <ul id="bl">
       <li v-for="blog in blogs" :key="blog._id">
         <h1>{{blog.title}}<h6> written by: {{blog.writer}}</h6></h1>
         <img :src="require(`../../assets/blog/${blog._id}/${blog._id}.jpg`)" width="450" height="400" alt="">
         <p>{{blog.description}}</p>
         <button class="like__btn" @click="(clicked = !clicked) ; setRating(blog._id)">
           <br>
           <span v-for="blograting in blogratings" :key="blograting._id">
             <span v-if="blograting.blogId === blog._id">
             <h5>{{blograting.overallRating}}</h5>
             </span>
           </span>
            <fa icon="heart" :style="getColor"></fa> UPVOTE
          </button>
          <favcard :blog="blog"></favcard>
       </li>
     </ul>
  </div>
</template>

<script>
import axios from 'axios'
import favcard from '../../components/favCard.vue'
export default {
  data() {
    return {
      blogs: [],
      rating: 0,
      clicked: false,
      blogratings: [],
      overallRating: 0,
      currentRate: 0
    }
  },
  components: {
    favcard
  },
  computed: {
    getColor() {
      if(this.clicked) {
        return {
          color: 'red',
        }
      } else {
        return {
          color: 'white',
        }
      }
    },
  },
  methods: {

       async setRating(id){
            await axios.post('http://localhost:3000/addBlogRating', {
                blogId: id,
                userId: this.$store.state.userData._id,
                rating: this.rating
            }).then(result=>{
                console.log(result)
            }).catch(err=>{
                console.log(err);
            })
            await axios.post('http://localhost:3000/updateOverallRating', {blogId: id}).then(result=>{
                    console.log('here')
                    console.log(result)
                })
                // await axios.post("http://localhost:3000/getBlogRatingByBlogId", {blogId: id}).then(result => {
                //   this.blogratings = result.data
                // }).catch(err => {
                //   console.log(err)
                // })
        },
         async addtoFavorite(title){
        await axios.post('http://localhost:3000/addtoFavorite', {userId: this.$store.getters.getUserData._id, blogTitle: title}).then(result=>{
          this.$router.push({name: 'MyFavorite'})
          if(!result.data.exist){
            alert(blogTitle +' has been added to your Favorite List');
          }
          else{
            alert(blogTitle+' is already in your Favorite List');
          }
        })
      }
  },
  async mounted() {
  
        
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

    axios.get("http://localhost:3000/getBlog").then(result => {
      this.blogs = result.data;
    }).catch(err => {
      console.log(err)
    })
    axios.get("http://localhost:3000/getBlogRating").then(result => {
      this.blogratings = result.data;
    }).catch(err => {
      console.log(err)
    })
   
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