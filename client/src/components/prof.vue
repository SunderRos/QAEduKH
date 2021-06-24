<template>
<div class="container">
    <div class="box">
        <div class="name">
            NAME: {{user.username}}
        </div>
        <div class="email">
            EMAIL: {{user.email}}
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: ['user']
}
</script>

<style scoped>
.container {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: baseline;
    height: 700px;
}
.title {
    margin: 10px;
    padding: 10px 10px;
    padding-bottom: 10px;
    font-size: 4em;
    font-weight: bold;
}
.name {
    margin: 5px;
    padding-left: 3px;
    padding-bottom: 50px;
    font-size: 3em;
}
.email {
    margin: 5px;
    padding-left: 3px;
    padding-bottom: 50px;
    font-size: 3em;
}
@media (max-width: 700px) {
    .title {
    margin: 10px;
    padding: 10px 10px;
    padding-bottom: 10px;
    font-size: 2em;
    font-weight: bold;
}
.name {
    margin: 5px;
    padding-left: 3px;
    padding-bottom: 50px;
    font-size: 1em;
}
.email {
    margin: 5px;
    padding-left: 3px;
    padding-bottom: 50px;
    font-size: 1em;
}
}
</style>