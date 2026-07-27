<script setup>
import { ref, computed, onMounted } from 'vue';
import TeamFlag from "./TeamFlag.vue";
import { getDatasourceContext } from "../context.js";

const props = defineProps(['data']);
const showStatsTable = ref(false);

const datasource = getDatasourceContext();
const stats = ref(null);

onMounted(() => {
  if (datasource && props.data) {
    datasource.getGroupStats(`Group ${props.data.group}`).then(s => {
      stats.value = s.stats;
    });
  }
});

const rank = computed(() => (stats.value ? stats.value.rankings[props.data.name] : -1));
</script>

<template>
  <div class="vjs-fwc-group-team-node" :data-ranking="rank">
    <div class="vjs-fwc-group-team" :title="data.name"><TeamFlag :team="data"/></div>
    <div v-if="!showStatsTable" class="vjs-fwc-group-team-stats">
      <span style="white-space: nowrap;">{{ data.name }}</span>
      <table v-if="stats" style="color: #555555;">
        <thead>
          <tr>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>F</th>
            <th>A</th>
            <th>P</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ stats.wins[data.name] }}</td>
            <td>{{ stats.draws[data.name] }}</td>
            <td>{{ stats.losses[data.name] }}</td>
            <td>{{ stats.goalsFor[data.name] }}</td>
            <td>{{ stats.goalsAgainst[data.name] }}</td>
            <td>{{ stats.points[data.name] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <span v-else style="margin-left: 10px;">{{ data.name }}</span>
  </div>
</template>
