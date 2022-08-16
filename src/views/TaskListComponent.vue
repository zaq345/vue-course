<template>
  <div class="taskList">
    <h1>This is a taskList page</h1>
  </div>
</template>

<script>

import isAuthorised from '@/mixins/isAuthorised.vue';

export default {
  name: 'TaskListComponent',
  data(){
    return{

    }
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

