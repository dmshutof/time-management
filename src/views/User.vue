<template>
    <div class="user_page">
        <router-link exact to="/">На главную</router-link>
        <div class="user">
            <div :style="'background:'+ User.color" class="icon">
                {{User.surname.split('')[0]}}
            </div>
            <h1>{{User.surname}}</h1>
            <h2>{{User.name}}</h2>
            <h2>{{User.patronymic}}</h2>
        </div>
        <Table :all-users="User.projects">
            <template v-slot:addButtonName>Добавить отчет</template>
            <template v-slot:tableHeader>
                <div class="column_description table_columns">
                    <p>Описание</p>
                    <p>Дата начала</p>
                    <p>Дата окончания</p>
                    <p>Кол-во часов</p>
                </div>
            </template>
            <template v-slot:form>
                <ProjectForm :all-users="User.projects"></ProjectForm>
            </template>
            <template v-slot:tableString="user">
                <ProjectTableString :project="user.user"></ProjectTableString>
            </template>
        </Table>
    </div>
</template>

<script>

    import {mapActions, mapGetters} from "vuex";
    import ProjectForm from '../components/ProjectForm'
    import ProjectTableString from "../components/ProjectTableString";
    import Table from "../components/Table";

    export default {
        name: "User",
        components: {
            Table,
            ProjectForm,
            ProjectTableString
        },
        created() {
            this.getOneUser(this.$route.params.id)
        },
        computed: mapGetters(['User', 'AllUsers']),
        methods: mapActions(['getOneUser'])

    }
</script>

<style lang="scss" scoped>
    .table {
        margin-top: 100px;
        @media (max-width: 530px) {
            margin-top: 50px;
        }
    }

    .user_page {
        .user {
            display: grid;
            justify-content: center;
            justify-items: center;
            text-align: center;

            .icon {
                width: 100px;
                height: 100px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                background: red;
                color: #ffffff;
                font-weight: bold;
                font-size: 40px;
                margin-bottom: 20px;
            }

            h1 {
                font-weight: bold;
                font-size: 45px;
                line-height: 110%;
                margin-bottom: 10px;
            }

            h2 {
                font-weight: bold;
                font-size: 30px;
                line-height: 110%;
            }
        }
    }
</style>