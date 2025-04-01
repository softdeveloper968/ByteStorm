"use client";

import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Select from "react-select";
import { state_data } from "@/static/state-data";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function UpdateState({ onDismiss }) {
    const { data: session, update } = useSession();

    const [headshotFile, setHeadshotFile] = useState({});
    const [logoFile, setLogoFile] = useState({});
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const formTop = useRef();

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            _id: session.user._id,
            name: session.user.name,
            name_first: session.user.name_first,
            name_last: session.user.name_last,
            email: session.user.email,
            phone: session.user.phone,
            bio: session.user.bio,
            brokerage: session.user.brokerage,
            link: session.user.link,
            address_street: session.user.address_street,
            address_more: session.user.address_more,
            address_city: session.user.address_city,
            address_state: session.user.address_state,
            address_zipcode: session.user.address_zipcode,
            address_zipcode_plus: session.user.address_zipcode_plus,
            position: session.user.position,
            nmls_number: session.user.nmls_number,
            affiliate_code: session.user.affiliate_code,
            states: session.user.states.map(state => ({ value: state })),
        }
    });

    const updateSession = async (data) => {
        console.log("Updating session with data:", data);
        await update({
            ...session, ...data
        });
    };

    const {
        fields: stateFields,
        append: stateAppend,
        remove: stateRemove
    } = useFieldArray({ control, name: 'states' });

    const submitForm = async (data) => {
        formTop.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
        });

        const formData = new FormData();
        formData.append('headshot', headshotFile);
        formData.append('brokerage_logo', logoFile);

        const userData = {
            ...data,
            states: data.states.map(state => state.value)
        };

        formData.append("user", JSON.stringify(userData));
        console.log("Submitting form with data:", userData);

        try {
            const response = await fetch(`${baseURL}/lender/update_profile`, {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                const update = await response.json();
                console.log("Response data:", update);

                setSuccess("Update Successful");
                setError(null);
                updateSession(update.lender);
            } else if (response.status === 400) {
                const error = await response.json();
                setSuccess(null);
                setError(error.message);
            } else {
                throw new Error(`${response.status} ${response.statusText}`);
            }
        } catch (error) {
            setSuccess(null);
            setError(String(error));
        }
    };

    const SelectStyles = {
        control: styles => ({
            ...styles,
            backgroundColor: "white",
            border: "1px solid #8aba4e",
            boxShadow: 0,
            "&:hover": { borderColor: "#aada6e" },
            height: "45px"
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: "white",
            color: state.isSelected ? "black" : "#93B75D",
            input: "black"
        }),
        singleValue: styles => ({
            ...styles,
            color: "black",
        }), input: styles => ({
            ...styles,
            color: "black",
        }),
    };

    return (
        <form
            className="overflow-y-scroll no-scrollbar p-4"
            onSubmit={handleSubmit(submitForm)}
        >
            <section
                className="flex flex-col bg-mw_white rounded-lg mb-6 p-8"
                ref={formTop}
            >
                <div className="flex bg-mw_olive justify-center items-center rounded-xl h-12 mb-2">
                    {success &&
                        <div className="flex items-center gap-16">
                            <p className="text-2xl">
                                {success}
                            </p>

                            <button
                                type="button"
                                className="bg-mw_green text-xl rounded-xl w-24 py-1"
                                onClick={onDismiss}
                            >
                                Done
                            </button>
                        </div>
                    }

                    {error &&
                        <p className="text-2xl text-mw_red">
                            {error}
                        </p>
                    }

                    {Object.keys(errors).length !== 0 &&
                        <p className="text-2xl text-mw_red">
                            Please fix errors and resubmit
                        </p>
                    }
                </div>
            </section>

            <section className="flex flex-col bg-mw_white items-center rounded-lg mb-6 p-8 shadow-xl">
                <h2 className="text-2xl text-center font-medium w-full mb-4">
                    State Coverage
                </h2>

                <p className="text-mw_red text-center font-medium w-full mb-2">
                    {errors.states && "Subscription state(s) required"}
                </p>

                <div className="flex flex-wrap justify-center gap-6">
                    {stateFields.map((field, index) => (
                        <div key={field.id} className="flex flex-row gap-4 w-96">
                            <Controller
                                control={control}
                                name={`states.${index}.value`}
                                render={({ field: { value, onChange, ...field } }) =>
                                    <Select
                                        className="w-full"
                                        {...field}
                                        options={state_data}
                                        value={state_data.find(option => option.value === value)}
                                        onChange={(selectedOption) => {
                                            onChange(selectedOption.value);
                                        }}
                                        styles={SelectStyles}
                                    />
                                }
                            />

                            <button
                                type="button"
                                className="bg-mw_olive rounded-xl px-3 py-2"
                                onClick={() => stateRemove(index)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    className="bg-mw_olive w-96 rounded-xl mt-8 px-3 py-2 hover-scale-btn"
                    onClick={() => stateAppend({ value: "" })}
                >
                    Add Additional States
                </button>
            </section>

            <div className="flex justify-center mt-10 space-x-8">
                <button
                    type="submit"
                    className="bg-mw_olive rounded-xl h-12 px-6 hover:bg-mw_turq"
                >
                    Submit Changes
                </button>
            </div>
        </form>
    );
};
