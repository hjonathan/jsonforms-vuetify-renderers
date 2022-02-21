<template>
  <v-card
    class="d-flex align-center justify-center pa-4 mx-auto"
    max-width="550"
    min-height="76"
    height="auto"
    outlined
  >
    <div :class="`text-caption`">
      <span>
        Drag and drop an element from the Palette to begin.
      </span>
      <draggable
        class="dragAreaItem list-group"
        :list="list1"
        group="people"
        @change="handleChange"
      >
      
      <div class="list-group-item" v-for="element in list1" :key="element.type">
        {{ element.type }}
      </div>
      </draggable>
    </div>
  </v-card>
</template>

<script lang="ts">
import draggable from 'vuedraggable';
import { EditorUISchemaElement } from '../../../model/uischema';
import { createControl } from '../../../util/generators/uiSchema';
export default {
  name: 'EmptyEditor',
  components: {
    draggable,
  },
  data() {
    return {
      list1: [],
    };
  },
  methods: {
    handleChange(e: any) {
      if (e.added) {
        if (e.added.element.element && e.added.element.element.uuid) {
          const provider: EditorUISchemaElement = createControl(
            e.added.element.element, e.added.element.uiSchemaType
          );
           this.$store.dispatch('app/setUiSchema', { uiSchema: provider });
        } else {
          const provider:EditorUISchemaElement  = e.added.element.uiSchemaElementProvider();
          this.$store.dispatch('app/setUiSchema', { uiSchema: provider });
        }
      }
    },
  },
};
</script>
<style>
  .dragArea,
  .dragAreaItem {
    width: 100%;
    min-height: 50px;
  }
</style>
