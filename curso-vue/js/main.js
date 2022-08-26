const API = "https://api.github.com/users/"; //API REST de github

//Intancia VUE
const app = Vue.createApp({
  data() {
    //Modelo
    return {
      search: null,
      result: null,
      error: null,
    };
  },
  methods: {
    //Función para solicitar información de perfiles de github desde su API REST
    async doSearch() {
        this.result = this.error = null
      try {
        const response = await fetch(API + this.search);
        if (!response.ok) throw new Error("User not found")
        const data = await response.json();
        console.log(data);
        this.result = data; //Trae del API la data correspondiente
      } catch (error) {
        this.error = error
      } finally {
        this.search = null
      }
    },
  },
});
