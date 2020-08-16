<template>
    <div v-if="question.show">
        <transition name="fade">
            <div>
                <hr/>
                <div>
                    <span>Введите вопроc</span>
                    <v-textarea
                        v-model="question.name"
                        class="mt-2"
                        solo
                        name="input-7-4"
                        label=""
                    ></v-textarea>
                </div>
                <hr/>
                <span>Дополнительные материалы</span>
                <div class="row text-center">
                    <div class="col-5 col-md-2">
                        <div class="container file-icon border rounded-circle p-0"><span class="mdi mdi-image"></span></div>
                        Изображение
                    </div>
                    <div class="col-5 col-md-2">
                        <div class="container file-icon border rounded-circle p-0"><span class="mdi mdi-video-vintage"></span></div>
                        Видео
                    </div>
                    <div class="col-5 col-md-2">
                        <div class="container file-icon border rounded-circle p-0"><span class="mdi mdi-volume-high"></span></div>
                        Аудио
                    </div>
                    <div class="col-5 col-md-2">
                        <div class="container file-icon border rounded-circle p-0"><span class="mdi mdi-file-document"></span></div>
                        Документ
                    </div>
                    <div class="col align-self-center">
                        <!-- <span class="border border-primary p-2 question-button">Загрузить файл</span> -->
                        <FileLibrary v-model="dialog" v-slot="{file}">
                            <v-file
                                v-model="question.file"
                                :file="file"
                                @click="dialog=true"
                            />
                        </FileLibrary>
                        {{question.file}}
                    </div>
                </div>
                <hr/>

                <div v-if="question.type == 'yesno'">
                    <span>Отметьте правильный ответ</span>
                    <v-radio-group
                        v-model="question.answers[0].isRight" column>
                            <v-radio label="Да" value="true"></v-radio>
                            <v-radio label="Нет" value="false"></v-radio>
                    </v-radio-group>

                </div>

                <div v-if="question.type == 'more'">
                    <span>Введите ответы и отметьте правильные из них</span>
                    <div
                      class="row"
                      v-for="(answer, index_answer) in question.answers" :key="index_answer">
                        <div class="col-1">
                            <v-Checkbox
                              v-model="question.answers[index_answer].isRight"
                            ></v-checkbox>
                            <span @click="removeAnswer(index_answer)" class="mdi mdi-account mdi-delete answer-delete"></span>
                        </div>
                        <div class="col-11 answer-more">
                            <v-textarea
                                v-model="question.answers[index_answer].answer"
                                solo
                            ></v-textarea>
                        </div>
                    </div>

                    <div class="row ml-0 mr-0">
                        <div class="col">

                        </div>
                        <div class="col-11 my-2 px-5 py-1 test__button course-item" @click="addAnswer()">
                            <span @click="addAnswer()" class="mdi mdi-account mdi-plus-box answer-delete"></span>
                            &nbsp;Добавить ответ
                        </div>
                    </div>
                </div>

            </div>

        </transition>
    </div>

</template>
<script>
    import FileLibrary from '@/components/common/FileLibrary.vue';
    import VFile from '@/components/common/v-file.vue';


    export default {
        name: 'question',
        components: {
            FileLibrary,
            VFile
        },
        props: {
            question: {
                type: Object
            },
            callback: Function,
        },
        methods: {
          addAnswer() {
              this.question.answers.push({
                  answer: '',
                  isRight: 'false'
              });
          },
          removeAnswer(index) {
              if (index > 1) this.question.answers.splice(index, 1);
          }
        },
        data() {
          return {
              dialog: false
          }
        }
    }
</script>

<style lang="less">

    .answer-more {
            padding-bottom:  0px;
    }
    .answer-delete {
        font-size: 24px;
        color: grey;
    }
    .file-icon {
        height: 75px;
        width: 75px;
        text-align: center;
        font-size: 48px;
        color: grey;
    }
    .question-button {
        border-radius: 1.25rem;
    }
    
</style>
