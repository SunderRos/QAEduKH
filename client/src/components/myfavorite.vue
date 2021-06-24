<template>
    <div>
        <div class="row">
            <div class="col-2">
                <img :src="require(`../assets/blog/${blog[0]._id}/${blog[0]._id}.jpg`)" alt="">
            </div>
            <div class="col-10">
                <h4>{{blog[0].title}}</h4>
                <p>{{blog[0].description}}</p>
                <div class="button">
                    <button type="button" class="remove" @click="removefromFavorite(blog.title)">Remove</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['blog'],
    methods: {
        removefromFavorite(title) {
            axios.delete("http://localhost:3000/removefromFavorite", {blogTitle: title}).then(result => {
                window.location.reload();
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>
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

.button .watch{
    background-color:unset;
    border: 2px solid #F39C12;
    color: #F39C12;
    width: 125px;
    height: 40px;
    border-radius: 5px;
    
}
.button .watch:hover{
    background-color: #b67611;
    color: white;
}
.button .remove{
    background-color:unset;
    border: 2px solid #cf0707;
    color: #cf0707;
    margin-left: 10px;
    border-radius: 5px;
    width: 125px;
    height: 40px;
}
.button .remove:hover{
    background-color: #900606;
    color: white;
}
.button{
   position: absolute;
   bottom: 5px;
   right: 15px;
}
.row{
    padding-bottom: 70px;
    border-bottom:1px solid #F39C12;
    margin-top: 15px;
}
</style>