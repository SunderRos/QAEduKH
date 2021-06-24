<template>
  <div class="boxbox">
      <ul>
          <li>
              {{ans.answer}}
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    data() {
        return {
            answerAt: new Date(Date.parse(this.ans.answerAt)).toLocaleString(),
        }
    },
    props: ['ans'],
}
</script>

<style>

</style>