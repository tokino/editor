import {reducerWithInitialState} from 'typescript-fsa-reducers';
import {EditorActions} from './actions';

export interface FocusTarget {
    index: number;
}

export interface EditorState {
    textWidth: number;
    focusLine: FocusTarget|null;
}

const initialState: EditorState = {
    textWidth: 1,
    focusLine: null,
};

export const EditorReducer = reducerWithInitialState(initialState)
    .case(EditorActions.changeTextWidth, (state: EditorState, textWidth: any) => {
        return Object.assign({}, state, {textWidth});
    })
    .case(EditorActions.lineFocus, (state: EditorState, focusLine: FocusTarget|null) => {
        return Object.assign({}, state, {focusLine});
    });