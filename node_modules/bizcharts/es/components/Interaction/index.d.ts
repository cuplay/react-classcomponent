import React from 'react';
import { InteractionOption } from '@antv/g2/lib/interface';
export interface IInteractionProps extends InteractionOption, React.Props<any> {
    type: string;
    config?: object;
}
export default function Interaction(props: IInteractionProps): any;
