import Vue from 'vue'
import Vuex from 'vuex'
import usersDB from "../db/users";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        users: [],
        oneUser: [],
        isShowUserForm: {
            editUserId: null,
            isShow: false,
            type: 'ADD'
        }
    },
    mutations: {
        updateUsers(state, users) {
            state.users = users
        },
        ShowUserFormSwitcher(state, obj) {
            state.isShowUserForm = obj
        },
        createUser(state, newUser) {
            //state.users.unshift(newUser)
            usersDB.unshift(newUser)
        },
        editUser(state, userData) {
            let user = state.users.find((item => item.id === userData.id))
            user.name = userData.name
            user.surname = userData.surname
            user.patronymic = userData.patronymic
            user.email = userData.email
        },
        deleteUser(state, userId) {
            let index = state.users.findIndex((item => item.id === userId))
            state.users.splice(index, 1)
        },
        oneUser(state, userId) {
            state.oneUser = state.users.find((item => item.id === userId))
        },
        createProject(state, obj) {
            state.users.find((item => item.id === obj.userId)).projects.unshift(obj.project)
        },
        deleteProject(state, obj) {
            let user = state.users.find((user => user.id === obj.userId)),
                projectIndex = user.projects.findIndex(project => project.id === obj.projectId)
            user.projects.splice(projectIndex, 1)
        },
    },
    actions: {
        getUsers(ctx) {
            ctx.commit('updateUsers', usersDB)
        },
        getOneUser(ctx, userId) {
            ctx.commit('oneUser', userId)
        }
    },
    getters: {
        AllUsers(state) {
            return state.users
        },
        User(state) {
            return state.oneUser
        },
        UserForm(state) {
            return state.isShowUserForm
        }
    }
})
