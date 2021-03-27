<template>
  <div>
    <button @click.prevent="show = 'stores'">Show stores</button>
    <button @click.prevent="show = 'cities'">Show cities</button>
    <ul v-if="show === 'stores'">
      <li v-for="store in dynamicStores" :key="store.uuid">
        {{ store.addressName }}
      </li>
    </ul>
    <ul v-if="show === 'cities'">
      <li v-for="city in dynamicCities" :key="city">{{ city }}</li>
    </ul>
  </div>
</template>

<script>
import stores from "../stores";
export default {
  data() {
    return {
      stores,
      dynamicStores: [],
      dynamicCities: [],
      show: "",
      cities: ["Amsterdam", "Veghel"],
    };
  },
  methods: {
    prepareDynamicStores() {
      let list = [];
      fetch(
        "https://gist.githubusercontent.com/ivicj/d73f7e8abc7fa57de6104b192c77d69e/raw/c96950c6fdc7c6cc90ef1109f8958a78efd53cf9/Stores"
      )
        .then((response) => response.json())
        .then((data) => {
          this.dynamicStores = data;
          this.dynamicCities = data
            .map((store) => store.city)
            .filter((item, idx, self) => self.indexOf(item) === idx);
        });
    },
  },
  async created() {
    await this.prepareDynamicStores();
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
}

li {
  display: inline-block;
  background: #fdc513;
  margin: 5px;
}
</style>
