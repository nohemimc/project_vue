<template>
  <input type="file" @change="getFile($event)">
  <Botón @click="Enviarform($evento)"> Enviar </Botón>
</template>

<script>
export default {
  data() {
    return {
      message: 'Ejemplo Vue-Axios'
    }
  },
  methods: {
    metods: {
      getFile(event) {
        this.file = event.target.files[0];
      },
      submitForm(event) {
        event.preventDefault();

        let formData = new FormData();
        formData.append('name', this.name);
        formData.append('age', this.age);
        formData.append('file', this.file);

        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }

        this.$http.post(url, formData, config).then(res => {
          console.log(res)
        })

      }
    }

  }
}

</script>

