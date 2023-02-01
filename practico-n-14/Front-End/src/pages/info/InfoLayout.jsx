import React, { useEffect } from 'react';

export const InfoLayout = ({info = {}}) => {
    useEffect(() => {
    }, [ info ])
    return (
        info &&
        <table className="table">
            <thead>
            <tr>
                <th scope="col">Input arguments</th>
                <th scope="col">Operating system</th>
                <th scope="col">Node.js version</th>
                <th scope="col">Total reserved memory (rss)</th>
                <th scope="col">Process id</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                    <ul className="d-flex">
                        {info.args && info.args.slice( 2 ).map( (arg, i) => {return(<li key={i} className="list-group ps-1">{ arg }</li>) }) }
                    </ul>
                </td>
                <td>{ info.opSystem }</td>
                <td>{ info.nodeVersion }</td>
                <td>{ info.rss }</td>
                <td>{ info.processID }</td>
            </tr>
            </tbody>
        </table>
    );
};
