<template>
    <div>
        <h1>Создание курса</h1>
        <draggable handle=".course-title">
            <div
                class="course mb-8 border-left rounded"
                v-for="(section, index) in newProduct.materials.course.units"
                :key="index"
                ripple
            >

                <div class="course-title course-block course-item px-5 py-3 d-flex justify-space-between w-100">
                    <div>
                        <span>Раздел</span>&nbsp;{{index + 1}}
                    </div>
                    <span @click="removeSection(index)" class="mdi mdi-account mdi-delete"></span>
                </div>

                    <draggable v-model="newProduct.materials.course.units[index].tasks" group="tasks" handle=".drag-tasks">
                        <div
                            class="ml-3 my-1 px-5 py-3 course-subtitle course-block course-item"
                            v-for="(item, index_item) in newProduct.materials.course.units[index].tasks"
                            :key="index_item"
                        >
                            <div class="d-flex justify-space-between w-100 drag-tasks" @click="showElem(index, index_item)">
                                <div>
                                    {{index_item + 1}}.&nbsp;{{item.type | typeToName}}&nbsp;{{item.name | limit}}
                                </div>
                                <span @click="removeElem(index, index_item)" class="mdi mdi-account mdi-delete"></span>
                            </div>

                            <Lection
                                v-if="item.type == 'lection'"
                                :task="newProduct.materials.course.units[index].tasks[index_item]"
                            />
                            <Test
                                v-if="item.type == 'test'"
                                :task="newProduct.materials.course.units[index].tasks[index_item]"
                            />
                            <Homework
                                v-if="item.type == 'homework'"
                                :task="newProduct.materials.course.units[index].tasks[index_item]"
                            />
                        </div>
                    </draggable>


                    <div class="d-flex flex-column">
                        <div class="ml-2 ml-3 my-1 px-5 py-3 course__button course-item" @click="createElem(index, 'lection')">Добавить урок</div>
                        <div class="ml-2 ml-3 my-1 px-5 py-3 course__button course-item" @click="createElem(index, 'test')">Добавить тест</div>
                        <div class="ml-2 ml-3 my-1 px-5 py-3 course__button course-item" @click="createElem(index, 'homework')">Добавить домашнее задание</div>
                    </div>

            </div>
            <div class="ml-2 ml-3 my-1 px-5 py-3 course__button course-item" @click="createUnit()">Добавить новый раздел</div>
        </draggable>
    </div>
</template>

<script>

import draggable from "vuedraggable";
import Lection from "./CourseFields/Lection.vue";
import Homework from "./CourseFields/Homework.vue";
import Test from "./CourseFields/Test.vue";

export default {
  components: {
    draggable,
    Lection,
    Homework,
    Test,
  },
  props: [
    'newProduct'
  ],
  methods: {
      createUnit() {
        let unit = {
            name: '',
            tasks: [],
            required: true
        };

        this.newProduct.materials.course.units.push(unit);
      },
      createElem(index, elem) {
        this.newProduct.materials.course.units[index].tasks.push(this.getElement(elem));
      },
      showElem(index, elem) {
        this.newProduct.materials.course.units[index].tasks[elem].show = !this.newProduct.materials.course.units[index].tasks[elem].show
      },
      removeElem(index, elem) {
        this.newProduct.materials.course.units[index].tasks.splice(elem, 1)
      },
      removeSection(index) {
        this.newProduct.materials.course.units.splice(index, 1)
      },
      getElement(elem) {
        let task = null;
        switch (elem) {
            case 'lection':
                task = {
                    name: '',
                    type: 'lection',
                    lection: {
                        description: '',
                        video: '',
                        file: '',
                    },
                    required: false,
                    show: false
                };
                break;
            case 'test':
                task = {
                    name: '',
                    type: 'test',
                    test: {
                        description: '',
                        questioncount: 0,
                        procenttrue: 80,
                        checktest: true,
                        questions: [],
                    },
                    required: false,
                    show: false
                };
                break;
            case 'homework':
                task = {
                    name: '',
                    type: 'homework',
                    homework: {
                        description: '',
                    },
                    required: false,
                    show: false
                };
                break;
        };
        return task;
      },

  },
  filters: {
      limit: function (str) {
          if (!str) return '';
          str = str.toString();
          if (str.length > 40) str = str.substr(0,40) + '...';
          if (str.length > 0) str = ' - ' + str;
          return str;
      },
      typeToName: function (type) {
          if (type == 'lection') return 'Урок';
          if (type == 'test') return 'Тест';
          if (type == 'homework') return 'Домашнее задание';
          return 'Прочее';
      }
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="less">

    .course {
        &-item {
            border-radius: 20px;
            cursor: pointer;
        }
        &-block {
            color: white;
        }
        &-title {
            background: linear-gradient(to bottom, #536e7a 1%,#587a8a 100%);
        }
        &-subtitle {
            background: linear-gradient(to bottom, #60889a 1%, #59a6ca 100%);
        }
        &__button {
            background: linear-gradient(to bottom, #f5f3f4 0%,#ece9ea 100%);
        }
    }
</style>
