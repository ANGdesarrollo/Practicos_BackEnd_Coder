import React, { useState, useEffect } from 'react';

export const DataUser = ( { dataUser } ) => {
    return (
        <div className="card m-5" style={ { width: '18rem' } }>
            <img className="card-img-top" src={ dataUser.avatar } alt="Card image cap"></img>
            <div className="card-body">
                <h5 className="card-title">Name: { dataUser.name }</h5>
                <h6 className="card-title">Email: { dataUser.username }</h6>
                <h6 className="card-title">Phone: { dataUser.phone }</h6>
                <h6 className="card-title">Address { dataUser.address }</h6>
            </div>
        </div>
    );
};
