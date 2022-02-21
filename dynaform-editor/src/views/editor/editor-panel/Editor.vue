<template>
  <div>
    <json-forms
      v-if="uischema"
      :renderers="renderers"
      :data="data"
      :uischema="uischema"
      :schema="schema"
      height="500"
    />
    <EmptyEditor v-else />
  </div>
</template>

<script lang="ts">
import { JsonForms, JsonFormsChangeEvent } from '@jsonforms/vue2';
import { PropType } from 'vue';
import { JsonFormsRendererRegistryEntry } from '@jsonforms/core';
import EmptyEditor from './EmptyEditor.vue';
import { sync } from 'vuex-pathify';

import { defineComponent, ref } from '../../../util/vue';
import { editorRendererProps } from '../../../util/composition';

const Editor = defineComponent({
  name: 'Editor',
  props: {
     ...editorRendererProps(),
  },
  components: {
    JsonForms,
    EmptyEditor,
  },
  data() {
    return {
      data: {},
    };
  },
});
export default Editor;
</script>
