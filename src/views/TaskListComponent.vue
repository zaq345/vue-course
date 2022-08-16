<template>
  <div class="taskList">
    <h1>This is a taskList page</h1>
    <ul class="list">

      <li v-bind:id="item.id"
          v-bind:key="item.id" 
          v-for="item in this.taskList">
          {{item.desc}}
      </li>

    </ul>
  </div>
</template>

<script>

import isAuthorised from '@/mixins/isAuthorised.vue';
import axios from 'axios'


export default {
  name: 'TaskListComponent',
  data(){
    return{
      taskList: []
    }
  },
  async mounted(){
    axios.get('http://localhost:3000/tasks')
    .then(response => {
      // console.log(response.data)
      this.taskList = response.data

      // console.log(this.taskList)

    })
  }, 
  mixins: [isAuthorised],
  components: {
  },
  computed: {

  },
  methods:{

  },

}
</script>

<style scoped>
.taskList{
  display: flex;
  flex-direction: column;
}
.list{
  margin: auto;
}
</style>

