<script setup>
import { ref, provide } from "vue";
import { WorldCupDatasource } from "@visuallyjs/open-football-worldcup-datasource";

import { setDatasourceContext, setEventBUsContext } from './context';

import HeaderComponent from "./components/HeaderComponent.vue";
import GroupStage from "./components/GroupStage.vue";
import Tournament from "./components/Tournament.vue";
import TeamsList from "./components/TeamsList.vue";
import TeamJourney from "./components/TeamJourney.vue";
import TeamViewer from "./components/TeamViewer.vue";
import SquadViewer from "./components/SquadViewer.vue";
import MatchViewer from "./components/MatchViewer.vue";
import SelectSomething from "./components/SelectSomething.vue";

import "./fifaworldcup.css";
import "./app.css";

const year = ref(2026);
const ds = new WorldCupDatasource({ year: year.value });
setDatasourceContext(ds);

const selectedTeam = ref(null);
const selectedSquad = ref(null);
const selectedMatch = ref(null);
const currentView = ref('tournament');

const listener = {
  teamTap: (team) => {
    selectedTeam.value = team;
    if (team) {
      ds.getSquad(team.name).then(s => {
        selectedSquad.value = s;
      });
    } else {
      selectedSquad.value = null;
    }
  },
  matchTap: (match) => {
    selectedMatch.value = match;
    console.log("tap match ", match);
  }
};

setEventBUsContext(listener);

function handleViewChange(view) {
  selectedSquad.value = null;
  selectedTeam.value = null;
  selectedMatch.value = null;
  currentView.value = view;
}
</script>

<template>
  <div class="vjs-fwc-app-container">
    <HeaderComponent :year="year" :onViewChange="handleViewChange" />
    <div class="vjs-fwc-main">
      <div class="vjs-fwc-main-body">
        <template v-if="currentView === 'group-stage'">
          <GroupStage :year="year" :showStatsTable="false" />
        </template>
        <template v-else-if="currentView === 'tournament'">
          <Tournament />
        </template>
        <template v-else-if="currentView === 'teams'">
          <div style="display: flex; height: 100%;">
            <div style="flex: 1 0 50%; height: 100%; border: 1px solid; border-radius: 5px; overflow: auto;">
              <TeamsList :selectedTeam="selectedTeam" />
            </div>
            <div style="flex: 1 0 50%; height: 100%; border: 1px solid; border-radius: 5px; overflow: auto; margin: 0 0.5rem;">
              <TeamJourney :team="selectedTeam" title="Journey" />
              <SelectSomething v-if="!selectedTeam" msg="Select a team to view details" />
            </div>
          </div>
        </template>
      </div>
      <div class="vjs-fwc-main-sidebar">
        <template v-if="currentView === 'group-stage'">
          <TeamViewer :team="selectedTeam" />
          <SquadViewer :squad="selectedSquad" />
          <SelectSomething v-if="!selectedTeam && !selectedSquad" msg="Select a team to view details" />
        </template>
        <template v-else-if="currentView === 'teams'">
          <MatchViewer v-if="selectedMatch" :match="selectedMatch" />
          <hr v-if="selectedMatch" />
          <TeamViewer :team="selectedTeam" />
          <SquadViewer :squad="selectedSquad" />
          <SelectSomething v-if="!selectedTeam && !selectedSquad" msg="Select a team to view details" />
        </template>
        <template v-else-if="currentView === 'tournament'">
          <MatchViewer :match="selectedMatch" />
        </template>
      </div>
    </div>
  </div>
</template>

