<template>
  <div class="autocomplete">
    <input
      type="text"
      @input="onChange"
      v-model="search"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter="onEnter"
    />
    <ul id="autocomplete-results" v-show="isOpen" class="autocomplete-results">
      <li class="loading" v-if="isLoading">Loading results...</li>
      <li
        v-else
        v-for="(result, i) in results"
        :key="i"
        @click="setResult(result)"
        class="autocomplete-result"
        :class="{ 'is-active': i === arrowCounter, 'is-red': result.indicator === 'red', 'is-green': result.indicator === 'green' }"
      >
        {{ result.city }} - {{ result.addressName }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SearchAutocomplete",
  props: {
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
    isAsync: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      isOpen: false,
      results: [],
      search: "",
      isLoading: false,
      arrowCounter: -1,
    };
  },
  watch: {
    items: function (value, oldValue) {
      if (value.length !== oldValue.length) {
        this.results = value;
        this.isLoading = false;
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  destroyed() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    setResult(result) {
      this.search = result.city + " - " + result.addressName;
      this.isOpen = false;
    },
    filterResults() {
      //   this.results = this.items.filter((item) => {
      //     return item.city.toLowerCase().indexOf(this.search.toLowerCase()) > -1 || item.addressName.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      //   });
      this.results = this.items
        .map((item) => {
          if (item.city.toLowerCase().indexOf(this.search.toLowerCase()) > -1) {
            item.indicator = "green";
          } else if (
            item.addressName.toLowerCase().indexOf(this.search.toLowerCase()) >
            -1
          ) {
            item.indicator = "red";
          } else item.indicator = null;
          return item;
        })
        .filter((item) => {
          return (
            item.city.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
            item.addressName.toLowerCase().indexOf(this.search.toLowerCase()) >
              -1
          );
        });
    },
    onChange() {
      this.$emit("input", this.search);

      if (this.isAsync) {
        this.isLoading = true;
      } else {
        this.filterResults();
        this.isOpen = true;
      }
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false;
        this.arrowCounter = -1;
      }
    },
    onArrowDown() {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1;
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
      }
    },
    onEnter() {
      this.search =
        this.results[this.arrowCounter].city +
        " - " +
        this.results[this.arrowCounter].addressName; 
      this.isOpen = false;
      this.arrowCounter = -1;
    },
  },
};
</script>

<style>
.autocomplete {
  position: relative;
}

.autocomplete-results {
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  height: 1120px;
  overflow: auto;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result.is-red {
    background-color: red;
}

.autocomplete-result.is-green {
    background-color: green;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: #4aae9b;
  color: white;
}
</style>