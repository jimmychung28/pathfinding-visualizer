import React, {Component} from 'react';
import { NodeProps } from '../../types';

import './Node.css';

export default class Node extends Component<NodeProps> {
  render() {
    const {
      col,
      isFinish,
      isStart,
      isWall,
      terrain,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      row,
    } = this.props;
    
    const extraClassName = isFinish
      ? 'node-finish'
      : isStart
      ? 'node-start'
      : isWall
      ? 'node-wall'
      : `node-${terrain}`;

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}></div>
    );
  }
}
