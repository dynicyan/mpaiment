<template lang="pug">
  div(:class="[type === 'radio' ? 'mp-radios' : 'mp-checks'],
    {'is-disabled': 'disabled', }")
</template>
<script>
export default {
    name: mpCheck,
    props: {
        type: {
            type: String,
            default: 'check'
        }
    }
}
</script>
<style lang="stylus">
</style>
