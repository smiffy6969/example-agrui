import { TemperatureData } from '@/service/MainApi';

// Component Type
export type TemperatureChartType = {
	id?: string;
	className?: string;
	hidden?: boolean;
	data: TemperatureData[];
};
