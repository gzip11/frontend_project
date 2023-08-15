import {defineStore} from "pinia";
import {reactive} from "vue";

export const useSearchStore = defineStore('search',{
    state: () => {
        return {
            searchResult: [],
        }
    },
    getters: {

    },
    actions: {
        updateSearchResult(result) {
            this.searchResult = result;
        }
    }
})

export const userStore = defineStore('userInfo', () => {
    const auth = reactive({
        user: null,
    })
    return { auth }
})