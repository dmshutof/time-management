<template>
    <Table :all-users="AllUsers">
        <template v-slot:form>
            <UserForm :all-users="AllUsers"></UserForm>
        </template>
        <template v-slot:tableString="user">
            <TableString :user="user.user"></TableString>
        </template>
    </Table>
</template>

<script>
    import Table from "../components/Table";
    import UserForm from "../components/UserForm";
    import TableString from "../components/TableString";
    import {mapGetters} from "vuex";

    export default {
        name: "Users",
        components: {
            Table,
            UserForm,
            TableString
        },
        computed: mapGetters(['AllUsers'])
    }
</script>

<style scoped>


</style>