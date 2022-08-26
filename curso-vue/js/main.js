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
  // Fase del ciclo de vida: created()
  created() {
    const savedFavorites = JSON.parse((window.localStorage.getItem("favorites")));
    if (savedFavorites?.length) {
      const favorites = new Map(savedFavorites.map(favorite => [favorite.id, favorite]));
      this.favorites = favorites
    }
  },
  // Propiedades computadas
  computed: {
    // isFavorite() {
    //   if (this.result != null)
    //     return this.favorites.has(this.result.id)
    //   else
    //     return true
    // },
    isFavorite() {
        return this.favorites.has(this.result.id)
    }, 
    allFavorites() {
      return Array.from(this.favorites.values())
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
        // console.log(data);
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
      this.updateStorage();
    },

    // Función para eliminar favoritos
    removeFavorite() {
      this.favorites.delete(this.result.id);
      this.updateStorage();
    },

    // Función para cargar la información del usuario favorito dentro de "component"
    showFavorite(favorite) {
      this.result = favorite
    },

    // Función para almacenar los datos de navegación
    updateStorage() {
      window.localStorage.setItem('favorites', JSON.stringify(this.allFavorites))
    }
  },
});
