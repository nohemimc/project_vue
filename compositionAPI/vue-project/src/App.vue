<template>
  <!-- Favorites -->
  <div class="favorites">
    <transition-group name="list">
      <div
        class="favorite"
        :class="{ 'favorite--selected': checkFavorite(favorite.login) }"
        v-for="favorite in allFavorites"
        :key="favorite.id"
      >
        <h2 class="favorite__name">{{ favorite.name }}</h2>
        <a @click.prevent="showFavorite(favorite)" href="#" target="_blank">
          <img
            :src="favorite.avatar_url"
            :alt="favorite.name"
            class="favorite__avatar"
          />
        </a>
      </div>
    </transition-group>
  </div>

  <!-- Content -->
  <article class="content">
    <h1 class="content__title">Search GitHub Users</h1>

    <!-- Search -->
    <form class="search" v-on:submit.prevent="doSearch()">
      <input
        v-model="search"
        type="text"
        class="search__input"
        required
        placeholder="Search GitHub users"
      />
      <input type="submit" class="search__submit" value="Search" />
    </form>

    <!-- Result -->
    <Transition>
      <div class="result" v-if="result">
        <a
          v-if="isFavorite"
          href="#"
          class="result__toggle-favorite"
          @click="removeFavorite"
          >Remove Favorite</a
        >
        <a v-else href="#" class="result__toggle-favorite" @click="addFavorite"
          >Add Favorite</a
        >
        <h2 class="result__name">{{ result.name }}</h2>
        <img
          v-bind:src="result.avatar_url"
          :alt="result.name"
          class="result__avatar"
        />
        <p class="result__bio">
          {{ result.bio }} <br />
          <a v-bind:href="result.blog" target="_blank" class="result__blog">{{
            result.blog
          }}</a>
        </p>
      </div>
    </Transition>

    <!-- Error -->
    <div v-if="error" class="result__error">{{ error }}</div>
  </article>
</template>

<script>
import { ref, computed } from "vue";
export default {
  name: "App",
  setup() {
    const search = ref(null);
    const result = ref(null);
    const error = ref(null);
    const favorites = ref(new Map());

    const requestMaxTimeMs = 3000;

    const savedFavorites = JSON.parse(window.localStorage.getItem("favorites"));
    if (savedFavorites?.length) {
      const favorites = new Map(
        savedFavorites.map((favorite) => [favorite.login, favorite])
      );
      favorites.value = favorites;
    }

    const isFavorite = computed(() => favorites.value.has(result.value.login));
    const allFavorites = computed(() => Array.from(favorites.value.values()));

    async function doSearch() {
      const foundInFavorites = favorites.value.get(search.value);
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
        return (result.value = foundInFavorites);
      }
      await doRequest();
      if (foundInFavorites) foundInFavorites.lastRequest = new Date();
    }

    async function doRequest() {
      try {
        console.log("Not found or cached version is too old");
        result.value = error.value = null;
        const response = await fetch(API + search.value);
        if (!response.ok) throw new Error("User not found");
        const data = await response.json();
        result.value = data;
      } catch (error) {
        error.value = error;
      } finally {
        search.value = null;
      }
    }

    function addFavorite() {
      result.value.lastRequest = new Date();
      favorites.value.set(result.value.login, result.value);
      updateStorage();
    }

    function removeFavorite() {
      favorites.value.delete(result.value.login);
      updateStorage();
    }

    function showFavorite(favorite) {
      result.value = favorite;
    }

    function checkFavorite(id) {
      return result?.value.login === id;
    }

    function updateStorage() {
      window.localStorage.setItem(
        "favorites",
        JSON.stringify(allFavorites.value)
      );
    }

    return {
      search,
      result,
      error,
      favorites,

      isFavorite,
      allFavorites,

      doSearch,
      doRequest,

      addFavorite,
      removeFavorite,
      showFavorite,
      checkFavorite,
      updateStorage,
    };
  },
};
</script>
