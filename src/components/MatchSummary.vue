<script setup>
import { ref } from 'vue';
import TeamFlag from "./TeamFlag.vue";
import { getDatasourceContext, getEventBusContext } from '../context';

const props = defineProps(['data']);

const listener = getEventBusContext();
const datasource = getDatasourceContext();

const team1 = ref(null);
const team2 = ref(null);

if (props.data) {
  datasource.getTeam(props.data.team1).then(t => team1.value = t);
  datasource.getTeam(props.data.team2).then(t => team2.value = t);
}

function finalScore(idx) {
  return props.data.score.et ? props.data.score.et[idx] : props.data.score.ft[idx];
}
</script>

<template>
  <div v-if="data" class="vjs-fwc-match-summary">
    <!-- Team 1 Row -->
    <div class="vjs-fwc-match-team-row" @click="listener?.teamTap(team1)" role="button" tabindex="0">
      <div class="vjs-fwc-group-team"><TeamFlag :team="team1"/></div>
      <span class="vjs-fwc-match-team-name">{{ team1?.name || '' }}</span>
      <span class="vjs-fwc-match-team-score">
        {{ finalScore(0) }}
        <template v-if="data.score.p && data.score.p[0] !== undefined && data.score.p[0] !== null">
          ({{ data.score.p[0] }})
        </template>
      </span>
    </div>

    <!-- Team 2 Row -->
    <div class="vjs-fwc-match-team-row" @click="listener?.teamTap(team2)" role="button" tabindex="0">
      <div class="vjs-fwc-group-team"><TeamFlag :team="team2"/></div>
      <span class="vjs-fwc-match-team-name">{{ team2?.name || '' }}</span>
      <span class="vjs-fwc-match-team-score">
        {{ finalScore(1) }}
        <template v-if="data.score.p && data.score.p[1] !== undefined && data.score.p[1] !== null">
          ({{ data.score.p[1] }})
        </template>
      </span>
    </div>
  </div>
</template>
