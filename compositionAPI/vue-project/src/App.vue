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
    <!-- <Transition>
          <app-profile 
                    v-if="result" 
                    :result="result"
                    :is-favorite="isFavorite" 
                    @add-favorite="addFavorite"
                    @remove-favorite="removeFavorite" />
        </Transition> -->

    <!-- Error -->
    <div v-if="error" class="result__error">{{ error }}</div>
  </article>
</template>

<script>
import { ref } from "vue";
export default {
  name: "App",
  setup() {
    const search = ref(null);
    const result = ref(null);
    const error = ref(null);
    const favorites = ref(new Map());

    return {
      search,
      result,
      error,
      favorites,
    };
  },
};
</script>