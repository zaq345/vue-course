<template>
  <div class="statisticsBlock">
    <div class="statisticsBlock__item completedTasks">
      Completed Tasks {{done}}
    </div>
    <div class="statisticsBlock__item allTasks">
      All Tasks {{all}}
    </div>
    <div class="statisticsBlock__item percentageDoneTasks">
      Percent complete tasklist {{percentage}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatisticsBlock',
  props: {
    // msg: String
    done: Number,
    all: Number,
  },
  computed: {
    percentage(){
      return (this.done / this.all * 100).toFixed()  + '%'
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.statisticsBlock{
  display: flex;
  margin: auto;
  margin-bottom: 10px;
}

.statisticsBlock__item{
  color: white;
  background-color: blue;
  margin-right: 10px;
  border-radius: 10px;
  padding: 5px;
}
</style>
