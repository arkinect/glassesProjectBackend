// imports
import React, { useEffect, useState } from 'react';
import './PageStylings.scss';

// prop interface
interface props {
}

// class
const LogoutPage: React.FC<props> = () => {
    return(
        <div>
            <header>

            </header>
            <main>
                <div className={"spacing_page_margins"}>
                    you've been logged out
                </div>
            </main>

        </div>
    );

};

export default LogoutPage;