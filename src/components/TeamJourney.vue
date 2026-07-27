<script setup>
import { ref, watch, markRaw } from 'vue';
import { PaperComponent } from "@visuallyjs/browser-ui-vue";
import { ColumnLayout, uuid } from "@visuallyjs/browser-ui";
import TeamJourneyMatch from "./TeamJourneyMatch.vue";

import { getDatasourceContext, getEventBusContext } from '../context';

const props = defineProps(['team', 'title']);

const datasource = getDatasourceContext();
const listener = getEventBusContext();

const data = ref(null);
const currentTeam = ref(null);

async function getTeamJourney() {
  if (!props.team) return;

  const groupName = `Group ${props.team.group}`;
  const groupStats = await datasource.getGroupStats(groupName);

  const teamGroupMatches = groupStats.matches
      .filter(m => m.team1 === props.team.name || m.team2 === props.team.name)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const journeyMatches = [...teamGroupMatches];

  async function findMatchInRound(roundName) {
    const matches = await datasource.getMatchesForRound(roundName);
    const match = matches.find(m => m.team1 === props.team.name || m.team2 === props.team.name);
    if (match) {
      journeyMatches.push(match);
    }
  }

  await findMatchInRound("Round of 32");
  await findMatchInRound("Round of 16");
  await findMatchInRound("Quarter-final");
  await findMatchInRound("Semi-final");
  await findMatchInRound("Final");
  await findMatchInRound("Match for third place");

  const nodes = journeyMatches.map(m => ({ ...m, id: uuid() }));
  const edges = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    edges.push({
      source: nodes[i].id,
      target: nodes[i + 1].id
    });
  }

  currentTeam.value = props.team;
  data.value = { nodes, edges };
}

watch(() => props.team, (newTeam) => {
  if (newTeam && datasource && newTeam !== currentTeam.value) {
    getTeamJourney();
  }
}, { immediate: true });

const viewOptions = {
  nodes: {
    default: {
      component: markRaw(TeamJourneyMatch),
      events: {
        tap: (p) => {
          p.model.setSelection(p.obj);
          listener.matchTap(p.obj.data);
        }
      }
    }
  }
};

const renderOptions = {
  scale: false,
  layout: {
    type: ColumnLayout.type,
    options: {
      padding: { x: 50, y: 20 }
    }
  },
  edges: {
    connector: "Straight",
    targetMarker: {
      type: "PlainArrow",
      options: { width: 10, length: 10 }
    }
  }
};
</script>

<template>
  <div v-if="data" class="vjs-fwc-team-journey">
    <h3 style="margin: 0.5rem auto; text-align: center;">{{ title || team?.name }}</h3>
    <PaperComponent
        :data="data"
        :modelOptions="{ groupProperty: 'vjsGroup' }"
        :renderOptions="renderOptions"
        :viewOptions="viewOptions"
    />
  </div>
</template>
