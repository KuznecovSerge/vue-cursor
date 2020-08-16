<template>
    <div v-if="task.show" transition="bounce" id="homework">
        <transition name="fade">
            <div>
                <div class="d-flex flex-row align-center">
                    <span class="pr-5">Заголовок</span>
                    <v-text-field
                        required
                        class="my-0"
                        v-model="task.name"
                    ></v-text-field>
                </div>
                <div>
                    <span>Описание</span>
                    <v-textarea
                        class="mt-2"
                        solo
                        name="input-7-4"
                        label="Solo textarea"
                        v-model="task.homework.description"
                    ></v-textarea>
                </div>
                <v-switch
                    v-model="task.required"
                    label="Домашнее задание необходимо сдать, чтобы стала доступна следующая задача"
                ></v-switch>
            </div>
        </transition>
    </div>

</template>
<script>
    export default {
        name: 'homework',
        props: {
            task: {
                type: Object
            }
        }
    }
</script>
