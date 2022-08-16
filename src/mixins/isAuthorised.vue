<script>
import router from '@/router';

export default {
  name: 'isAuthorised',

  async mounted(){
    const data = await localStorage.getItem('isАuthorized')
    if(data != '1'){
      router.push({path: '/'})
    }
  }, 

}
</script>