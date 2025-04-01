import React from "react";
import { FaCheck } from "react-icons/fa";


export default function StripeFeaturesModal({ isOpen, onClose, tier }) {
    return (
        isOpen && (
            <main
                className="flex items-center justify-center fixed z-10 inset-0 overflow-y-auto"
            >
                <div
                    className="bg-galaxy_black-500 opacity-75 transition-opacity fixed inset-0"
                    aria-hidden="true"
                >
                    {/* This div changes opacity of background. */}
                </div>
                <section
                    className="
                        relative
                        bg-cloud_white-900
                        rounded-xl
                        w-1/2
                        p-5
                        sm:p-6
                    "
                >
                    <div className="flex flex-col text-galaxy_black-900">
                        <div className="flex justify-between w-full">
                            <h3
                                className="text-lg font-medium"
                                id="modal-title"
                            >
                                {tier.name} Features
                            </h3>

                            <button
                                type="button"
                                className="
                                    flex
                                    bg-olive-900
                                    text-cloud_white-900
                                    font-bold
                                    justify-center
                                    items-center
                                    rounded-full
                                    w-6
                                    h-6
                                    ml-6
                                    sm:ml-0
                                    hover:bg-olive-500
                                "
                                onClick={onClose}
                            >
                                X
                            </button>
                        </div>

                        <div className="mt-2">
                            <div
                                className="mt-6 space-y-4"
                                role="list"
                            >
                                {tier.detailedFeatures.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex space-x-3"
                                    >
                                        <FaCheck
                                            className="flex-shrink-0 h-5 w-5 text-olive-900"
                                            aria-hidden="true"
                                        />
                                        <span className="text-sm">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        )
    );
};
