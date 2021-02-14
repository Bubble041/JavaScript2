Vue.component('error', {
    data(){
        return {
            error: ''
        }
    },
    methods: {
      setError(error){
          this.error = error
      }
    },
    computed: {
      isVisible(){
          return this.error !== ''
      }
    },
    template: `
    <div class="error-block" v-if="isVisible"> 
        <p class="error-msg">
            <button class="close-btn" @click="setError('')">&times;</button>
            {{ text }}
        </p>
    </div>
    `
});
