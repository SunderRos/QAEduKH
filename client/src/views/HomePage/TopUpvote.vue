<template>
    <div>
        <br>
        <div class="top"> Top 5 Highest Upvote Articles</div>
        <div>
            <div id="wrapper" v-for="blog in blogs.slice(0,5)" :key="blog._id"><topcard :blog="blog"></topcard></div>  
        </div> 
        
    </div>
</template>

<script>
import axios from 'axios'
import favCard from '../../components/favCard.vue'
import myfavoritecom from '../../components/myfavoritecom.vue'
import topcard from '../../components/topCard.vue'
 '../../components/myfavoritecom'
export default {
    data() {
        return {
            blogs: [],
            topRateBlogs: [],
            orderBlog:[],
        }
    },
    components:{
        favCard,
        myfavoritecom,
        topcard
    },
    async mounted() {
        await axios.get('http://localhost:3000/getBlog').then(result=>{
                this.blogs = result.data;
            }).catch(err=>{
                console.log(err);
            });

        //get overall rate of each movie
        await axios.get('http://localhost:3000/getBlogRating').then(result=>{
            this.topRateBlogs = result.data;
        })
       
        this.topRateBlogs.forEach(element => {
            this.blogs[this.blogs.findIndex(blog => blog.title == element.blogTitle)].overallRating = element.overallRating;
        });
        this.blogs.sort(function(a,b){
            return b.overallRating - a.overallRating || a.title.localeCompare(b.title);
        })
        // console.log(this.topRateMovies)
        // console.log(this.movies)
       

        //  this.topRateMovies.sort(function(a,b){
        //         return b.overallRating - a.overallRating;
        //     });

        //Find overall rate of each movie
        // await this.topRateMovies.forEach((element, index)=>{
        //     this.topRateMovies[index].rating /= element.rateTime
        // })
        // this.topRateMovies.sort(function(a,b){
        //     return b.rating - a.rating;
        // })
        // console.log(this.topRateMovies)
        //Find top rate movie
        // console.log(Math.max.apply(Math, this.topRateMovies.map(o=>o.rating)))
        
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
  min-height: 30vh;
  background: #060c21;
}
.top {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    color: rgb(58, 58, 12);
    font-weight: 600;
}
</style>