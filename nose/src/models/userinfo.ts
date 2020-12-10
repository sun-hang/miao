import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
export interface UserInfoModelState {
    userinfo: object | null;
}

export interface IndexModelType {
    namespace: 'userinfo';
    state: UserInfoModelState;
    effects: {
        query: Effect;
    };
    reducers: {
        save: Reducer<UserInfoModelState>;
        // 启用 immer 之后
        // save: ImmerReducer<IndexModelState>;
    };
    subscriptions: { setup: Subscription };
}

const IndexModel: IndexModelType = {
    namespace: 'userinfo',
    state: {
        userinfo: {loginUser:'航航爱苗苗'},
    },
    effects: {
        *query({ payload }, { call, put }) {
        },
    },
    reducers: {
        save(state, action) {
            return {
                ...state,
                ...action.payload,
            };
        },
        // 启用 immer 之后
        // save(state, action) {
        //   state.name = action.payload;
        // },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                if (pathname === '/') {
                    dispatch({
                        type: 'query',
                    })
                }
            });
        }
    }
};

export default IndexModel;