

export interface SharedState {
  showLoading : boolean,
  showErrorMessage : string
}

export const initialState : SharedState = {
  showLoading : false,
  showErrorMessage : ''
}
