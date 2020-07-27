<template>
  <div class="home">
    <b-container class="bv-example-row">
      <b-row align-v="center">
        <Card
          v-for="web in displayWebsites"
          :key="web.id"
          :id="web.id"
          :title="web.title"
          :imgsrc="web.imgsrc"
          :alt="web.alt"
          :tag="web.tag"
          :styles="web.styles"
          :classe="web.classe"
          :cardtext="web.cardtext"
          :buttontext="web.buttontext"
          :headers="web.headers"
          :pText="web.cardtext"
        />
      </b-row>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        first-text="First"
        prev-text="Prev"
        next-text="Next"
        last-text="Last"
        @input="paginate(currentPage)"
      />
    </b-container>
  </div>
</template>

<script>
import Card from "@/components/Card";
import { mapGetters } from "vuex";

export default {
  name: "home",
  components: { Card },
  computed: {
    ...mapGetters(["websites", "displayWebsites", "rows"])
  },
  mounted() {
    // Lettere å teste metoder ved å kalle dem slik.
    this.fetchData();
  },
  data() {
    return {
      // websites: [],
      // rows: 1,
      currentPage: 1,
      perPage: 3
    };
  },
  methods: {
    async fetchData() {
      await this.$store.dispatch("fetchWebsites");
      console.log("test", this.$store.getters.websites);
    },
    paginate(currentPage) {
      this.$store.dispatch("paginate", { currentPage, perPage: this.perPage });
    }
  }
};
</script>
