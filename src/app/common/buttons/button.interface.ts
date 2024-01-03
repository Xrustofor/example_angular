import { IKeyValue } from "src/app/interfaces/global/global.interfaces";

export type BUTTON_COLOR = 'white' | 'black' | 'transparent' | 'green' | 'orange' | 'red' | 'blue' | 'purple' | 'lightorange' | 'lightred' | 'lightblue' | 'lightgray';

export const ButtonColorDictionary: IKeyValue<BUTTON_COLOR, string>[] = [
    { key: 'white', value: 'white' },
    { key: 'black', value: 'black' },
    { key: 'transparent', value: 'transparent' },
    { key: 'green', value: '#4EA079' },
    { key: 'orange', value: '#F1A33C' },
    { key: 'red', value: '#C14862' },
    { key: 'blue', value: '#5975CF' },
    { key: 'purple', value: '#C14895' },

    { key: 'lightorange', value: '#FFF0CC' },
    { key: 'lightred', value: '#F9EDEF' },
    { key: 'lightblue', value: '#D7DEF3' }, //#DEE3F5 lightblue
    { key: 'lightgray', value: '#BCBDBF' },
];

export const GET_BUTTON_COLOR = (colorKey: string) => {
    const colorData = ButtonColorDictionary.find(c => c.key === colorKey);
    if (colorData) return colorData.value;
    return ButtonColorDictionary[0].value;
}