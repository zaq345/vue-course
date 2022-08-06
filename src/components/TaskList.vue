<template>
  <ul class="taskList">

    <li class="zeroBlock" v-if="zeroBlockVisibility">
      <p class="zeroBlock__text">Please add new task</p>
    </li>
    
    <li class="task" 
          v-bind:id="item.id"
          v-bind:key="item.id" 
          v-for="item in todoSort"
          
    >
      <button class="task__button"
              v-bind:class="{done_true:item.done, done_false:!item.done}"
              v-on:click="$emit('buttonDoneChange', item.id)"
      >
        {{itemButtonText(item.id)}}
      </button>
      <p class="task__text">{{item.text}}</p>


      <!-- /////////////////////// -->
      <!-- Кнопка-триггер модального окна -->
      <button type="button" class="btn btn-primary edit__button" data-bs-toggle="modal" v-bind:data-bs-target="'#exampleModal' + item.id"
              v-on:click="$emit('editItemDescription', item.id)">
        Изменить
      </button>

      <!-- Модальное окно -->
      <div class="modal fade" v-bind:id="'exampleModal' + item.id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Заголовок модального окна</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
            </div>
            <div class="modal-body editBody">
              <label for="task">Tell us your story:</label>
              <textarea name="task" v-bind:id="item.id + 'edit'" cols="30" rows="4"></textarea>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
              >
                Закрыть
              </button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                      v-on:click="$emit('changeDescription', item.id)">
                Сохранить изменения
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- /////////////////////// -->

      <button class="delete__button" v-on:click="$emit('deleteItem', item.id)">
        Удалить
      </button>
    
    </li>

  </ul>
</template>

<script>
export default {
  name: 'TaskList',
  // props: {
  //   list: Array,
  //   picked: Number,
  //   search: String
  // },
  props: ["list", "picked", "search"],
  computed: {
    todoSort() {
      return this.list.filter(item => ((item.text.indexOf(this.search) !== -1) && ((item.done == false && (this.picked == 1 || this.picked == 3)) || (item.done == true && (this.picked == 1 || this.picked == 2)))))
    },

    zeroBlockVisibility(){
      return this.list.length == 0
    },
  },

  methods: {
    itemButtonText(id){
      return this.list[id-1].done ? 'completed' : 'in order';
    },

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.taskList{
  list-style: none;
  padding-left: 0;
}

.task{
  position: relative;

  display: flex;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 10px;
  max-width: 750px;
}

.task__button{
  margin-right: 25px;
  border-radius: 10px;
  color: white;
  padding: 10px;
}

.delete__button{
  position: absolute;
  right: 10px;
  border-radius: 10px;
  background-color: white;
  color: red;
  border: 1px solid red;
  padding: 10px;
}

.edit__button{
  position: absolute;
  right: 120px;
  border-radius: 10px;
  background-color: white;
  color: blue;
  border: 1px solid blue;
  padding: 10px;
}

.done_true{
  background-color: green;
}

.done_false{
  background-color: gray;
}

.task__text{
  margin: auto 0;
}

.zeroBlock{
  width: 750px;
  display: flex;
}
.zeroBlock__text{
  margin: auto;
}

.editBody{
  display: flex;
  flex-direction: column;
}
</style>
