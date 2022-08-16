<script>
import router from '@/router';

export default {
  name: 'isAuthorised',

  async mounted(){
    const data = await localStorage.getItem('isАuthorized')
    console.log(data)
    if(data != '1'){
      router.push({path: '/'})
    }
  }, 

}
</script>