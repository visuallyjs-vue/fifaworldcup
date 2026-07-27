import { provide, inject } from 'vue';

const DS_KEY = Symbol('worldCupDatasource');

export function setDatasourceContext(datasource) {
    provide(DS_KEY, datasource);
}

export function getDatasourceContext() {
    return inject(DS_KEY);
}

const EVENT_BUS_KEY = Symbol('worldCupDatasourceEventBus');

export function setEventBUsContext(bus) {
    provide(EVENT_BUS_KEY, bus);
}

export function getEventBusContext() {
    return inject(EVENT_BUS_KEY);
}

const GROUP_CONTEXT_KEY = Symbol('worldCupDatasourceCurrentGroup');

export function setGroupContext(bus) {
    provide(GROUP_CONTEXT_KEY, bus);
}

export function getGroupContext() {
    return inject(GROUP_CONTEXT_KEY);
}
