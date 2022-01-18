<template>
    <div class="table_body__item table_columns">
        <p>{{project.description}}</p>
        <p>{{new Date(project.date_start).toLocaleString("ru",dateFormatOptions)}}</p>
        <p>{{new Date(project.date_end).toLocaleString("ru", dateFormatOptions)}}</p>
        <p>{{ project.time}}</p>
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