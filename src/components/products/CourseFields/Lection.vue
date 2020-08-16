<template>
    <div v-if="task.show" id="lection">
        <transition name="fade">
            <div>
                <div class="d-flex flex-row align-center">
                    <span class="pr-5">Заголовок</span>
                    <v-text-field
                        v-model="task.name"
                        required
                        class="my-0"
                    ></v-text-field>
                </div>
                <div>
                    <span>Описание</span>
                    <v-textarea
                        v-model="task.lection.description"
                        class="mt-2"
                        solo
                        name="input-7-4"
                        label="Solo textarea"
                    ></v-textarea>
                </div>
                <div>
                    <span>Добавить видео</span>
                    <FileLibrary v-model="dialog" v-slot="{file}">
                        <v-file
                            v-model="task.lection.video"
                            :file="file"
                            @click="dialog=true"
                            :rules="[(v) => !!v || 'Видео обязательно']"
                        />
                    </FileLibrary>
                </div>
                <div>
                    <span>Добавить дополнительный файл</span>
                    <FileLibrary v-model="dialog2" v-slot="{file}">
                        <v-file
                            v-model="task.lection.file"
                            :file="file"
                            @click="dialog2=true"
                        />
                    </FileLibrary>
                </div>
                <v-switch
                    v-model="task.required"
                    label="Урок необходимо пройти, чтобы стало доступно следующее задание"
                ></v-switch>
            </div>

        </transition>
    </div>

</template>
<script>
    import FileLibrary from '@/components/common/FileLibrary.vue';
    import VFile from '@/components/common/v-file.vue';

    export default {
        name: 'lection',
        components: {
            FileLibrary,
            VFile
        },
        props: {
            task: {
                type: Object
            }
        },
        data() {
          return {
            dialog: false,
            dialog2: false
          };
        },
    }
</script>
