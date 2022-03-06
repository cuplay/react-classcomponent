import React from 'react';
import { Plot } from '@antv/g2plot/lib/core/plot';
interface BasePlotOptions {
    /**
     * 获取g2Plot实例的勾子函数
     */
    onGetG2Instance?: (chart: Plot<any>) => void;
    errorContent?: React.ReactNode;
    /**
     * 图表事件
     */
    events?: Record<string, Function>;
    /**
     * 图表标题。如需绑定事件请直接使用ReactNode。
     */
    readonly title?: React.ReactNode;
    /**
     * 图表副标题。如需绑定事件请直接使用ReactNode。
     */
    readonly description?: React.ReactNode;
    /**
     * 请使用autoFit替代forceFit
     */
    forceFit?: boolean;
}
export { BasePlotOptions };
declare function createPlot<IPlotConfig extends Record<string, any>>(PlotClass: any, name: string, transCfg?: Function): React.ForwardRefExoticComponent<React.PropsWithoutRef<IPlotConfig> & React.RefAttributes<any>>;
export default createPlot;
