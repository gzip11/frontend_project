import { ref, computed ,reactive} from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('store', () => {
    const auth = reactive({
        user:null
    });
    return { auth }
})
