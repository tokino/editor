import actionCreatorFactory from 'typescript-fsa';
import {FocusTarget} from './reducers';

const CHANGE_TEXT_WIDTH = 'CHANGE_TEXT_WIDTH';
const LINE_FOCUS = 'LINE_FOCUS';

const actionCreator = actionCreatorFactory();

export const EditorActions = {
    changeTextWidth: actionCreator<number>(CHANGE_TEXT_WIDTH),
    lineFocus: actionCreator<FocusTarget|null>(LINE_FOCUS),
};