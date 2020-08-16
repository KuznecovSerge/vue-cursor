export default {
    namespaced: true,
    state: {
        notifies: []
    },

    getters: {
        notifies: state => state.notifies
    },

    mutations: {
        SOCKET_NOTIFY: (state, notifies) => {
            state.notifies = notifies;
        },

        SOCKET_NOTIFY_READ: (state, id) => {
            state.notifies = state.notifies.map(notify => {
                if (notify.id == id) {
                    notify.read = true;
                }

                return notify;
            })
        }
    },

    actions: {
        SOCKET_NOTIFY: (context, notifies) => {
            context.commit('SOCKET_NOTIFY', notifies);
        },

        SOCKET_NOTIFY_READ: (context, id) => {
            context.commit('SOCKET_NOTIFY_READ', id);
        }
    }
};
