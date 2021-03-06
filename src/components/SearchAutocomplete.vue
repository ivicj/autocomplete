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
        :class="{
          'is-active': i === arrowCounter,
          'is-red': result.indicator === 'red',
          'is-green': result.indicator === 'green',
          'is-neutral': result.indicator === 'neutral' || null,
        }"
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
      this.$emit("filteredResults", result);
      this.search = result.city + " - " + result.addressName;
      this.isOpen = false;
    },
    filterResults() {
      if (this.search !== "")
        this.results = this.items
          .map((item) => {
            if (
              item.city.toLowerCase().indexOf(this.search.toLowerCase()) > -1
            ) {
              item.indicator = "green";
            } else if (
              item.addressName
                .toLowerCase()
                .indexOf(this.search.toLowerCase()) > -1
            ) {
              item.indicator = "red";
            } else item.indicator = "neutral";
            return item;
          })
          .filter((item) => {
            return (
              item.city.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
              item.addressName
                .toLowerCase()
                .indexOf(this.search.toLowerCase()) > -1
            );
          });
      else
        this.results = this.items.map((item) => {
          item.indicator = "neutral";
          return item;
        });
    },
    onChange() {
      this.$emit("input", this.search);
      this.arrowCounter = -1;
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
      if (this.arrowCounter >= 0) {
        this.search =
          this.results[this.arrowCounter].city +
          " - " +
          this.results[this.arrowCounter].addressName;
        this.$emit("filteredResults", this.results[this.arrowCounter]);
      } else {
        this.$emit("filteredResults", this.results);
      }
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

input {
  background-color: #fdc6134d;
  border: 1px solid #fdc513;
  padding: 5px;
  line-height: 24px;

}

input:hover {                                 
  cursor: text;
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

.autocomplete-result.is-neutral {
  background-color: #eee;
}

.autocomplete-result.is-red {
  background-color: #b81417ad;
}

.autocomplete-result.is-green {
  background-color: #4aae9b;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: #fdc513;
  color: white;
}
</style>