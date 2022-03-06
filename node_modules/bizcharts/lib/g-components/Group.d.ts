import React from 'react';
export interface IGroupProps extends React.Props<any> {
    [key: string]: any;
    translate?: [number, number];
}
declare const _default: React.ForwardRefExoticComponent<Pick<IGroupProps, string | number> & React.RefAttributes<any>>;
export default _default;
