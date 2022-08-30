<template>
  <div class="content">
    <h2>Seleccione un archivo:</h2>
    <form method="post" v-on:change="enviar">
      <input class="file__input" type="file" name="file" />
      <button class="subir__button" type="submit">Enviar archivo</button>
    </form>
  </div>
</template>

<script>
import { axios } from "axios";
import { ref } from "vue";

export default {
  name: "app",
  setup() {
    enviar = ref(null)

    function enviarArchivo() {
      const formData = new FormData();
      axios
        .post("http://192.168.1.71:5000/files/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log("Respuesta", res);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
    return { enviarArchivo, enviar };
  },
};
</script>

<style scoped>
.content {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  color: black;
  background-color: rgb(104, 160, 220);
  width: 50vw;
  height: 50vh;
  padding: 5rem;
}

.file__input {
  margin-top: 1.5rem;
}

.subir__button {
  display: block;
  margin-top: 1.5rem;
  height: 2rem;
}
</style>
