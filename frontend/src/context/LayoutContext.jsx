import React, { createContext, useReducer } from "react";

// 1. État initial du layout (adapté pour votre projet)
export const layoutState = {
  navbarHamburger: false,
  loginSignupModal: false,
  loginSignupError: false,
  cartModal: false,
  cartProduct: null,
  singleProductDetail: null,
  inCart: null,
  cartTotalCost: null,
  orderSuccess: false,
  loading: false,
};

// 2. Le Reducer pour centraliser les modifications d'état
export const layoutReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_NAVBAR":
      // Ferme les modales quand on ouvre le menu, et inverse l'état du menu
      return { 
        ...state, 
        navbarHamburger: !state.navbarHamburger,
        loginSignupModal: false,
        cartModal: false
      };
      
    case "CLOSE_NAVBAR":
      return { ...state, navbarHamburger: false };
      
    case "OPEN_LOGIN_MODAL":
      // Ouvre la modale de login et s'assure que le menu mobile et panier sont fermés
      return { 
        ...state, 
        loginSignupModal: true, 
        navbarHamburger: false,
        cartModal: false 
      };
      
    case "CLOSE_LOGIN_MODAL":
      return { ...state, loginSignupModal: false };
      
    case "TOGGLE_CART":
      // Alterne le panier, ferme le menu et la connexion
      return { 
        ...state, 
        cartModal: !state.cartModal,
        navbarHamburger: false,
        loginSignupModal: false 
      };
      
    case "SET_LOADING":
      return { ...state, loading: action.payload };

    default:
      return state;
  }
};

// 3. Création du Contexte
export const LayoutContext = createContext();

// 4. Le Provider qui englobe les composants
export const LayoutProvider = ({ children }) => {
  // useReducer donne l'état actuel (data) et la fonction pour envoyer des actions (dispatch)
  const [data, dispatch] = useReducer(layoutReducer, layoutState);

  return (
    <LayoutContext.Provider value={{ data, dispatch }}>
      {children}
    </LayoutContext.Provider>
  );
};
