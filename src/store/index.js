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
    todoSort: store => search => {
      return store.taskList1.filter(item => ((item.desc.indexOf(search) !== -1) && ((item.done == false && (store.picked1 == 1 || store.picked1 == 3)) || (item.done == true && (store.picked1 == 1 || store.picked1 == 2)) ) ) );
    },

    newId(store){
      return store.taskList1.length-1
    },

    getItemDone(store, id){
      console.log(store, id)
      // return true
      return store.taskList1[id].done
    },

    list(store){
      return store.taskList1
    }

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
      // axios.patch('http://localhost:3000/tasks/' + id, {
      //   done: store.taskList1[id].done,  
      //   updated: new Date(),
      // })
    },
    deleteItem(store, id){

      console.log(id)
      console.log(store.taskList1.length-1)

      if(id == store.taskList1.length-1){
        // axios.delete(`http://localhost:3000/tasks/${store.taskList1.length-1}`)
        store.taskList1.splice(id, 1);
      } 
      else{
        store.taskList1.splice(id, 1);
        for(let i = 0; i < store.taskList1.length; i++){
          store.taskList1[i].id = i;
        }

        // for(let i = id; i < store.taskList1.length; i++){
        //   axios.patch('http://localhost:3000/tasks/' + i, {
        //     id: store.taskList1[i].id,
        //     title: store.taskList1[i].title,
        //     desc: store.taskList1[i].desc,
        //     created: store.taskList1[i].created,
        //     updated: store.taskList1[i].updated,
        //     done: store.taskList1[i].done
        //   })
        // }

        // setTimeout(() => { axios.delete(`http://localhost:3000/tasks/${store.taskList1.length}`) }, 500);        
      }
    },
    changeDescription(store, id){
      store.taskList1[id].desc = document.getElementById(id + "edit").value;
      // axios.patch('http://localhost:3000/tasks/' + id, {
      //   desc: store.taskList1[id].desc,
      //   updated: new Date(),
      // })
    },
    addTask(store, task){
      // console.log(store.taskList1)

      store.taskList1.push({
        id: store.taskList1.length,
        title: "title " + new Date(),
        desc: task,
        created: new Date(),
        updated: new Date(),
        done: false
      });  
      
      // axios.post(`http://localhost:3000/tasks/` , {
      //   id: store.taskList1.length-1,
      //   title: "title " + new Date(),
      //   desc: task,
      //   created: new Date(),
      //   updated: new Date(),
      //   done: false
      // })
    },  
  },
  actions: {
    async getTaskList(store){
      const response = await axios.get("http://localhost:3000/tasks");
      store.commit("updateTaskList", response.data);
    },
    async addTaskAction(store, task, newId){
    
      store.commit("addTask", task);
      
      axios.post(`http://localhost:3000/tasks/` , {
        id: newId,
        title: "title " + new Date(),
        desc: task,
        created: new Date(),
        updated: new Date(),
        done: false
      })
    },
    async changeDescriptionAction(store, id){
      // store.taskList1[id].desc = document.getElementById(id + "edit").value;
      store.commit("changeDescription", id);

      axios.patch('http://localhost:3000/tasks/' + id, {
        desc: document.getElementById(id + "edit").value,
        // desc: store.taskList1[id].desc,
        updated: new Date(),
      })
    },
    async buttonDoneChangeAction(store, item){

      store.commit("buttonDoneChange", item[0]);

      console.log(item[0])
      console.log(item[1])

      axios.patch('http://localhost:3000/tasks/' + item[0], {
        done: !item[1],  
        updated: new Date(),
      })
    },
    // async deleteItemAction(store, id, length, list){

    //   // console.log('id: ', arr[0])
    //   // console.log('length: ', arr[1])

    //   store.commit("deleteItem", id);
      

    //   if(id == length){
    //     axios.delete(`http://localhost:3000/tasks/${length}`)
    //   } 
    //   else{

    //     for(let i = id; i < length; i++){
    //       axios.patch('http://localhost:3000/tasks/' + i, {
    //         id: list[i].id,
    //         title: list[i].title,
    //         desc: list[i].desc,
    //         created: list[i].created,
    //         updated: list[i].updated,
    //         done: list[i].done
    //       })
    //     }
    //     // console.log('http://localhost:3000/tasks/' + (arr[1]))

    //     setTimeout(() => { axios.delete('http://localhost:3000/tasks/' + (length)) }, 500);  
    //   }
    // },
    async deleteItemAction(store, arr/*id, length, list*/){

      // console.log('id: ', arr[0])
      // console.log('length: ', arr[1])

      store.commit("deleteItem", /*id*/arr[0]);
      

      if(arr[0] == arr[1]){
        axios.delete(`http://localhost:3000/tasks/${arr[1]}`)
      } 
      else{

        for(let i = arr[0]; i < arr[1]; i++){
          axios.patch('http://localhost:3000/tasks/' + i, {
            id: arr[2][i].id,
            title: arr[2][i].title,
            desc: arr[2][i].desc,
            created: arr[2][i].created,
            updated: arr[2][i].updated,
            done: arr[2][i].done
          })
        }
        // console.log('http://localhost:3000/tasks/' + (arr[1]))

        setTimeout(() => { axios.delete('http://localhost:3000/tasks/' + (arr[1])) }, 500);  
      }
    },
  },
  modules: {
  }
})
