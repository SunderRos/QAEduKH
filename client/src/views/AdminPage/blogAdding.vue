<template>
     <div class="row" id="wrapper">
        <div class="col-5">

            <router-link :to="{name:'Blog'}">
              <div class="back" id="back">
                  <!-- <img src="../../assets/Back.png" alt="" > -->
                  <h4>Back</h4>
              </div>
            </router-link>
            
            <br>
            <div>
              <h4>SHARE WHAT YOU HAVE TO EVERYONE !</h4>
              <img src="../../assets/share.png" width="400" height="600" alt="">
            </div>
        </div>
        <div class="col-7">
          
                <h4>Content Title</h4><span v-if="result.titleEmpty">Please enter title</span>

                <div class="form-group" v-if="result.titleEmpty">
                    <input type="text" class="form-control is-invalid" id="exampleInputTitle1" aria-describedby="emailHelp" placeholder="Tittle" v-model="title">
                </div>
                <div class="form-group" v-else>
                    <input type="text" class="form-control" id="exampleInputTitle1" aria-describedby="emailHelp" placeholder="Tittle" v-model="title">
                </div>

            
                <h4>Description</h4><span v-if="result.descriptionEmpty">Please enter description</span>
                <div class="form-group" v-if="result.descriptionEmpty">
                    <textarea class="form-control is-invalid" id="exampleFormControlDescription" rows="3" v-model="description"></textarea>
                </div>
                <div class="form-group" v-else>
                    <textarea class="form-control" id="exampleFormControlDescription" rows="3" v-model="description"></textarea>
                </div>

              

                <h4>Writer</h4><span v-if="result.writerEmpty">Please Enter Writer</span>
                <div class="form-group" v-if="result.writerEmpty">
                    <input type="text" class="form-control is-invalid" id="exampleInputWriter" aria-describedby="emailHelp" placeholder="Name" v-model="writer">
                </div>
                <div class="form-group" v-else>
                    <input type="text" class="form-control" id="exampleInputWriter" aria-describedby="emailHelp" placeholder="Name" v-model="writer">
                </div>
           <h4>Tutorial Cover</h4>
                  <div class="input-group mb-3">
                    <div class="custom-file" v-if="result.fileEmpty">
                      <input type="file" class="custom-file-input is-invalid" accept="video/mp4" id="inputGroupFile02" aria-describedby="inputGroupFileAddon02" @change="onSelectFile" ref="file">
                      <label class="custom-file-label" for="inputGroupFile01" v-if="file">{{file.name}}</label>
                      <label class="custom-file-label" for="inputGroupFile01" v-else>Choose Image File</label>
                      <div class="invalid-feedback input-left">
                        Please Upload Image
                      </div>
                    </div>
                    <div class="custom-file" v-else>
                      <input type="file" class="custom-file-input" id="inputGroupFile02" aria-describedby="inputGroupFileAddon02" @change="onSelectFile" ref="file">
                      <label class="custom-file-label" for="inputGroupFile01" v-if="file">{{file.name}}</label>
                      <label class="custom-file-label" for="inputGroupFile01" v-else>Choose Image File</label>
                    </div>
                  </div>
        
                <div class="col-12" id="btn-upload">
                    <button type="button" class="btn btn-primary" v-on:click="sendFile">Upload</button>
                </div>
                
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Datepicker from 'vue3-datepicker'
import { ref } from 'vue'
import FileUpload from '../../components/FileUpload.vue'
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
      Datepicker,
      FileUpload
    },
    methods: {

     onSelectFile() {
            const file = this.$refs.file.files[0];
            this.file = file
        },

      async sendFile(){
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
    
        if(!this.file){
            this.result.fileEmpty = true;
        }
        else{
            this.result.imageEmpty = false;
        }
        if(!this.writer){
            this.writer = "N/A"
        }
        console.log(this.result)

        if(!this.result.titleEmpty && !this.result.descriptionEmpty && !this.result.fileEmpty){
          const formData = new FormData();
          formData.append('file', this.file);
          formData.append('title', this.title);
          formData.append('description', this.description);
          formData.append('writer', this.writer);
          console.log('here')
          await axios.post('http://localhost:3000/addBlog',formData).then(result=>{
            console.log(result.data)
            if(result.data.success){
              window.location = '/admin/Blog'
            }
            else{
              alert('Blog already exists!')
            }
          }).catch(err =>{
            console.log(err)
          })
        }
        
      }
    },
}
</script>

<style scoped>
#wrapper{
    padding-top: 15px;
    padding-bottom: 15px;
    background-color: coral;
    height: 92.2vh;
}
.col-5 a.router-link-active{
  text-decoration: none;
}

.col-5 .back {
    display: flex;
}
.col-5 .back img{
    width: 30px;
}
.col-5 .back h4{
    margin: 0;
    padding-top: 1px;
    color: rgb(194, 194, 194);
}

.col-7{
    border-left: 2px solid rgb(194, 194, 194);
    padding-bottom: 30px;
}
.col-7 h4{
    display: inline-block;
}
.col-7 span{
    color: red;
}

#btn-upload{
  padding: 0px;
  text-align: center;
}
.input-left{
  position: absolute;
  top: 35px;
}

</style>