import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../model/store";
import { tabTypes, tabTypesArray } from "../model/UIModel";

interface IProps {
    selectedTab: tabTypes
}

const TabsBar = (
    {selectedTab}: IProps
) => {

    const dispatch = useDispatch<AppDispatch>();

    const onClick = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        //@ts-ignore
        const selected: tabTypes = e.target.getAttribute("tabName");
        console.log(e);
        console.log(selected);

        dispatch({
            type: "SELECT_TAB",
            tab: selected
        });
    }

    return (
        <div onClick={onClick} id="tabs-bar">
            { tabTypesArray.map( t => {

                const className = (selectedTab === t) ? "tab selected" : "tab";

                return (
                    <div
                        //@ts-ignore
                        tabName = {t}
                        className={className}>
                            {t}
                    </div>
                );
            })}
        </div>
    );

};

export default TabsBar;
