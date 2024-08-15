import { useState } from "react";
import {
    LuAlertTriangle,
    LuCheckCircle2,
    LuAlertCircle,
    LuBrackets
} from 'react-icons/lu';

export const UseInterface = () => {
    const [AppTheme,setAppTheme] = useState('light');
    const [TabActive, setTabActive] = useState('PRENDAS');

    // functions
    const handleTheme = () => {
        let newtheme = (AppTheme=='dark') ? 'light' : 'dark';
        setAppTheme(newtheme)
    }
    const handleView = (e) => {
        let view = e.target.dataset.view;
        if (view) {
            setTabActive(view);
        }
    }

    // almacena iconos por tipo especificado
    const IconType = (type) => {
        switch (type) {
            case 'warning':
                return (<LuAlertTriangle size={18} />);
                break;
        
            case 'success':
                return (<LuCheckCircle2 size={18} />);
                break;

            case 'danger':
                return (<LuAlertCircle size={18} />);
                break;

            case 'primary':
                return (<LuBrackets size={18} />);
                break;

            default:
                return (<span>NO_DATA</span>);
                break;
        }
    }
    
    return {AppTheme, TabActive, handleView,handleTheme,IconType};
}