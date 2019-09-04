import { createModel } from '@rematch/core';
import axios from 'axios';

declare global {
  interface Window {
    _env_: any;
  }
}

export const roadmap = createModel({
  state: {
    roadmap: {}
  },
  reducers: {
    setRoadmap(state: any, payload: any) {
      return { ...state, roadmap: payload };
    }
  },
  effects: {
    async initView(payload, rootState) {
      // Fetch data
      const setRoadmap = this.setRoadmap;

      if (Object.values(rootState.roadmap.roadmap).length === 0) {
        const host =
          window._env_.API_URL !== undefined
            ? window._env_.API_URL
            : 'http://127.0.0.1:3001';
        axios({
          method: 'get',
          url: host + '/roadmap'
        })
          .then(response => {
            setRoadmap(response.data);
          })
          .catch(error => {
            setRoadmap({});
          });
      }
    }
  }
});