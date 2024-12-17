import React from 'react';

const CheckoutFail = () => {
    return (
        <main className="w-screen min-h-screen flex items-center justify-start flex-col">
            <div className="w-full flex flex-col items-center justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
                <img src="https://www.letsbooktravel.eu/wp-content/uploads/2019/11/shutterstock_1341887282-Copy.jpg" className="w-58 h-80 object-cover" alt="" />
                <h1 className="text-[50px] text-headingColor font-bold">
                    Payment failed! Please try again!
                </h1>
            </div>
        </main>
    )
};

export default CheckoutFail;