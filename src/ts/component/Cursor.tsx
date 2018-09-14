import * as React from 'react';
import {connect} from 'react-redux';
import {EditorState} from '../reducers';

class Component extends React.Component<any, any> {
    private cursor: React.RefObject<HTMLDivElement>;

    constructor(props: any, context: any) {
        super(props, context);

        this.cursor = React.createRef();
    }

    public componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if (this.props.focusLine === null) {
            return;
        }

        const target = document.querySelectorAll('.line').item(this.props.focusLine.index) as HTMLDivElement;
        const innerSpan = target.querySelector('span') as HTMLSpanElement;
        const targetRect = target.getBoundingClientRect() as DOMRect;
        const spanRect = innerSpan.getBoundingClientRect() as DOMRect;
        const fontSize = parseInt((target.style.fontSize || '16px'), 10);
        const offset = (spanRect.y - targetRect.y);
        const cursorTop = offset === 0 ? fontSize / 4 : offset;

        if (this.cursor.current) {
            this.cursor.current.style.top = `${cursorTop}px`;
        }
    }

    public render() {
        return <div ref={this.cursor} className='cursor'/>;
    }
}

function mapStateToProps(state: EditorState) {
    return Object.assign({}, state);
}

export const Cursor = connect(mapStateToProps)(Component);