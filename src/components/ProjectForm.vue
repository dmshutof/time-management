<template>
    <form @submit.prevent="submit">
        <div class="input" style="grid-column: 1/3">
            <label for="description">Введите примечание<sup>*</sup></label>
            <textarea :class="{'error': $v.description.$error}" class="main_input" id="description"
                      placeholder="Примечание" v-model.trim="$v.description.$model"></textarea>
            <div class="input_description" v-if=" $v.description.$dirty && !$v.description.required">
                Поле обязательно для заполнения
            </div>
        </div>
        <div class="input">
            <label for="date_start">Дата начала<sup>*</sup></label>
            <datetime :input-class="{'error': $v.date_start.$error, 'main_input' : true }" :minute-step="15"
                      class="theme-blue"
                      input-id="date_start"
                      placeholder="Введите дату начала" type="datetime" v-model="date_start">
                <template slot="button-cancel">
                    Отмена
                </template>
                <template slot="button-confirm">
                    Применить
                </template>
            </datetime>
            <div class="input_description" v-if=" $v.date_start.$dirty && !$v.date_start.required">
                Поле обязательно для заполнения
            </div>
        </div>
        <div class="input">
            <label for="date_end">Дата окончания<sup>*</sup></label>
            <datetime :input-class="{'error': $v.date_end.$error, 'main_input' : true }" :min-datetime="date_start"
                      :minute-step="15"
                      class="theme-blue"
                      input-id="date_end"
                      placeholder="Введите дату окончания"
                      type="datetime"
                      v-model="date_end">
                <template slot="button-cancel">
                    Отмена
                </template>
                <template slot="button-confirm">
                    Применить
                </template>
            </datetime>
            <div class="input_description" v-if=" $v.date_end.$dirty && !$v.date_end.required">
                Поле обязательно для заполнения
            </div>
        </div>

        <div class="form_buttons">
            <button :disabled="submitStatus === 'PENDING'" class="main_button" type="submit">
                <span v-if="submitStatus === ''">Добавить</span>
                <span v-if="submitStatus === 'PENDING'">Добавление...</span>
                <span v-if="submitStatus === 'OK'">Добавлен!</span>
                <span v-if="submitStatus === 'ERROR'">Ошибка</span>
            </button>
            <div @click="formCancel" class="main_button gray_theme">Отмена</div>
            <div class="time">Кол-во часов:&nbsp;<strong>{{time}}</strong></div>
        </div>
    </form>
</template>

<script>
    import {mapMutations} from 'vuex'
    import {required} from 'vuelidate/lib/validators'
    import {Datetime} from 'vue-datetime'
    import 'vue-datetime/dist/vue-datetime.css'


    export default {
        name: "ProjectForm",
        props: {
            allUsers: [Array, Object]
        },
        data() {
            return {
                description: '',
                date_start: '',
                date_end: '',
                time: '0 ч 0 мин',
                submitStatus: ''
            }
        },
        components: {
            datetime: Datetime
        },
        watch: {
            date_start(newVal) {
                if (!!this.date_end && new Date(newVal) > new Date(this.date_end)) {
                    this.date_end = newVal
                }
            },
            date_end() {
                let timeStart = new Date(this.date_start),
                    timeEnd = new Date(this.date_end),
                    hourDiff = timeEnd - timeStart,
                    humanReadable = {}

                humanReadable.hours = Math.floor(hourDiff / 3600000);
                humanReadable.minutes = (hourDiff / 60 / 1000) - 60 * humanReadable.hours;
                this.time = (humanReadable.hours || 0) + ' ч ' + (humanReadable.minutes || 0) + ' мин'
            }
        },
        validations: {
            description: {
                required
            },
            date_start: {
                required
            },
            date_end: {
                required
            },
        },
        methods: {
            ...mapMutations(['createProject']),
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
                            this.createProject({
                                userId: this.$route.params.id,
                                project: {
                                    id: 'prjct' + Math.random().toString(16).slice(2),
                                    description: this.description,
                                    date_start: this.date_start,
                                    date_end: this.date_end,
                                    time: this.time,
                                }
                            })
                            this.formCancel()
                        }, 1000)
                    }, 3000)
                }

            },
            formCancel() {
                this.$store.commit('ShowUserFormSwitcher', {isShow: false, type: 'ADD'})
                this.description = ''
                this.date_start = ''
                this.date_end = ''
                this.time = '0 ч 0 мин'
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
        grid-row: 2;
        grid-column: 1/4;

        button {
            min-width: 155px;
        }

        .main_button {
            margin-right: 10px;
        }
    }

</style>