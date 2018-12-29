import React, { Component } from 'react';
import itemActions from "../../../services/itemActions";

class SelectedItem extends Component {
    componentWillMount() {
        const id = (this.props && this.props.location && this.props.location.state && this.props.location.state.id) || '';
        if(id) {
            itemActions.increaseClickPoint(id)
        }
    }

    render() {
        return(
            <div>
                Selected Item
            </div>
        )
    }
}

export default SelectedItem