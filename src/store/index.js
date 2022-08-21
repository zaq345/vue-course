import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    taskList1: [],
    picked1: 1
  },
  getters: {
    todoSort: store => search /*=> picked*/ => {
      // console.log(picked)
      return store.taskList1.filter(item => ((item.desc.indexOf(search) !== -1) && ((item.done == false && (store.picked1 == 1 || store.picked1 == 3)) || (item.done == true && (store.picked1 == 1 || store.picked1 == 2)) ) ) );
      
      // return store.taskList1.filter(item => ((item.desc.indexOf(search) !== -1) /*&& ((item.done == false && (picked == 1 || picked == 3)) || (item.done == true && (picked == 1 || picked == 2)) )*/ ) );
      
      // return this.taskList.filter(item => ((item.desc.indexOf(this.search) !== -1) && ((item.done == false && (this.picked == 1 || this.picked == 3)) || (item.done == true && (this.picked == 1 || this.picked == 2)))))
    },

  },
  mutations: {
    changePicked(store, value){
      store.picked1 = value
    },

    updateTaskList(store, data){
      store.taskList1 = data
    },

    buttonDoneChange(store, id){
      store.taskList1[id].done = !store.taskList1[id].done;
      axios.patch('http://localhost:3000/tasks/' + id, {
        done: store.taskList1[id].done,  
        updated: new Date(),
      })
    },

    deleteItem(store, id){
      if(id == store.taskList1.length-1){
        axios.delete(`http://localhost:3000/tasks/${store.taskList1.length-1}`)
        store.taskList1.splice(id, 1);
      } 
      else{
        store.taskList1.splice(id, 1);
        for(let i = 0; i < store.taskList1.length; i++){
          store.taskList1[i].id = i;
        }

        for(let i = id; i < this.taskList.length; i++){
          axios.patch('http://localhost:3000/tasks/' + i, {
            id: store.taskList1[i].id,
            title: store.taskList1[i].title,
            desc: store.taskList1[i].desc,
            created: store.taskList1[i].created,
            updated: store.taskList1[i].updated,
            done: store.taskList1[i].done
          })
        }

        setTimeout(() => { axios.delete(`http://localhost:3000/tasks/${store.taskList1.length}`) }, 500);        
      }
    },

    changeDescription(store, id){
      store.taskList1[id].desc = document.getElementById(id + "edit").value;
      axios.patch('http://localhost:3000/tasks/' + id, {
        desc: store.taskList1[id].desc,
        updated: new Date(),
      })
    },

    addTask(store, task){
      store.taskList1.push({
        id: store.taskList1.length,
        title: "title " + new Date(),
        desc: task,
        created: new Date(),
        updated: new Date(),
        done: false
      });  
      
      axios.post(`http://localhost:3000/tasks/` , {
        id: store.taskList1.length-1,
        title: "title " + new Date(),
        desc: task,
        created: new Date(),
        updated: new Date(),
        done: false
      })
    },

    
  },
  actions: {
    async getTaskList(store){
      const response = await axios.get("http://localhost:3000/tasks");
      store.commit("updateTaskList", response.data);
    }
  },
  modules: {
  }
})
