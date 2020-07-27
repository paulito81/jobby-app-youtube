<template>
  <div>
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
        <b-button variant="primary">{{ buttontext }}</b-button>
      </b-card>
    </b-col>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    title: String,
    imgsrc: String,
    alt: String,
    tag: String,
    styles: String,
    classe: String,
    cardtext: String,
    buttontext: String,
    headers: String
  }
};
</script>

<style lang="scss" scoped></style>
