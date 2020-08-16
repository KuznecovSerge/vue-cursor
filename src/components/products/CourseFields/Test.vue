<template>
    <div v-if="task.show">
        <transition name="fade">
            <div>
            <hr/>
                <div class="row">
                    <div class="col-12 col-sm-3 py-0">Название теста</div>
                    <div class="col py-0">
                        <v-text-field
                            v-model="task.name"
                            required
                            solo
                            class="my-0"
                        ></v-text-field>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-sm-3 py-0">Краткое описание теста</div>
                    <div class="col py-0">
                        <v-textarea
                            v-model="task.test.description"
                            class="mt-2"
                            solo
                            name="input-7-4"
                        ></v-textarea>
                    </div>
                </div>


                <div class="row pb-2">
                    <div class="col-xs-12 col-lg-4 p-0 m-0 row">
                        <div class="col-xs-12 col-sm-8 col-lg-9 pr-3">
                            Количество вопросов в одной попытке
                            <div class="overline mt-2">Это позволит показывать студенту разные вопросы в разных попытках</div>
                        </div>
                        <div class="col-xs-12 col-sm-4 col-lg-3 pr-3 border-right">
                            <v-text-field
                                v-model="task.test.questioncount"
                                class="mt-1"
                                solo
                                type="number"
                                value="1"
                            ></v-text-field>
                        </div>
                    </div>
                    <div class="col-xs-12 col-lg-4 p-0 m-0 row">
                        <div class="col-xs-12 col-sm-8 col-lg-9 pr-3">
                            Процент правильных ответов для сдачи теста
                            <div class="overline mt-2">При меньшем значении тест не будет сдан</div>
                        </div>
                        <div class="col-xs-12 col-sm-4 col-lg-3 pr-3 border-right">
                            <v-text-field
                                v-model="task.test.procenttrue"
                                class="mt-1 mr-2"
                                solo
                                type="number"
                                value="1"
                            ></v-text-field>
                        </div>
                    </div>
                    <div class="col-xs-12 col-lg-4 p-0 m-0 row">
                        <div class="col-xs-12 col-sm-9 pr-3">
                            <span class="">Сертификат не выдается без успешной сдачи теста</span>
                        </div>
                        <div class="col-xs-12 col-sm-3">
                            <v-switch
                                v-model="task.test.checktest"
                            ></v-switch>
                        </div>
                    </div>
                </div>


                <div class="row">
                    <div class="col-12 col-sm-3">
                        Выберите тип вопроса
                    </div>
                    <div class="col">
                        <div
                        class="my-2 px-5 py-3 test__button course-item"
                        v-for="(question, index_question) in task.test.questions" :key="index_question">
                            <div class="d-flex justify-space-between w-100">
                                <div @click="showElem(index_question)">
                                    Вопрос&nbsp;{{index_question + 1}}&nbsp;{{question.text | limit}}
                                </div>
                                <span @click="removeElem(index_question)" class="mdi mdi-account mdi-delete"></span>
                            </div>
                            <Question
                                :question="task.test.questions[index_question]"
                            />
                        </div>

                        <div class="my-2 px-5 py-3 test__button course-item" @click="createQuestion('yesno')">Добавить вопрос "Да или Нет"</div>
                        <div class="my-2 px-5 py-3 test__button course-item" @click="createQuestion('more')">Добавить вопрос с многовариантными ответами</div>
                        <div class="my-2 px-5 py-3 test__button course-item "@click="createQuestion('custom')">Добавить вопрос с ответом в свободной форме</div>
                    </div>
                </div>
                <v-switch
                    v-model="task.required"
                    label="Тест необходимо пройти, чтобы стало доступно следующее задание"
                ></v-switch>
            </div>

        </transition>
    </div>

</template>
<script>

    import Question from "./test/Question.vue";

    export default {
        name: 'test',
        components: {
          Question
        },
        props: {
            task: {
                type: Object
            },
        },
        methods: {
            createQuestion(questionType) {
              let answers;
              switch (questionType) {
                  case 'yesno':
                      answers = [{answer: '', isRight: 'true'}];
                      break;
                  case 'more':
                      answers = [{answer: '', isRight: false}, {answer: '', isRight: false}, {answer: '', isRight: false}];
                      break;
                  case 'custom':
                      answers = null;
                  default:

              }
              this.task.test.questions.push({
                  name: '',
                  file: '',
                  type: questionType,
                  answers: answers,
                  show: false
              });
            },
            showElem(index_question) {
              this.task.test.questions[index_question].show = !this.task.test.questions[index_question].show;
            },
            removeElem(index_question) {
              this.task.test.questions.splice(index_question, 1);
            },
        },
        filters: {
            limit: function (str) {
                if (!str) return '';
                str = str.toString();
                if (str.length > 40) str = str.substr(0,40) + '...';
                if (str.length > 0) str = ' - ' + str;
                return str;
            }
        },
        data() {
          return {
          }
        }
    }
</script>


<style lang="less">

    .test {
        &__button {
            color:  rgba(0, 0, 0, 0.87);
            background: linear-gradient(to bottom, #f5f3f4 0%,#ece9ea 100%);
        }
    }
</style>
