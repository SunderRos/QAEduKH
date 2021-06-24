<template>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="exampleModalLabel">{{blog.title}}</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-5">
                        <form enctype="multipart/form-data">
                
                        
                            <h5>Tutorial Cover</h5>
                            <div class="input-group mb-3">
                                <div class="custom-file">
                                <input type="file" class="custom-file-input" aria-describedby="inputGroupFileAddon02" @change="onSelectFile" ref="file">
                                <label class="custom-file-label" v-if="file">{{file.name}}</label>
                                <label class="custom-file-label" v-else>{{blog.title}}.jpg</label>
                                </div>
                            </div>
                        </form>    
                                           
                    </div>
                    <div class="col-7">
                        <h5>Tutorial Title</h5><span v-if="result.titleEmpty"> (Please input title)</span>

                        <div class="form-group" v-if="result.titleEmpty">
                            <input type="text" class="form-control is-invalid" aria-describedby="emailHelp" placeholder="Tittle" v-model="title">
                        </div>
                        <div class="form-group" v-else>
                            <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="Tittle" v-model="title">
                        </div>

                     
                        <h5>Description</h5><span v-if="result.descriptionEmpty"> (Please input description)</span>
                        <div class="form-group" v-if="result.descriptionEmpty">
                            <textarea class="form-control is-invalid" rows="3" v-model="description"></textarea>
                        </div>
                        <div class="form-group" v-else>
                            <textarea class="form-control" rows="3" v-model="description"></textarea>
                        </div>

                       

                        <h5>Writer</h5><span v-if="result.writerEmpty"> (Please input writer)</span>
                        <div class="form-group" v-if="result.writerEmpty">
                            <input type="text" class="form-control is-invalid" aria-describedby="emailHelp" placeholder="Name" v-model="writer">
                        </div>
                        <div class="form-group" v-else>
                            <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="Name" v-model="writer">
                        </div>

                
                    </div>
                </div>                                                      
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" v-on:click="btnSaveChange">Save changes</button>
            </div>
            </div>
        </div>
</template>

<script>
import axios from 'axios'
import Datepicker from 'vue3-datepicker'
import { ref } from 'vue'
export default {
    data() {
        return {
        title: "",
        description: "",
        writer: "",
        file: "",

        result: {titleEmpty: false, descriptionEmpty: false, fileEmpty: false}
        }
    },
    components:{
        Datepicker
    },
    props:['blog'],

    methods: {

      onSelectFile(){
        this.file = this.$refs.file.files[0];
        console.log(this.file)
      },
      
      async btnSaveChange(){
        if(!this.title){
            this.result.titleEmpty = true
        }
        else{
          this.result.titleEmpty = false
        }
        if(!this.description){
            this.result.descriptionEmpty= true;
        }
        else{
            this.result.descriptionEmpty= false;
        }
       
        if(!this.writer){
            this.writer = "N/A"
        }
        if(!this.result.titleEmpty && !this.result.descriptionEmpty){
          const formData = new FormData();
          formData.append('file', this.file);
          formData.append('title', this.title);
          formData.append('description', this.description);
          formData.append('writer', this.writer);
          formData.append('id', this.blog._id);
          await axios.post('http://localhost:3000/editBlog', formData).then(result =>{
              if(result.data.success){
                  window.location.reload();
              }
              else{
                  alert('Blog already exists!');
              }
          }).catch(err =>{
              console.log(err)
          })
        }
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