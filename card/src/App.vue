<template>
  <div id="app">

    <!-- Uso del emit, nombre del evento personalizado y la función a realizar en el componente hijo "HelloWorld" -->
    <HelloWorld @notification="message"/>

    <!-- Ejemplo del watcher -->
    <div>
      <input type="text" @keypress="valueInput">
    </div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  data() {
    return {
      valueInput: "",
    };
  },
  components: {
    HelloWorld
  },
  methods: {

    // Función del evento personalizado: "notification"
    message() {
      console.log("Limpieza del DOM FINAL");
    }
  },
  watch:{
    entrada: function () {
      console.log(this.valueInput);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
