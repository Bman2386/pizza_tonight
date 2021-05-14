import React from 'react';

class Splash extends React.Component {

    constructor(props) {
        super(props)

    }

    componentDidMount(){
        debugger
        this.props.fetchReviews();
    }

    render(){
        return (
            <div>
                <h1>
                    Pizza Tonight
                </h1>
                <p>
                    Here you can input 2 categories to find a reccomendation
                </p>
            </div>
        )
            
    }
}

export default Splash