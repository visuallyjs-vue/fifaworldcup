<script setup>


defineProps({
  obj: Object,
  model:Object
})

</script>

<template>
  <div class="vjs-hello">
    {{ obj.data.label }}
    <div data-vjs-source="true" class="vjs-hello-connect" title="Drag edge to a World node"></div>
  </div>
</template>

