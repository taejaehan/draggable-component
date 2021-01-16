import React from 'react';

interface Props {
    
}

interface State {
  diffX: number
  diffY: number
  dragging: Boolean
  styles: {}
  move_limit : [[number, number],[number, number]]
  box_size : [number, number]
}

class Box extends React.Component<Props, State>{

    private boxRef: React.RefObject<HTMLDivElement>; 

    constructor(props : Props) {
        super(props);

        this.state = {
            diffX: 0,
            diffY: 0,
            dragging: false,
            styles: {},
            box_size : [0, 0],
            move_limit : [ [0, window.innerWidth], [0, window.innerHeight] ]
        }
        this._dragStart = this._dragStart.bind(this);
        this._dragging = this._dragging.bind(this);
        this._dragEnd = this._dragEnd.bind(this);

        this.boxRef = React.createRef();
    }

    componentDidMount(){
        window.addEventListener('resize', this._updateSize.bind(this));
        if (this.boxRef && this.boxRef.current) {
            this.setState({
                box_size : [ this.boxRef.current.clientWidth, this.boxRef.current.clientHeight ],
                styles: {
                    left: (window.innerWidth - this.boxRef.current.clientWidth)  / 2,
                    top: (window.innerHeight - this.boxRef.current.clientHeight)  / 2,
                }
            });
        }
        
    }
    _dragStart(e : React.MouseEvent) {
        this.setState({
            diffX: e.screenX - e.currentTarget.getBoundingClientRect().left,
            diffY: e.screenY - e.currentTarget.getBoundingClientRect().top,
            dragging: true
        });
    }

    _dragging(e : React.MouseEvent) {

        if(this.state.dragging) {
            var left = e.screenX - this.state.diffX;
            var top = e.screenY - this.state.diffY;

            left = left < this.state.move_limit[0][0] ? 0 : left
            left = left+this.state.box_size[0] > this.state.move_limit[0][1] ? this.state.move_limit[0][1] - this.state.box_size[0] : left

            top = top < this.state.move_limit[1][0] ? 0 : top
            top = top+this.state.box_size[1] > this.state.move_limit[1][1] ? this.state.move_limit[1][1] - this.state.box_size[1] : top

            this.setState({
                styles: {
                left: left,
                top: top
                }
            });
        }
    }    

    _dragEnd() {
        this.setState({
            dragging: false
        });
    }
    
    _updateSize(){
        this.setState({
            move_limit: [[0, window.innerWidth], [0, window.innerHeight]]
        });
    }


    render() {
        return (
            <div ref={this.boxRef} className="box" style={this.state.styles} 
                onMouseDown={this._dragStart} 
                onMouseMove={this._dragging} 
                onMouseUp={this._dragEnd}
                onMouseLeave={this._dragEnd}
            >
            </div>
        );
    }
}

export default Box;

