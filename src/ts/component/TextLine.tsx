import * as React from 'react';
import {MouseEvent} from 'react';
import {connect} from 'react-redux';
import {EditorActions} from '../actions';
import {EditorState, FocusTarget} from '../reducers';

class Component extends React.Component<any, any> {
    private readonly ref: React.RefObject<HTMLSpanElement>;

    constructor(props: any, context: any) {
        super(props, context);

        this.ref = React.createRef();
    }

    public componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        const span = this.ref.current;
        if (span) {
            this.props.setTextWidth(span.offsetWidth);
        }
    }

    public onClick(e: MouseEvent<HTMLDivElement>) {
        this.props.focus({
            index: this.props.index,
            target: e.currentTarget,
        });
    }

    public render() {

        return <div className='line' onClick={this.onClick.bind(this)}><span
            ref={this.ref}>{this.props.text}</span></div>;
    }
}

function mapStateToProps(state: EditorState) {
    return Object.assign({}, state);
}

function mapDispatchToProps(dispatch: any) {
    return {
        setTextWidth: (v: number) => dispatch(EditorActions.changeTextWidth(v)),
        focus: (v: FocusTarget | null) => dispatch(EditorActions.lineFocus(v)),
    };
}

export const TextLine = connect(mapStateToProps, mapDispatchToProps)(Component);