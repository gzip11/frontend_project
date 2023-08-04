import {defineStore} from "pinia";
import {reactive} from "vue";

export const userStore = defineStore('userInfo', () => {
    const auth = reactive({
        user: null,
    })
    return { auth }
})