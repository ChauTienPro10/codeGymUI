import { AlertType } from "./alert";

export type AlertState = {
  visible: boolean;
  message: string;
  type: AlertType;
};

export type AlertAction =
  | { type: 'SHOW_ALERT'; payload: { message: string; type: AlertType } }
  | { type: 'HIDE_ALERT' };

export const initialAlertState: AlertState = {
  visible: false,
  message: '',
  type: 'info',
};

export function alertReducer(state: AlertState, action: AlertAction): AlertState {
  switch (action.type) {
    case 'SHOW_ALERT':
      return {
        visible: true,
        message: action.payload.message,
        type: action.payload.type,
      };
    case 'HIDE_ALERT':
      return { ...state, visible: false };
    default:
      return state;
  }
}
