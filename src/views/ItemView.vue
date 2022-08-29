<template>
  <div class="item">
    <div class="item__wrapper">
      <p class="item__title">{{this.$store.state.list[this.id-1].title}}</p>
      <div class="item__main">

        <div class="item__main-left">
          <v-carousel 
            hide-delimiters 
            class="item__carousel"
          >
            <v-carousel-item
              class="item__carousel-item"
              transition="fade-transition"
              reverse-transition="fade-transition"
            >
              <img class="item__carousel-image" :src="this.$store.state.list[this.id-1].image" alt="item-pic">
            </v-carousel-item>
          </v-carousel>          
        </div>

        <div class="item__main-right">
          <div class="item__main-right-up">
            <p class="item__price">Цена: {{this.$store.state.list[this.id-1].price}}</p>
          </div>
          <div class="item__main-right-down">
            <button class="item__counter counter-minus" v-on:click="countDec()">-</button>
            <input  class="item__counter counter-num" type="number" v-model="count" disabled>
            <button class="item__counter counter-plus" v-on:click="countInc()">+</button>
            <button class="item__buy-btn" @click="addItem()">Купить</button>
          </div>
        </div>



      </div>
      <!-- ////////////////////////////////////////////////////// -->
      <v-card class="item__tabs">
        <v-tabs color="black" background-color="blue lighten-4">
          <v-tab class="item__tab-title">
            Характеристики
          </v-tab>
          <v-tab class="item__tab-title">
            Описание
          </v-tab>
          <v-tab class="item__tab-title">
            Отзывы
          </v-tab>

          <v-tab-item>
            <v-card flat>
              <v-card-text class="item__tab-inner">
                <ul>
                  <li>
                    Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Aliquam lobortis. Aliquam lobortis. Suspendisse non nisl sit amet velit hendrerit rutrum.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quisquam esse deserunt nobis cupiditate pariatur maxime similique hic veniam laudantium aperiam dolore eligendi quo exercitationem unde eos, et facilis magnam!
                  </li>
                </ul>

              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="item__tab-inner">
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt, facilis. Reprehenderit voluptates repellendus similique dignissimos sapiente dolorem quam dolores, optio deleniti deserunt. Omnis dolorum, iure sequi facilis in aliquid et. Etiam ut purus mattis mauris sodales aliquam. Ut varius tincidunt libero. Aenean viverra rhoncus pede. Duis leo. Fusce fermentum odio nec arcu.
                </p>

                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt, facilis. Reprehenderit voluptates repellendus similique dignissimos sapiente dolorem quam dolores, optio deleniti deserunt. Omnis dolorum, iure sequi facilis in aliquid et. Etiam ut purus mattis mauris sodales aliquam. Ut varius tincidunt libero. Aenean viverra rhoncus pede. Duis leo. Fusce fermentum odio nec arcu.
                </p>

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis expedita aut harum porro sint cupiditate ad error voluptate iusto! Facilis sequi quia, nemo ducimus voluptatum omnis repellat rerum suscipit molestias. Donec venenatis vulputate lorem. Aenean viverra rhoncus pede. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Fusce commodo aliquam arcu. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi.
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="item__tab-inner item__reviews">
                <div class="item__reviews-watch">
                  <div>
                    <p>UserName</p>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis, quis. Veritatis dolores pariatur quas culpa repudiandae id libero ipsam, commodi sunt aperiam ipsa iure consequuntur quo aliquid aliquam. Animi, voluptates!</p>
                    <p>date of review</p>
                  </div>
                </div>
                <div class="item__reviews-add">
                  <!-- здесь будет форма добавления отзыва -->
                  <p class="item__reviews-add-header">Оставить отзыв</p>
                  <input class="item__reviews-add-name" placeholder="Имя" type="text">
                  <!-- <input class="item__reviews-add-review" placeholder="Отзыв" type="text" name="" id=""> -->
                  <textarea class="item__reviews-add-review" placeholder="Отзыв" name="" id="" cols="30" rows="10"></textarea>
                  <button class="item__reviews-add-btn">Отправить</button>
                </div>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
      <!-- ////////////////////////////////////////////////////// -->
    </div>

    <TopSalesBlock/>
    
  </div>
</template>

<script>
import TopSalesBlock from '@/components/TopSalesBlock.vue';

export default{
  name: 'ItemView',
  components:{
    TopSalesBlock
  },
  props: ['id'],
  data(){
    return{
      count: 1
    }
  },
  updated(){
    if (this.count < 1){
      this.count = 1
    }
    if (this.count > 99){
      this.count = 99
    }
  },

  watch:{
    id(){
      this.count = 1
    }
  },
  methods:{
    countInc(){
      this.count++
    },
    countDec(){
      this.count--
    },
    addItem(){
      console.log(this.id)
      let object = localStorage.getItem('cart')
      if(object){
        let cart = new Map(Object.entries(JSON.parse(object) )); // достает из JSON object обратно map

        if (cart.has(String(this.id))){
          let count = cart.get(String(this.id))
          count = count + this.count;
          cart.set(String(this.id), count)

        } else {
          cart.set(String(this.id), this.count)
        }

        const obj = Object.fromEntries(cart);
        localStorage.setItem('cart', JSON.stringify(obj));
        this.$store.commit('updateCartLength', cart.size)

      } else {
        let cart = new Map([[String(this.id), this.count]]);

        const obj = Object.fromEntries(cart);
        localStorage.setItem('cart', JSON.stringify(obj));
        this.$store.commit('updateCartLength', cart.size)
      }
    }
  }
}
</script>

<style scoped>
.item{
  padding: 16px;
}
.item__main{
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.item__wrapper{
  display: flex;
  flex-direction: column;
}

.item__title{
  font-size: 40px;
  font-weight: bold;
}

.item__tabs{
  height: 300px;
  margin-bottom: 20px;
}

.item__reviews{
  display: flex;
  justify-content: space-between;
}

.item__reviews-watch, .item__reviews-add{
  width: 45%;
}
.item__reviews-add{
  display: flex;
  flex-direction: column;
}
.item__reviews-add-header{
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
}
.item__reviews-add-review, .item__reviews-add-name{
  border: 2px solid grey;
  width: 90%;
  margin-bottom: 10px;
  border-radius: 10px;
  height: 40px;
  padding: 10px;
}
.item__reviews-add-review{
  height: 80px;
}
.item__reviews-add-btn{
  width: 200px;
  height: 40px;
  background-color: lawngreen;
  border-radius: 10px;
}

.item__main-left{
  width: 1000px;
}

.item__carousel-item{
  margin: auto;
}
.item__carousel-image{
  max-height: 500px;
}

.item__price{
  font-size: 40px;
  font-weight: bold;
}

.item__main-right-down{
  display: flex;
}

.counter-plus, .counter-minus{
  font-size: 30px;
  width: 75px;
  border: 2px solid gray;
}

.counter-minus{
  border-radius: 10px 0 0 10px;
  border-right: 0;
}
.counter-plus{
  border-radius: 0 10px 10px 0;
  border-left: 0;
}

.counter-num{
  font-size: 40px;
  padding-left: 17px;
  width: 75px;
  border-top: 2px solid gray;
  border-bottom: 2px solid gray;
}

.item__buy-btn{
  background-color: lawngreen;
  height: 75px;
  width: 300px;
  border-radius: 10px;
  font-size: 30px;
  margin-left: 20px;
}
</style>