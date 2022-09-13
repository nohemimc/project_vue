<template>
  <div>

    <!-- Cambio del color del titulo -->
    <div v-for="(btn, index) in botones" :key="index" class="select-age">
      <h1  :class="[btn.className, { selected: selectedIndex === index }]" >Cambia el titulo</h1>
      <div class="div_buttons" >
        <button
          class="botones"
          @click="selectedIndex = index"
        >
          {{ btn.btnName }}
        </button>
      </div>
    </div>

    <!-- Uso de los emits -->
    <div>
      <p>Uso de emit</p>
      <button @click="notify">{{example}}</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedIndex: -1,
      botones: [
        {
          btnName: "Blue",
          className: "btn-negro",
          state: 0,
        },
        {
          btnName: "Red",
          className: "btn-azul",
          state: 1,
        },
        {
          btnName: "Green",
          className: "btn-verde",
          state: 2,
        },
      ],

      example: "Limpiar DOM"
    };
  },
  methods: {
    notify() {
      this.$emit("notification", this.example)
    }
  }
};
</script>

<style scoped>
.div_buttons{
  display: inline-block;
}
.botones {
  background-color: gray;
  color: white;
  width: 5rem;
  height: 3rem;
  justify-content: space-between;
}
.selected.btn-negro {
  background: white;
  color: black;
}

.selected.btn-azul {
  background: white;
  color: red;
}

.selected.btn-verde {
  background: white;
  color: green;
}
</style>
