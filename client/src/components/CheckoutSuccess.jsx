import React from 'react';

const CheckoutSuccess = () => {
    return (
        <main className="w-screen min-h-screen flex items-center justify-start flex-col">
            <div className="w-full flex flex-col items-center justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
                <img src="https://okcredit-blog-images-prod.storage.googleapis.com/2020/12/payment3.jpg" className="w-58 h-80 object-cover" alt="" />
                <h1 className="text-[50px] text-headingColor font-bold">
                    Amount Paid Successfully!
                </h1>
            </div>
        </main>
    )
};

export default CheckoutSuccess;