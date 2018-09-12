import * as React from 'react';
import TextLine from './TextLine';

export interface AppProps {
}

export interface AppState {
	text: string
}

export class TextArea extends React.Component<AppProps, AppState> {
	private readonly ref: React.RefObject<HTMLTextAreaElement>;

	constructor(props: AppProps) {
		super(props);
		this.state = {
			text: ''
		};

		this.ref =  React.createRef();
	  }

	componentDidMount() {
		const current = this.ref.current;
		console.log(current);
		if (current) {
		  current.focus()
		}
	}

	  render() {
		const textAreaStyle = {
			width: '1px',
			height: '1px',
			opacity: 0
		}
		return <div className='text-are'>
		<textarea ref={this.ref} style={textAreaStyle} name="text-area" id="text-aria" ></textarea>
		<TextLine />
			</div>;
	}
}