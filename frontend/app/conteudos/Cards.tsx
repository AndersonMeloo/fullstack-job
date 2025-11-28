import Image from "next/image";

interface CardsProps {
    children: React.ReactNode
}

function Cards({ children }: CardsProps) {

    return (

        <div className="w-[100px] h-[120px] sm:w-[140px] sm:h-[80px] rounded-xl shadow-2xl mt-2 mb-2 overflow-hidden relative bg-gradient-to-r from-[#5735b1] via-[#48309d] to-[#3c2c8d]">
            <div
                className="absolute inset-0 bg-[#3b2f6d]"
                style={{
                    clipPath: "path('M0 0 L140 0 L140 5 Q200 70 0 20 Z')",
                }}
            ></div>

            <Image
                src="/cloudy.png"
                alt=""
                width={44}
                height={44}
                className="absolute top-0 right-0 z-10"
            />

            <div className="absolute inset-0 flex items-center justify-center z-20">
                {children}
            </div>
        </div>
    );
}


export default Cards;