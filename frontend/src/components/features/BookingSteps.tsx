import React from "react";
import { STEPS } from "../../constants/constants";
import { Check } from "lucide-react";

const BookingSteps = ({ currentStep }: { currentStep: number }) => {

    return (
        <div className="flex items-center justify-center mb-8">
            {STEPS.map((step, index) => (
                <React.Fragment key={step.number}>
                    <div className="flex flex-col items-center relative">
                        <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10 ${currentStep >= step.number
                                ? "bg-primary border-primary text-white shadow-lg shadow-orange-200"
                                : "bg-white border-primaryBorder text-gray-400"
                                }`}
                        >
                            {currentStep > step.number ? (
                                <span className="text-xl font-bold"><Check /></span>
                            ) : (
                                <span className="font-bold">{step.number}</span>
                            )}
                        </div>

                        <span className={`absolute -bottom-7 w-max text-md font-medium transition-colors duration-300 ${currentStep >= step.number ? "text-primary" : "text-gray-400"
                            }`}>
                            {step.title}
                        </span>
                    </div>p

                    {index < STEPS.length - 1 && (
                        <div className="w-full h-1 bg-gray-200 mx-2 relative">
                            <div
                                className="absolute top-0 left-0 h-full bg-primary transition-all duration-500"
                                style={{ width: currentStep > step.number ? "100%" : "0%" }}
                            />
                        </div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default BookingSteps;