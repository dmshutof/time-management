<template>
    <div class="table_body__item">
        <router-link :to="'/user/'+user.id" class="user">
            <div :style="'background:'+ user.color" class="icon">
                {{user.surname.split('')[0]}}
            </div>
            <p>{{user.surname}} {{user.name}} {{user.patronymic}}</p>
        </router-link>
        <div class="edit_buttons">
            <span @click="$store.commit('ShowUserFormSwitcher', {isShow: true, type: 'EDIT', editUserId: user.id})">Редактировать</span>
            <span @click="onDelete">Удалить</span>
        </div>
    </div>
</template>

<script>
    import {mapMutations} from "vuex";

    export default {
        name: "TableString",
        props: {
            user: Object
        },
        methods: {
            ...mapMutations(['deleteUser']),
            onDelete() {
                this.deleteUser(this.$props.user.id)
            }

        }
    }
</script>

<style lang="scss" scoped>
    .table_body__item {
        color: inherit;
        padding: 10px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .user {
            display: flex;
            align-items: center;

            p {
                font-weight: bold;
                opacity: .8;

                &:hover {
                    opacity: 1;
                }
            }

            .icon {
                width: 25px;
                height: 25px;
                border-radius: 50%;
                margin-right: 5px;
                background: red;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #ffffff;
                font-weight: bold;
                font-size: 10px;

            }
        }

        .edit_buttons {
            opacity: 0;
            display: flex;
            align-items: center;

            * {
                margin-left: 10px;
                font-size: 11px;
                font-weight: bold;
                color: inherit;
                opacity: .8;
                cursor: pointer;

                &:hover {
                    opacity: 1;
                }
            }
        }

        &:hover {
            background-color: #f6f7f8;

            .edit_buttons {
                opacity: 1;
            }
        }
    }

</style>