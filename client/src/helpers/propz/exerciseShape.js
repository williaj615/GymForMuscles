import PropTypes from 'prop-types';

const exerciseShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  muscleGroupId: PropTypes.number.isRequired
  
});

export default { exerciseShape };