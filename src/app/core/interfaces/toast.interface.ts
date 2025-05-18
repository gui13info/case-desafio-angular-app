import { StyleEnum } from '../enums/toast.enum';

export interface ToastInterface {
    message: string;
    type: StyleEnum;
    duration?: number;
}
