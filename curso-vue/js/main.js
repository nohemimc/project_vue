//API REST de github
const API = "https://api.github.com/users/";

const requestMaxTimeMs = 3000; //Definición de tiempo máximo para volver a realizar una petición, para la actualización de los usuarios favoritos que están en el localStorage

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
  // Ciclo de vida: created()
  created() {
    // savedFavorites: Recupera los usuarios favoritos que previamente ya fueron añadidos como favoritos. Primero transforma la cadena de texto en un objeto, después recorre ese array con savedFavorites.length y una vez que esta iterando dicho array evalúa si el usuario existe como favortio, si es existe obtiene de manera individual a cada usuario y obteniendo su nombre de usuario y su información.
    const savedFavorites = JSON.parse(window.localStorage.getItem("favorites"));
    if (savedFavorites?.length) {
      const favorites = new Map(
        savedFavorites.map((favorite) => [favorite.login, favorite])
      );
      this.favorites = favorites;
    }
  },
  // Propiedades computadas
  computed: {
    isFavorite() {
      return this.favorites.has(this.result.login);
    },
    allFavorites() {
      return Array.from(this.favorites.values());
    },
  },
  methods: {
    //Función para solicitar información de usuarios de github desde la API REST de GitHub
    async doSearch() {
      // Encuentra a los favoritos con la petición que se realiza en el input: search
      const foundInFavorites = this.favorites.get(this.search);

      //Si el perfil está en favoritos y no transcurrido el tiempo necesario, cargamos la información local. De lo contrario hacemos una nueva petición y reiniciamos el temporizador
      const shouldRequestAgain = (() => {
        if (!!foundInFavorites) {
          const { lastRequest } = foundInFavorites;
          return (
            new Date().getTime() - new Date(lastRequest).getTime() >
            requestMaxTimeMs
          );
        }
        return false;
      })(); // IIFE

      if (!!foundInFavorites && !shouldRequestAgain) {
        console.log("Found and we use the cached version");
        return (this.result = foundInFavorites);
      }

      await this.doRequest();
      if (foundInFavorites) foundInFavorites.lastRequest = new Date();
    },

    async doRequest() {
      try {
        console.log("Not found or cached version is too old");
        this.result = this.error = null;
        const response = await fetch(API + this.search);
        if (!response.ok) throw new Error("User not found");
        const data = await response.json();
        this.result = data;
      } catch (error) {
        this.error = error;
      } finally {
        this.search = null;
      }
    },

    //Función para añadir a favoritos a varios usuarios de github
    addFavorite() {
      this.result.lastRequest = new Date();
      this.favorites.set(this.result.login, this.result);
      this.updateStorage();
    },

    // Función para eliminar favoritos
    removeFavorite() {
      this.favorites.delete(this.result.login);
      this.updateStorage();
    },

    // Función para cargar la información del usuario favorito dentro de "component"
    showFavorite(favorite) {
      this.result = favorite;
    },

    // Función  para dar un efecto a los usuarios favoritos
    checkFavorite(id) {
      return this.result?.login === id;
    },

    // Función para almacenar los datos de navegación: Se obtienen los usuarios de 'favorites', se guardan en memoria con localStorage y se convierten en Strings con JSON.stringify
    updateStorage() {
      window.localStorage.setItem(
        "favorites",
        JSON.stringify(this.allFavorites)
      );
    },
  },
});
