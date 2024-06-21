import { create } from 'zustand'
import axios from 'axios';

export type ForecastDataState = {
    demand: {
        time: string;
        actual: number;
        forecast: number;
    }[];
    setDemand: (demand: {
        time: string;
        actual: number;
        forecast: number;
    }[]) => void;
    getForecastData: () => void;
}

type ForecastDataApi = {
    timestamp: string;
    actual: number;
    predicted: number;
}

export const useForecastDataStore = create<ForecastDataState>((set) => ({
    demand: [],
    setDemand: (demand) => set({ demand }),
    getForecastData: async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/forecast');
      
            const data = response.data.map((item: ForecastDataApi) => ({
              time: item.timestamp,
              actual: item.actual,
              forecast: item.predicted,
            }));
      
            set({ demand: data });
        } catch (error) {
            console.error(error);
        }
    }
}))