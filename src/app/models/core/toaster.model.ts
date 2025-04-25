export interface toasterModel{
    message:string;
    type: 'success'| 'danger' | 'warning' | 'info' | 'primary';
    delay: number;
}