<template>
  <!-- <v-main> -->
  <v-container fill-height fluid>
    <v-tabs>
      <v-tabs-slider></v-tabs-slider>
      <v-tab class="primary--text">Palete </v-tab>

      <v-tab class="primary--text"> JSON Schema </v-tab>
      <v-tab class="primary--text"> UI Schema </v-tab>

      <v-tab-item>
        <draggable
          class="list-group"
          :list="paletteElements"
          :group="{ name: 'people', pull: 'clone', put: false }"
          :sort="false"
        >
          <div
            v-for="element in paletteElements"
            :key="element.type"
            class="item"
          >
            <v-icon v-text="element.icon"></v-icon>

            <span v-text="element.label"></span>
          </div>
        </draggable>
        <h4>Controls</h4>
        <draggable
          class="list-group"
          :list="getChildrenToRender(schema)"
          :group="{ name: 'people', pull: 'clone', put: false }"
          :sort="false"
        >
          <div
            v-for="item in getChildrenToRender(schema)"
            :key="item.element.uuid"
            class="item"
          >
            <span v-text="getLabel(item.element)"></span>
          </div>
        </draggable>
      </v-tab-item>
      <v-tab-item> </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script lang="ts">
import draggable from 'vuedraggable';
import { sync } from 'vuex-pathify';
import {
  getChildren,
  getLabel,
  getPath,
  isArrayElement,
  isObjectElement,
  SchemaElement,
} from '../../../model/schema';
export default {
  name: 'PalletePanel',
  components: {
    draggable,
  },
  props: {
    schema: {
      type: [Object, Boolean],
    },
  },
  data() {
    return {
      tabs: [],
      list1: [
        { name: 'John', id: 1 },
        { name: 'Joao', id: 2 },
        { name: 'Jean', id: 3 },
        { name: 'Gerard', id: 4 },
      ],
    };
  },
  created: function () {
    this.$store.dispatch('app/getPaletteElements');
  },
  computed: {
    paletteElements: sync('app/editor@paletteElements'),
    editorSchema: sync('app/editor@schema'),
  },
  methods: {
    getChildrenToRender: function (schemaElement: SchemaElement) {
      let items: any[] = [];
      if (schemaElement) {
        schemaElement.properties.forEach((element: boolean, key: string) => {
          let uiSchemaType = 'Control';
          if (key === 'suggest') {
            uiSchemaType = 'Suggest';
          }
           if (key === 'multiplefile') {
            element.options={};
            element.options.multipleFile=true;
          }

          items.push({
            uiSchemaType,
            element,
          });
        });
      }
      return items;
    },
    getLabel: function (schemaElement: SchemaElement) {
      return getLabel(schemaElement);
    },
  },
};
</script>
<style>
  .item span {
    cursor: grab;
  }
</style>
