<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    import './css/styles.scss'

    export default {
        created() {
            this.$store.dispatch('getUsers')
        }
    }
</script>
