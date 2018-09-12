import * as React from 'react';

export default class TextLine extends React.Component<any, any> {

  onKeyPress(e: React.KeyboardEvent<HTMLDivElement>) {
	  console.log(e.charCode)
  }

  public render() {
	  const divStyle = {
		  height: '16px'
	  };

	return <div style={divStyle} onKeyPress={this.onKeyPress} tabIndex={-1}></div>;
  }
}
