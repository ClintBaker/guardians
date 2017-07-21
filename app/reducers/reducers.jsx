export var animalReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_ANIMAL':
      return action.animal;
    default:
      return state;
  };
};
