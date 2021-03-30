<template>
  <div>
    <div>
      <button @click.prevent="show = 'stores'">Show stores</button>
      <button @click.prevent="show = 'cities'">Show cities</button>
    </div>

    <div v-if="show === 'cities'">
      <button v-if="sortDirection === 'asc'" v-on:click="sort('desc')">
        DESC
      </button>
      <button v-if="sortDirection === 'desc'" v-on:click="sort('asc')">
        ASC
      </button>
    </div>

    <search-autocomplete
      v-if="show === 'stores'"
      :items="dynamicStores"
      @filteredResults="filteredResults($event)"
    />

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
import SearchAutocomplete from "./SearchAutocomplete.vue";

export default {
  components: {
    SearchAutocomplete,
  },
  data() {
    return {
      dynamicStores: [],
      dynamicCities: [],
      filteredDynamicStores: [],
      // sortedDynamicCities: [],
      show: "",
      sortDirection: "",
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
          this.sortDirection = "asc";
          this.dynamicCities = data
            .map((store) => store.city)
            .filter((item, idx, self) => self.indexOf(item) === idx)
            .sort((a, b) => a.localeCompare(b));
        });
    },
    filteredResults(filteredData) {
      var filteredList = [];
      if (Array.isArray(filteredData)) {
        filteredList = filteredData;
      } else {
        filteredList.push(filteredData);
      }
      this.filteredDynamicStores = filteredList;
      return this.filteredDynamicStores;
    },
    sort(sortDirection) {
      this.sortDirection = sortDirection;
      if (sortDirection == "desc")
        return this.dynamicCities.sort((a, b) => b.localeCompare(a));
      return this.dynamicCities.sort((a, b) => a.localeCompare(b));
    },
  },
  async created() {
    await this.prepareDynamicStores();
  },
};
</script>

<style lang="scss" scoped>
button {
  border: 1px solid #fdc513;
  padding: 16px;
  line-height: 24px;
  background-color: #fdc6134d;
  margin-bottom: 5px;
}

button:hover,
button:active {
  background-color: #fdc613d2;
  cursor: pointer;
}

ul {
  list-style: none;
}

li {
  display: inline-block;
  background: #fdc513;
  margin: 5px;
  border-radius: 4px;
  border: 1px solid #fdc513;
  padding: 16px;
  line-height: 24px;
}

li:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 17px rgba(0, 0, 0, 0.35);
  cursor: pointer;
  border: 1px solid #000;
}
</style>
