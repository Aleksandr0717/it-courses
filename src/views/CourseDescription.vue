<script setup lang="ts">
import { ref } from 'vue';

const listOfSkills = ref(['Устанавливать и запускать интерпретатор Python', 'Работать с вводом и выводом данных', 'Работать с числовыми типами данных int и float', 'Использовать условный оператор if-else', 
  'Использовать циклы for и while', 'Работать со строковым типом данных str', 'Работать со списками: их методами, срезами и особенностями', 'Работать со встроенными функциями', 'Создавать и использовать функции для решения задач'
])

const listForExpansionPanel = ref([
  { title: 'Общая информация о курсе', descList: ['О курсе', 'Как проходить курс', 'Для преподавателей и работы в группах', 'Достижения курса'] },
  { title: 'Ввод-вывод данных', descList: ['Введение. Знакомство с Python', 'Команды print() и input(), переменные', 'Параметры sep и end, PEP8', 'Целочисленная арифметика. Часть 1', 'Целочисленная арифметика. Часть 2'] },
  { title: 'Условный оператор', descList: ['Выбор из двух', 'Логические операции', 'Вложенные и каскадные условия'] },
  { title: 'Типы данных', descList: ['Числовые типы данных: int, float', 'Строковый тип данных', 'Модуль math'] }
])
</script>

<template>
  <div class="main">
    <div class="header d-flex align-center">
      <div class="back-btn mr-4">
      <v-btn variant="text" tile width="40" height="30" icon="mdi-arrow-left" @click="$router.back()" />
      </div>
      <div class="header-title d-flex justify-center align-start flex-column ga-4">
        <h2>"Поколение Python": курс для начинающих</h2>
        <p>В курсе рассказывается об основных типах данных, конструкциях и принципах структурного программирования языка Python. Курс содержит теорию в формате текстовых конспектов и более 500 задач с автоматизированной проверкой. Этот курс является первой частью линейки курсов "Поколение Python".</p>
      </div>
      <v-spacer></v-spacer>
      <img src="https://cdn.stepik.net/media/cache/images/courses/58852/cover_ZP5DuRM/4951fdb332a542d0a2fe70692976e557.png" alt="Лого" height="140">
    </div>
    <div class="content mt-10 d-flex justify-space-between">
      <div class="content-detailed-info d-flex justify-center flex-column ga-12">
        <div class="d-flex ga-3 flex-column">
          <h3>Вы научитесь:</h3>
          <ul>
            <li v-for="(list, i) in listOfSkills" :key="i">{{ list }}</li>
          </ul>
        </div>
        <div class="d-flex flex-column ga-3">
          <h3>О курсе:</h3>
          <p>"Поколение Python: курс для начинающих" знакомит с основными типами данных, конструкциями и принципами структурного программирования языка Python.</p>
          <p>Целевая аудитория – школьники, студенты и взрослые люди, заинтересованные в изучении программирования; педагоги школ, вузов и кружков, преподающие программирование на языке Python.</p>
          <p>Курс содержит теорию в формате текстовых конспектов, а также более 500 задач. В конце каждого модуля приводится дополнительный материал для самостоятельного изучения: литература, ссылки на полезные статьи и документацию языка Python, ссылки на исходный код и многое другое.</p>
        </div>
        <div class="d-flex flex-column ga-3">
          <h3>Начальные требования:</h3>
          <p>Для освоения курса требуются базовые знания из школьной программы по информатике и математике.</p>
        </div>
        <div class="d-flex flex-column mb-10">
          <h3 class="mb-3">Программа курса:</h3>
          <v-expansion-panels v-for="(elem, i) in listForExpansionPanel" :key="i" variant="accordion" multiple elevation="0">
            <v-expansion-panel class="pa-0">
              <v-expansion-panel-title collapse-icon="mdi-minus" expand-icon="mdi-plus" class="panel-title px-2">
                {{ elem.title }}
              </v-expansion-panel-title>
              <v-divider></v-divider>
              <v-expansion-panel-text class="panel-list">
                <ul v-for="(item, i) in elem.descList" :key="i">
                  <li>{{ item }}</li>
                </ul>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </div>
      <div class="content-general-info d-flex flex-column">
        <div class="content-general-info-sticky">
          <div class="quantity pa-3 mb-5">
            <h4>В курс входят:</h4>
            <ul>
              <li>60 уроков</li>
              <li>311 задач</li>
              <li>262 теста</li>
            </ul>
          </div>
          <v-btn class="btn text-none" flat color="green" width="200">Записаться на курс</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

$bg-color: rgb(233, 233, 233);
.main {
  width: 100%;
  .header {
    padding: {
      left: 413px;
      right: 470px;
    }
    height: 240px;
    background-color: $bg-color;
    &-title {
      width: 60%;
    }
  }
  .content {
    padding-inline: 470px;
    &-detailed-info {
      width: 613px;
      ul {
        list-style: none;
        li::before {
          content: "✓";
          margin-right: 10px;
          color: green;
        }
      }
      .panel-title {
        font-size: 16px;
      }
      .panel-list {
        ul {
          list-style: none;
          li::before {
            content: "\203A";
            margin-right: 10px;
            color: black;
          }
        }
      }
    }
    &-general-info {
      width: 200px;
      &-sticky {
        position: sticky;
        top: 70px;
        .quantity {
          background-color: $bg-color;
          ul {
            list-style: none;
            li::before {
              content: "\203A";
              margin-right: 10px;
            }
          }
        }
        .btn {
          letter-spacing: 0;
          font-size: 16px;
        }
      }
    }
  }

}
</style>