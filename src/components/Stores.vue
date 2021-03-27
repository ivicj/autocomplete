<template>
  <div>
    <button @click.prevent="show = 'stores'">Show stores</button>
    <button @click.prevent="show = 'cities'">Show cities</button>

    <search-autocomplete :items="dynamicStores"  @filteredResults="filteredResults($event)"/>

    <ul v-if="show === 'stores'">
      <li v-for="store in filteredDynamicStores" :key="store.uuid">
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
import SearchAutocomplete from "./SearchAutocomplete.vue";

export default {
  components: {
    SearchAutocomplete,
  },
  data() {
    return {
      stores,
      dynamicStores: [],
      dynamicCities: [],
      filteredDynamicStores: [],
      show: "",
      cities: ["Amsterdam", "Veghel"],
    };
  },
  methods: {
    prepareDynamicStores() {
      fetch("/stores.json")
        .then((response) => response.json())
        .then((data) => {
          this.dynamicStores = data;
          this.filteredDynamicStores = this.dynamicStores;
          this.dynamicCities = data
            .map((store) => store.city)
            .filter((item, idx, self) => self.indexOf(item) === idx);
        });
    },
    filteredResults (filteredData) {
      var filteredList = [];
      if(Array.isArray(filteredData)){
        filteredList = filteredData;
      } else {
        filteredList.push(filteredData); 
      }
      this.filteredDynamicStores = filteredList;
      return this.filteredDynamicStores;
   }
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
