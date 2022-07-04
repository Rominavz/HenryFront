import {
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  CLEAR_USER_DETAIL,
  FILTER_USERS_BY_GENDER,
  GET_USER_BY_NICKNAME,
  UPDATE_MATCH,
  FILTERS_BY_ME,
  UPDATE_IMG,
  FILTER_USERS_BY_MATCHES,
  /*  GET_USER_BY_GENDER,
  GET_USER_BY_GENDERINT, */
} from "../actions/types.js";

const initialState = {
  users: [], //NO MODIFICAR
  usersBackup: [], //ESTE LO USO PARA EMPEZAR FILTERS & SORTERS
  usersSelected: [], //ESTE LO USO PARA ALMACENAR EL RESULTADO DE FILTERS & SORTERS
  userDetail: [], //USADO TAMBIEN PARA CLEAR_USER_DETAIL
  userMatches:[],
  // OPCIONALES?
  // message: [], //POR EJ:AQUI  GUARDE LA RESPUESTA DEL SERVIDOR DESPUES DEL POST Y EL PUT
  gender: [],
  genderInt: [],
  
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS: {
      return {
        ...state,
        users: action.payload,
        usersBackup: action.payload,
      };
    }
    case GET_USER_BY_NICKNAME: {
      return { ...state, userDetail: action.payload };
    }

    case CREATE_USER: {
      return { ...state, userDetail: action.payload };
    }

    //   return { ...state, message: action.payload, userDetail: action.payload };
    // } //MESSAGE PODRIA TRAER INFO PARA UN COMPONENTE MODAL DE NOTIFICACION

    case UPDATE_USER: {
      return {
        ...state,
        message: action.payload,
      };
    }
    case UPDATE_IMG: {
      return {
        ...state,
        message: action.payload,
      };
    }
    case UPDATE_MATCH: {
      return { 
        ...state, message: action.payload };
    }

    case FILTERS_BY_ME: {
      
      const allMyUsers = state.usersBackup;
      const myID = state.userDetail?._id;
      const myGenderInt = state.userDetail?.genderInt

      //FILTROS ANIDADOS
      
      const filterByGender =
       myGenderInt === "male"
          ? allMyUsers.filter((e) => e.gender === "male")
          : myGenderInt === "female"
          ? allMyUsers.filter((e) => e.gender === "female")
          : allMyUsers;

      const filterAddLikeReceived = filterByGender.filter(
        (e) => !e.likeReceived.includes(myID)
      )
      const filterAddDisLikeReceived = filterAddLikeReceived.filter(
        (e) => !e.dislikeReceived.includes(myID)
      )
      const hiddenUser = filterAddDisLikeReceived.filter((e) => e._id !== myID)
      const FinalFiltered = new Set(hiddenUser)
      
      const finalArrayFiltered = [...FinalFiltered]
   
      console.log("finalArrayFilt ",finalArrayFiltered);

      return { 
        ...state, 
        usersSelected: finalArrayFiltered };
    }

    case CLEAR_USER_DETAIL: {
      return { 
        ...state, 
        userDetail: []
       };
    }

   /*  case FILTER_USERS_BY_GENDER: {
      const allusersGender = state.usersBackup;
      const usersFilterByGender =
        action.payload === "male"
          ? allusersGender.filter((e) => e.gender === "male")
          : action.payload === "female"
          ? allusersGender.filter((e) => e.gender === "female")
          : allusersGender;
      return { ...state, usersSelected: usersFilterByGender };
    } */

    case FILTER_USERS_BY_MATCHES:{
      const allUsersMatches = state.usersBackup;
      const allMatches = allUsersMatches.filter(e => e.matches.includes(action.payload))
      return{
        ...state,
        userMatches: allMatches
      }
    }

    default:
      return state;
  }
}

