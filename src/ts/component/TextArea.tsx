import * as React from 'react';
import {ChangeEvent, KeyboardEvent} from 'react';
import {connect} from 'react-redux';
import {EditorActions} from '../actions';
import {EditorState, FocusTarget} from '../reducers';
import {Cursor} from './Cursor';
import {TextLine} from './TextLine';

export interface AppState {
    text: string;
    texts: string[];
    width: number;
}

class Component extends React.Component<any, AppState> {
    private readonly ref: React.RefObject<HTMLTextAreaElement>;
    private readonly editor: React.RefObject<HTMLDivElement>;

    constructor(props: any) {
        super(props);
        this.state = {
            text: '',
            texts: [],
            width: props.textWidth || 0,
        };

        this.ref = React.createRef();
        this.editor = React.createRef();
    }

    public componentDidMount() {
        const current = this.ref.current;
        if (current) {
            current.focus();
        }
    }

    public componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<AppState>, snapshot?: any): void {
        if (this.state.width !== this.props.textWidth) {
            this.setState({
                width: this.props.textWidth || 0,
            });
        }

        const current = this.ref.current;
        if (!current) {
            return;
        }

        if (this.props.focusLine === null) {
            current.blur();
            return;
        }

        if (document.activeElement.tagName !== 'TEXTAREA') {
            if (this.state.texts.length === 0) {
                const texts = this.state.texts;
                texts.push('');
                this.setState({
                    texts,
                });
            }
            current.focus();
        }
    }

    private onChange(e: ChangeEvent<HTMLTextAreaElement>): void {
        const texts = this.state.texts;
        texts[this.props.focusLine.index] = e.currentTarget.value.replace(/\n|\r\n|\r/g, '');
        this.setState({
            texts,
        });
    }

    private onKeyPress(e: KeyboardEvent<HTMLTextAreaElement>) {
        if (this.state.texts[this.props.focusLine.index]) {
            this.ref.current!.value = this.state.texts[this.props.focusLine.index];
        }

        if (e.key === 'Enter') {
            const texts = this.state.texts;
            texts.push('');
            this.setState({
                texts,
            });
            this.ref.current!.value = '';
            this.props.focus({
                index: ++this.props.focusLine.index,
            });
        }
    }

    private onBlur(e: ChangeEvent<HTMLTextAreaElement>) {
        this.props.focus(null);
        e.currentTarget.value = '';
    }

    private onFocus() {
        if (this.state.texts.length === 0) {
            const texts = this.state.texts;
            texts.push('');
            this.setState({
                texts,
            });
        }
    }

    public render() {
        const textAreaStyle = {
            width: `${this.state.width}px`,
        };
        return <div ref={this.editor} className='text-area'
                    onFocus={this.onFocus.bind(this)}>
            <textarea style={textAreaStyle} ref={this.ref} name='text-area' id='text-aria'
                      onChange={this.onChange.bind(this)} onBlur={this.onBlur.bind(this)}
                      onKeyPress={this.onKeyPress.bind(this)}/>
            {this.state.texts.map((text: string, index: number) => {
                return <TextLine key={index} index={index} text={text}/>;
            })}
            <Cursor/>
        </div>;
    }
}

function mapStateToProps(state: EditorState) {
    return Object.assign({}, state);
}

function mapDispatchToProps(dispatch: any) {
    return {
        focus: (v: FocusTarget | null) => dispatch(EditorActions.lineFocus(v)),
    };
}

export const TextArea = connect(mapStateToProps, mapDispatchToProps)(Component);