<template>
  <div class="card">
    <b-col>
      <b-card
        :title="title"
        :img-src="imgsrc"
        :alt="alt"
        img-top
        :tag="tag"
        :style="styles"
        :class="classe"
        :header="headers"
      >
        <b-card-text>{{ cardtext }}</b-card-text>
        <b-button
          v-b-modal="modalId"
          variant="primary"
          v-b-tooltip.hover
          title="Read more here"
          >{{ buttontext }}</b-button
        >
        <b-modal :id="modalId" title="Read and get more information here">
          <p class="my-4">
            {{ pText }}
          </p>
        </b-modal>
      </b-card>
    </b-col>
  </div>
</template>

<script>
export default {
  name: "card",
  props: {
    id: Number,
    pText: String,
    title: String,
    imgsrc: String,
    alt: String,
    tag: String,
    styles: String,
    classe: String,
    cardtext: String,
    buttontext: String,
    headers: String
  },
  computed: {
    modalId() {
      return `modal-${this.id}`;
    }
  }
};
</script>

<style lang="scss" scoped></style>
