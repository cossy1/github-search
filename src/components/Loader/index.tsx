import React from "react";

const Loader = () => {
    return <div className='w-full h-full grid place-items-center'>
        <svg
            width='72'
            height='72'
            style={{
                background: 'transparent',
                display: 'block',
                shapeRendering: 'auto',
            }}
            viewBox='0 0 72 72'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <circle cx='36' cy='36' r='32' stroke='#ECEEF5' strokeWidth='8' />
            <path
                d='M68 36C68 53.6731 53.6731 68 36 68'
                stroke='#2C1DFF'
                strokeWidth='8'
                strokeLinecap='round'
            >
                <animateTransform
                    attributeName='transform'
                    type='rotate'
                    repeatCount='indefinite'
                    dur='1s'
                    values='0 36 36;360 36 36'
                    keyTimes='0;1'
                ></animateTransform>
            </path>
        </svg>
    </div>
};

export default Loader;