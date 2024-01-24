import { Dispatch, SetStateAction, useState } from "react";

import "./App.css";
/*

Комменты и мысли

В самой форме, я бы провёл контекст или сделал глобальный store, для передачи пропсов внутрь, ибо вероятно, что редактирование может быть с большой вложенностью,
но такой задачи не стояло.

В качестве пропса key был выставлен id элемента, потому что в данный момент, они не дублируются (по опыту работы с файлами яндекс маркетом параметры ни разу не дублировались)

Для формы можно было бы использовать formik и yup, но я посчитал, что это будет излишне в данной задаче

*/

type ParamsType = 'string' | 'number' | 'select';

interface ParamInt {
    id: number;
    name: string;
    type?: ParamsType;
}

interface ParamValueInt {
    paramId: number;
    value: string;
}

interface ModelInt {
    paramValues: ParamValueInt[];
}

interface PropsInt {
    params: ParamInt[];
    model: ModelInt;
}

interface ParamEditorItemInt {
    item: ParamInt;
    paramValue: ParamValueInt;
    setParamsHandler: Dispatch<SetStateAction<any>>
}

class ParamEditorFunctions {
    static getParamValueById(paramValues: Array<ParamValueInt>, id: number): ParamValueInt {
        const paramValue = paramValues.filter((item: ParamValueInt) => item.paramId === id);
        return paramValue[0];
    }
}

export function ParamEditorItem({item, paramValue, setParamsHandler }: ParamEditorItemInt){

    const valueTextHandler = (value: string, item: ParamValueInt) => {
        setParamsHandler((paramValues: Array<ParamValueInt>) => [...paramValues.filter((element: ParamValueInt) => element.paramId !== item.paramId), {...item, value: value}]);
    }

    return (
        <div className="app__param" key={item.id}>
            <label className="app__param-label" htmlFor={String(item.id)}>{item.name}</label>
            <input className="app__param-input" type="text" id={String(item.id)} value={paramValue.value ?? ""} onChange={(e: React.ChangeEvent<HTMLInputElement>) => valueTextHandler(e.target.value, paramValue)}/>
        </div>
    );
}

export default function ParamEditor({ params, model }: PropsInt) {

    const [paramValuesList, setParamValuesList] = useState<Array<ParamValueInt>>(model.paramValues);
    const [modelParams, setModelParams] = useState<boolean>(false);

    const getModel = () => {
        const returnValues = params.map((item: ParamInt) => {
            return {...item, ...paramValuesList.filter((element: ParamValueInt) => element.paramId === item.id)[0]}
        });

        console.table(returnValues);
    }

    getModel();

    return (
        <form className="app-form">
            {params && params.map((item: ParamInt) => {

                const paramValue = ParamEditorFunctions.getParamValueById(paramValuesList, item.id);

                //case: string return
                if (item.hasOwnProperty("type")) {
                    if (item.type === "string" && paramValue) {
                        return(
                            <ParamEditorItem key={item.id} item={item} paramValue={paramValue} setParamsHandler={setParamValuesList}/>
                        )
                    }
                }
                else {
                    //default return
                    return(
                        <ParamEditorItem key={item.id} item={item} paramValue={paramValue} setParamsHandler={setParamValuesList}/>
                    )
                }
            })}
        </form>
    )
};