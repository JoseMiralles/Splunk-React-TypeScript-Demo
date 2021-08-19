import React from "react";
import { useDispatch } from "react-redux";
import { IListing } from "../model/listingsModel";
import { AppDispatch } from "../model/store";

interface IProps {
    listings: IListing[],
    loading: boolean
}

const Table = (
    { listings, loading }: IProps
) => {

    const dispatch = useDispatch<AppDispatch>();

    const onClick = (
        e: React.MouseEvent<HTMLTableElement, MouseEvent>
    ) => {
        //@ts-ignore
        let idx = e.target.getAttribute("index");
        //@ts-ignore
        idx = idx ? idx : e.target.parentNode.getAttribute("index");

        if (idx) {
            dispatch({
                type: "TOGGLE_LISTING_SELECTION",
                Index: idx
            });
        }
    };

    return (

        <table onClick={onClick} id="listings-table">

            {/* Table headers */}
            <tr>
                <th></th>
                <th>Name</th>
                <th>Beds</th>
                <th>Neighbourhood</th>
            </tr>

            {/* Table rows */}
            { listings.map((t, i) => {

                const cm = t.Selected ? "selected" : "";

                return (
                    <>
                    {//@ts-ignore
                    <tr index={t.Index} className={cm}>
                        <td>{i + 1}</td>
                        <td>{t.Name}</td>
                        <td>{t.Beds}</td>
                        <td>{t.Neighbourhood}</td>
                    </tr>}
                    </>
                );
            }
                
            )}

        </table>
        
    );
};

export default Table;
