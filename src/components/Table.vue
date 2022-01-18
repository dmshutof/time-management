<template>
    <div class="table">
        <div class="table_header">
            <button @click="$store.commit('ShowUserFormSwitcher', {isShow: true, type: 'ADD'})" class="main_button"
                    v-if="!UserForm.isShow">
                <slot name="addButtonName">Добавить пользователя</slot>
            </button>
            <slot name="form" v-if="UserForm.isShow"></slot>
        </div>
        <slot name="tableHeader" v-if="AllUsers.length > 0"></slot>
        <transition-group class="table_body" name="tableString" tag="div">
            <div :key="user.id" class="table_string_wrapper" v-for="user of AllUsers">
                <slot :user="user" name="tableString"></slot>
            </div>
        </transition-group>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "Table",
        props: {
            AllUsers: [Array, Object]
        },
        computed: mapGetters(['UserForm'])
    }
</script>

<style lang="scss" scoped>
    .table {
        background: #ffffff;
        border: 1px solid #d0d6db;
        border-radius: 10px;
        overflow: hidden;

        &_header {
            padding: 15px 20px;
            border-bottom: 1px solid #d0d6db;
        }

        &_body {
            position: relative;
        }

    }

</style>