<script setup>
import { ref, watch, onMounted } from 'vue';
import TeamFlag from "./TeamFlag.vue";
import { getDatasourceContext, getEventBusContext } from '../context';

const props = defineProps(['selectedTeam']);

const datasource = getDatasourceContext();
const listener = getEventBusContext();

const teams = ref([]);

const fetchTeams = () => {
  if (datasource) {
    datasource.getTeams().then(t => {
      teams.value = [...t].sort((a, b) => a.name.localeCompare(b.name));
    });
  }
};

onMounted(fetchTeams);

watch(() => datasource, fetchTeams);

const onTeamClick = (team) => {
  if (listener) {
    listener.teamTap(team);
    listener.matchTap(null);
  }
};
</script>

<template>
  <div class="vjs-fwc-teams-list">
    <div
        v-for="team in teams"
        :key="team.name"
        class="vjs-fwc-teams-list-item"
        :class="{ 'vjs-fwc-teams-list-item-selected': selectedTeam && selectedTeam.name === team.name }"
        @click="onTeamClick(team)"
        role="button"
        tabindex="0"
    >
      <div class="vjs-fwc-teams-list-item-flag">
        <TeamFlag :team="team" />
      </div>
      <div class="vjs-fwc-teams-list-item-details">
        <div class="vjs-fwc-teams-list-item-name">{{ team.name }}</div>
        <div class="vjs-fwc-teams-list-item-info">
          <span>{{ team.continent }}</span>
          <span class="vjs-fwc-teams-list-item-separator">|</span>
          <span>{{ team.confed }}</span>
          <span class="vjs-fwc-teams-list-item-separator">|</span>
          <span>Group {{ team.group }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
