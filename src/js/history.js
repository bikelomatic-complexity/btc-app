// Make the history object we use with React Router globally available.
// This way, we don't have to pass `history` into deeply nested component
// trees.
import { hashHistory } from 'react-router';
export default hashHistory;
