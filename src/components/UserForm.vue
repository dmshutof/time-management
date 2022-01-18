<template>
    <form @submit.prevent="submit">
        <div class="input">
            <label for="email">Введите Email<sup>*</sup></label>
            <input :class="{'error': $v.email.$error}" class="main_input" id="email" placeholder="Email" type="text"
                   v-model.trim="$v.email.$model">
            <div class="input_description" v-if="$v.email.$dirty && !$v.email.required">Поле обязательно для
                заполнения
            </div>
            <div class="input_description" v-if="!$v.email.email">Некорректный Email</div>
            <div class="input_description" v-if="!$v.email.unique">Пользователь с таким Email уже существует</div>
        </div>
        <div class="input">
            <label for="surname">Введите Фамилию<sup>*</sup></label>
            <input :class="{'error': $v.surname.$error}" class="main_input" id="surname" placeholder="Фамилия"
                   type="text"
                   v-model.trim="$v.surname.$model">
            <div class="input_description" v-if=" $v.surname.$dirty && !$v.surname.required">Поле обязательно для
                заполнения
            </div>
        </div>
        <div class="input">
            <label for="name">Введите Имя<sup>*</sup></label>
            <input :class="{'error': $v.name.$error}" class="main_input" id="name" placeholder="Имя" type="text"
                   v-model.trim="$v.name.$model">
            <div class="input_description" v-if="$v.name.$dirty && !$v.name.required">Поле обязательно для заполнения
            </div>
        </div>
        <div class="input">
            <label for="patronymic">Введите Отчество</label>
            <input class="main_input" id="patronymic" placeholder="Отчество" type="text" v-model.trim="patronymic">
        </div>
        <div class="form_buttons">
            <button :disabled="submitStatus === 'PENDING'" class="main_button" type="submit">
                <span v-if="submitStatus === ''"
                      v-text="$store.state.isShowUserForm.type === 'ADD' ? 'Добавить' : 'Изменить'"></span>
                <span v-if="submitStatus === 'PENDING'"
                      v-text="$store.state.isShowUserForm.type === 'ADD' ? 'Добавление...' : 'Изменение...'"></span>
                <span v-if="submitStatus === 'OK'"
                      v-text="$store.state.isShowUserForm.type === 'ADD' ? 'Добавлен!' : 'Изменен!'"></span>
                <span v-if="submitStatus === 'ERROR'">Ошибка</span>
            </button>
            <div @click="formCancel" class="main_button gray_theme">Отмена</div>
        </div>
    </form>
</template>

<script>
    import {mapMutations} from 'vuex'
    import {email, required} from 'vuelidate/lib/validators'

    export default {
        name: "UserForm",
        props: {
            allUsers: [Array, Object]
        },
        data() {
            return {
                name: '',
                surname: '',
                patronymic: '',
                email: '',
                submitStatus: '',
                editableUser: {},
                colors: ['#ff4444', '#ffbb33', '#00C851', '#33b5e5', '#aa66cc', '#4B515D', '#3F729B', '#2BBBAD', '#4285F4']
            }
        },
        mounted() {
            let state = this.$store.state
            if (state.isShowUserForm.type === 'EDIT') {
                let user = this.$props.allUsers.find((item => item.id === state.isShowUserForm.editUserId))
                this.editableUser = user
                this.name = user.name
                this.surname = user.surname
                this.patronymic = user.patronymic
                this.email = user.email
            }
        },
        validations: {
            name: {
                required
            },
            surname: {
                required
            },
            email: {
                email,
                required,
                unique(val) {
                    let state = this.$store.state
                    if (state.isShowUserForm.type === 'EDIT' && this.editableUser.email === val) {
                        return true
                    }
                    if (val.length === 0) return true
                    let findEmail = this.$props.allUsers.find((item => item.email === val))
                    return Boolean(!findEmail)
                }
            },
        },
        methods: {
            ...mapMutations(['createUser', 'editUser']),
            submit() {
                this.$v.$touch()

                if (this.$v.$invalid) {
                    this.submitStatus = 'ERROR'
                    setTimeout(() => {
                        this.submitStatus = ''
                    }, 3000)
                } else {
                    this.submitStatus = 'PENDING'
                    setTimeout(() => {
                        this.submitStatus = 'OK'
                        setTimeout(() => {
                            if (this.$store.state.isShowUserForm.type === 'ADD') {
                                this.createUser({
                                    id: 'id' + (this.$store.state.users.length + 1),
                                    name: this.name,
                                    surname: this.surname,
                                    patronymic: this.patronymic,
                                    email: this.email,
                                    projects: [],
                                    color: this.colors[Math.floor(Math.random() * this.colors.length)]
                                })
                            } else {
                                this.editUser({
                                    id: this.$store.state.isShowUserForm.editUserId,
                                    name: this.name,
                                    surname: this.surname,
                                    patronymic: this.patronymic,
                                    email: this.email,
                                })
                            }

                            this.formCancel()
                        }, 1000)
                    }, 3000)
                }
            },
            formCancel() {
                this.name = ''
                this.surname = ''
                this.patronymic = ''
                this.email = ''
                this.submitStatus = ''
                this.$store.commit('ShowUserFormSwitcher', {isShow: false, type: 'ADD'})
            }
        }
    }
</script>

<style lang="scss" scoped>
    form {
        display: grid;
        grid-template-columns: repeat(auto-fill, 219px);
        grid-row-gap: 40px;
        grid-column-gap: 20px;
    }

    .form_buttons {
        display: flex;
        align-items: center;

        button {
            min-width: 155px;

            &:not(:last-child) {
                margin-right: 10px;
            }

        }
    }
</style>