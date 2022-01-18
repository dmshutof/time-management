<template>
    <div class="table_body__item table_columns">
        <div>
            <p class="only_mobile">Описание</p>
            <p>{{project.description}}</p>
        </div>
        <div>
            <p class="only_mobile">Дата начала</p>
            <p>{{new Date(project.date_start).toLocaleString("ru",dateFormatOptions)}}</p>
        </div>
        <div>
            <p class="only_mobile">Дата окончания</p>
            <p>{{new Date(project.date_end).toLocaleString("ru", dateFormatOptions)}}</p>
        </div>
        <div>
            <p class="only_mobile">Кол-во часов</p>
            <p>{{ project.time}}</p>
        </div>
        <div class="edit_buttons">
            <span @click="onDelete">Удалить</span>
        </div>
    </div>
</template>

<script>
    import {mapMutations} from "vuex";

    export default {
        name: "ProjectTableString",
        props: {
            project: Object
        },
        data() {
            return {
                dateFormatOptions: {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    timezone: 'UTC'
                }
            }
        },
        methods: {
            ...mapMutations(['deleteProject']),
            onDelete() {
                this.deleteProject({
                    userId: this.$route.params.id,
                    projectId: this.$props.project.id
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .table_body__item {
        color: inherit;
        padding: 10px 20px;
        display: grid;
        align-items: center;
        justify-content: space-between;

        .edit_buttons {
            display: flex;
            align-items: center;
            @media (min-width: 981px) {
                opacity: 0;
            }

            * {
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