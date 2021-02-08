import react, {Component} from 'react';

export default class randomizer extends Component {
    render() {
        if (this.props.user) {
            return <div>Hello {this.props.user.email}</div>
        }
        return (
            <div>Hello world!!</div>
        )
    }
};
