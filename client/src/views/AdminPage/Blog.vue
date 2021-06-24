<template>
                <table class="table fixed_header">
                    <thead>
                        <tr>
                        <th scope="col" class="poster-head">Cover</th>
                        <th scope="col" class="title">Tutorial Title</th>
                        <th scope="col" class="uploadAt">Posted At</th>
                        <th scope="col"><router-link :to="{name:'blogAdding'}"><button class="btn btn-success">Add Tutorial</button></router-link></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="blog in blogs" :key="blog._id">
                        <th scope="row" class="poster-head"><img :src="require(`../../assets/blog/${blog._id}/${blog._id}.jpg`)" alt="" class="poster"></th>
                        <td class="title">{{blog.title}}</td>
                        <td class="uploadAt">{{blog.uploadAt}}</td>
                        <td><a href="#"><img src="../../assets/edit.png" alt="" class="action" data-toggle="modal" :data-target="`#exampleModal${blog._id}`"></a><a :href="`#myModal${blog._id}`" class="trigger-btn" data-toggle="modal"><img src="../../assets/delete.png" alt="" class="action"></a></td>
                        
                        <div :id="`myModal${blog._id}`" class="modal fade">
                            <ConfirmModalBlog :blog="blog"></ConfirmModalBlog>
                        </div>
                        
                        <div class="modal fade" :id="`exampleModal${blog._id}`" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <blogEditing :blog="blog"></blogEditing>
                        </div>
                        </tr>
                    </tbody>
                   
                </table>
</template>

<script>
import axios from 'axios'
import blogEditing from './blogEditing'
import ConfirmModalBlog from '../../components/ConfirmModalBlog'
export default {
    data() {
        return {
            blogs: [],
        }
    },
    components:{
        blogEditing,
        ConfirmModalBlog
    },
    methods: {  
    //    btnDelete(id, title){
    //        axios.delete('http://localhost:3000/deleteMovie', { data: { id, title } }).then(result =>{
    //            this.movies = this.movies.filter(movie => movie._id != id);
    //            console.log(result)
    //        }).catch(err =>{
    //            console.log(err);
    //        })
    //    }
    },
    mounted() {
        axios.get('http://localhost:3000/getBlog').then(result=>{
            this.blogs = result.data;
            console.log(this.blogs)
        }).catch(err=>{
            console.log(err);
        })
    },
}
</script>

<style scoped>


table .poster{
    width: 100px;
}
table .action{
    width: 40px;
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
    width: 270px;
}

.fixed_header .uploadAt{
    width: 180px;
}
.fixed_header .poster-head{
    width: 150px;
}

/* #right-side thead th {
    position: sticky;
    top: 0;
    background-color: white;
    border-bottom: 2px solid black;

} */



</style>