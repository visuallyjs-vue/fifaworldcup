<script setup>
import { computed } from 'vue';

const props = defineProps(['match']);

function parseMinute(m) {
  if (typeof m === 'number') return m;
  const matched = String(m).match(/^(\d+)/);
  return matched ? parseInt(matched[1]) : 0;
}

function parseExtra(m) {
  const matched = String(m).match(/\+(\d+)/);
  return matched ? parseInt(matched[1]) : 0;
}

const allGoals = computed(() => {
  if (!props.match) return [];
  return [
    ...(props.match.goals1 || []).map(g => ({ ...g, team: 1 })),
    ...(props.match.goals2 || []).map(g => ({ ...g, team: 2 }))
  ].sort((a, b) => {
    const minA = parseMinute(a.minute);
    const minB = parseMinute(b.minute);
    if (minA !== minB) return minA - minB;
    return parseExtra(a.minute) - parseExtra(b.minute);
  });
});

const ft = computed(() => props.match?.score?.ft || [0, 0]);
const et = computed(() => props.match?.score?.et);
const scoreText = computed(() => {
  if (et.value) return `${et.value[0]} - ${et.value[1]}`;
  return `${ft.value[0]} - ${ft.value[1]}`;
});
</script>

<template>
  <div v-if="!match" class="vjs-fwc-empty-state">
    <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="vjs-fwc-empty-icon"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
    <div class="vjs-fwc-empty-text">Select a match to view details</div>
  </div>
  <div v-else class="vjs-fwc-match-viewer">
    <div class="vjs-fwc-match-viewer-header">
      <div class="vjs-fwc-match-viewer-round">{{ match.round }} {{ match.group ? `(${match.group})` : '' }}</div>
      <div class="vjs-fwc-match-viewer-meta">Match {{ match.num }}</div>
    </div>

    <div class="vjs-fwc-match-viewer-teams">
      <div class="vjs-fwc-match-viewer-team">
        <div class="vjs-fwc-match-viewer-team-name">{{ match.team1 }}</div>
      </div>
      <div class="vjs-fwc-match-viewer-score-container">
        <div class="vjs-fwc-match-viewer-score">
          <div class="vjs-fwc-match-viewer-score-main">{{ scoreText }}</div>
        </div>
      </div>
      <div class="vjs-fwc-match-viewer-team">
        <div class="vjs-fwc-match-viewer-team-name">{{ match.team2 }}</div>
      </div>
    </div>

    <template v-if="match.score.p">
      <div class="vjs-fwc-match-viewer-score-penalties-extra">
        ({{ match.score.p[0] }} - {{ match.score.p[1] }} pen)
      </div>
    </template>
    <template v-else-if="match.score.et">
      <div class="vjs-fwc-match-viewer-extra-time">Extra time</div>
    </template>

    <div class="vjs-fwc-match-viewer-info">
      <div class="vjs-fwc-match-viewer-info-item">
        <span class="vjs-fwc-match-viewer-label">Date:</span> {{ match.date }}
      </div>
      <div class="vjs-fwc-match-viewer-info-item">
        <span class="vjs-fwc-match-viewer-label">Time:</span> {{ match.time }}
      </div>
      <div class="vjs-fwc-match-viewer-info-item">
        <span class="vjs-fwc-match-viewer-label">Stadium:</span> {{ match.ground }}
      </div>
    </div>

    <div class="vjs-fwc-match-viewer-goals">
      <div class="vjs-fwc-match-viewer-section-title">Goals</div>
      <div v-if="allGoals.length > 0" class="vjs-fwc-match-viewer-goals-list">
        <div v-for="(goal, index) in allGoals" :key="index" class="vjs-fwc-match-viewer-goal-item" :class="'team-' + goal.team">
          <span class="vjs-fwc-match-viewer-goal-minute">{{ goal.minute }}'</span>
          <span class="vjs-fwc-match-viewer-goal-name">{{ goal.name }}</span>
          <span v-if="goal.penalty" class="vjs-fwc-match-viewer-goal-type">(P)</span>
          <span v-if="goal.owngoal" class="vjs-fwc-match-viewer-goal-type">(OG)</span>
        </div>
      </div>
      <div v-else class="vjs-fwc-match-viewer-no-goals">No goals recorded</div>
    </div>
  </div>
</template>
