<template>
  <div class="task">
    <h1>Task by Id {{ $route.params.id }}</h1>
  </div>
</template>

<script>
import isAuthorised from '@/mixins/isAuthorised.vue';

export default{
  name: 'TaskListComponent',

  mixins: [isAuthorised],
}
</script>