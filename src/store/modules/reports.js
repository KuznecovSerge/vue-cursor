export default {
    namespaced: true,
    state: {
        reportedId: -1
    },

    getters: {
        getReportedId: state => state.reportedId
    },

    mutations: {
        SET_REPORTED_ID: (state, id) => {
            state.reportedId = id;
        }
    },

    actions: {
        setReportedId: (context, id) => {
            context.commit('SET_REPORTED_ID', id);
        }
    }
};
