<template>
  <div class="content">
    <h2>Seleccione un archivo:</h2>
    <form @submit.prevent="enviarArchivo">
      <input class="file__input" type="file" name="file" ref="archivo" />
      <button class="enviar__button" type="submit">Enviar</button>
    </form>
  </div>
  <div>
    <div v-if="alert">
        <h1>Carga un archivo</h1>
    </div>
    <div v-else>
      <h3>Archivo de Excel</h3>
      <table class="table" summary="Archivo de Excel">
        <thead>
          <tr>
            <th scope="col">Número 1</th>
            <th scope="col">Número 2</th>
            <th scope="col">Suma</th>
            <th scope="col">Resta</th>
            <th scope="col">Multiplicación</th>
            <th scope="col">División</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" v-bind:key="item.colum1">
            <th scope="row">{{ item.colum1 }}</th>
            <td>{{ item.colum2}}</td>
            <td>{{ item.suma }}</td>
            <td>{{ item.resta }}</td>
            <td>{{ item.multiplicación }}</td>
            <td>{{ item.division }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script>
import axios from "axios";
import { ref } from "vue";

export default {
  name: "app",
  setup() {

    const archivo = ref(null)
    const items = ref([])
    const alert = ref(false)

    function enviarArchivo() {
      const formData = new FormData();
      formData.append('file', archivo.value.files[0])
      // console.log(formData);

      axios
        .post("http://192.168.1.71:3000/proxy", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Respuesta", response);
            items.value = response.data
            
        })
        .catch((err) => {
          console.log("Error", err);
          alert = true;

        });
    }
    return { enviarArchivo, archivo, items, alert };
  }
};
</script>

<style scoped>

.content {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  color: black;
  background-color: rgb(104, 160, 220);
  padding: 5rem;
  border: 2px solid white;
}

.file__input {
  margin-top: 1.5rem;
  width: 100%;
}

.enviar__button {
  display: block;
  margin-top: 1.5rem;
  height: 2rem;
  color: yellow;
  background-color: black;
  width: 20%;
}

/* spacing */

table {
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  border: 2px solid white;
}

.table thead tr {
  background-color: white;
  color: black;
}
th, td{
  text-align: right;
}

tbody tr td::after {
  background-color: yellow;
}

.table tbody tr {
  border-bottom: 1px solid #dddddd;
}
thead th:nth-child(1) {
  width: 15%;
}

thead th:nth-child(2) {
  width: 15%;
}

thead th:nth-child(3) {
  width: 15%;
}

thead th:nth-child(4) {
  width: 15%;
}

th, td {
  padding: 10px;
}


</style>