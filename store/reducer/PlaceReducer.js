import { ADD_PLACE, SET_PLACE } from '../actions/PlaceAction';
import Place from '../../models/placeModel';

const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = new Place(
        action.data.id.toString(),
        action.data.title,
        action.data.imageUri,
        action.data.address,
        action.data.coords.latitude,
        action.data.coords.longitude
      );
      //console.log('action', action.data);
      console.log('=== ADD_PLACE ===', newPlace);
      return {
        places: state.places.concat(newPlace),
      };

    case SET_PLACE:
      return {
        places: action.places.map((pl) => {
          console.log('pl4', pl);
          return new Place(
            pl.id.toString(),
            pl.title,
            pl.imageUri,
            pl.address,
            pl.latitude ? pl.latitude : pl.lat,
            pl.longitude ? pl.longitude : pl.lng
          );
        }),
      };

    default:
      return state;
  }
};
