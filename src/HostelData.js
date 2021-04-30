import React, { useEffect, useReducer } from "react";
import firebaseApp from "./firebaseApp";

const initialState = { loading: true, error: "", data: {} };

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { loading: false, error: "", data: action.payload };
    case "FETCH_ERROR":
      return { loading: false, error: action.payload, data: {} };
    default:
      return state;
  }
};

export const HostelDataContext = React.createContext();

export const HostelDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const db = firebaseApp.firestore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let rooms = await db.collection("rooms").get();
        rooms = rooms.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        let beds = await db.collection("beds").get();
        beds = beds.docs.map((doc) => {
          return { ...doc, id: doc.id };
        });
        dispatch({ type: "FETCH_SUCCESS", payload: { rooms, beds } });
      } catch (error) {
        dispatch({ type: "FETCH_ERROR", payload: error });
      }
    };
    fetchData();
  }, []);

  return (
    <HostelDataContext.Provider value={state}>
      {children}
    </HostelDataContext.Provider>
  );
};
