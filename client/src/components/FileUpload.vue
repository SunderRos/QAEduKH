<template>
<div class="file">
    <form @submit.prevent="onSubmit" enctype="multipart/form-data">
        <div class="fields">
            <label>Upload File</label>
            <input type="file"
                ref="file"
                @change="onSelect"
            />
        </div>
        <div class="fields">
            <button>
                Submit
            </button>
        </div>
        <div class="message">
            <h5>{{message}}</h5>
        </div>
    </form>
</div>
</template>
<script>
export default {
    name: 'FileUpload',
    data() {
        return {
            file: "",
            message: "",
        }
    },
    methods: {
        onSelect() {
            const file = this.$refs.file.files[0];
            this.file = file
        },
        async onSubmit() {
            const formData = new FormData()
            formData.append(file, this.file);
            try {
                await axios.post('/upload', formData);
                this.message = "Uploaded"
            } catch(err) {
                console.log(err)
                this.message = "something went wrong !"
            }
        }
    }
}
</script>