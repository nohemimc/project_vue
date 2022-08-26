//API REST de github
const API = "https://api.github.com/users/";

//Intancia VUE
const app = Vue.createApp({
  //Modelo de la instancia de Vue
  data() {
    return {
      search: null,
      result: null,
      error: null,
      favorites: new Map(),
    };
  },
//   Propiedades computadas
  comput: {
    isFavorite() {
        return this.favorites.has(this.result.id)
    }
  },
  methods: {
    //Función para solicitar información de usuarios de github desde la API REST de GitHub
    async doSearch() {
      this.result = this.error = null;
      try {
        const response = await fetch(API + this.search);
        if (!response.ok) throw new Error("User not found");
        const data = await response.json();
        console.log(data);
        this.result = data; //Trae del API la data correspondiente
      } catch (error) {
        this.error = error;
      } finally {
        this.search = null;
      }
    },

    //Función para añadir a favoritos a varios usuarios de github
    addFavorite() {
      this.favorites.set(this.result.id, this.result); 
    }
  },
});
