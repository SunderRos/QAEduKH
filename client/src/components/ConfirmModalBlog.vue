<template>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="exampleModalLabel">REMOVE THIS BLOG ?</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
              Are you going to delete "{{blog.title}}" tutorial ?                                                      
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" v-on:click="btnDelete(blog._id)">Delete</button>
            </div>
            </div>
        </div>
</template>

<script>
import axios from 'axios'
export default {
    props:['blog'],
    methods: {
        btnDelete(id){
           axios.delete('http://localhost:3000/deleteBlog', { data: { id } }).then(result =>{
               console.log(result);
               window.location.reload();
           }).catch(err =>{
               console.log(err);
           })
       }
    },
    
    mounted() {
        this.title = this.blog.title;
        this.description = this.blog.description;
        this.writer = this.blog.writer;
    },
}
</script>

<style scoped>
.modal-content{
    width: 150%;
    right: 25%
}
.modal-body h5{
    display: inline-block;
}
.modal-body span{
    color: red;
}
</style>