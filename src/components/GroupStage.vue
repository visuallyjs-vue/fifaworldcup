<script setup>
import { ref, onMounted } from 'vue';
import { getDatasourceContext } from '../context';
import GroupViewer from "./GroupViewer.vue";

defineProps(['showStatsTable']);
const datasource = getDatasourceContext();

const groups = ref([]);

onMounted(() => {
  datasource.getGroups().then(g => groups.value = g);
});
</script>

<template>
  <div class="vjs-fwc-groups">
    <GroupViewer v-for="group in groups" :key="group.name" :groupName="group.name" :showStatsTable="showStatsTable" />
  </div>
</template>
