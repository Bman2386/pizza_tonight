import { connect } from 'react-redux';
import Splash from './splash';
import {fetchReviews} from '../../actions/reviews_actions'
 
const mapStateToProps = state => {

    const reviews = state.reviews ? state.reviews : {}
    return {
        reviews
    }
};

const mapDispatchtoProps = dispatch => {
    return {
        fetchReviews: () => dispatch(fetchReviews)
    }
};

export default connect(mapStateToProps, mapDispatchtoProps)(Splash);