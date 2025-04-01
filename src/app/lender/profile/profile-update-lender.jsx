"use client";

import ModalImageSelectCrop from "@/components/image-select-crop/modal-image-select-crop";
import ModalStateSelect from "@/components/profile/select-state-coverage/modal-state-select";
import { state_data } from "@/static/state-data";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function ProfileUpdateLender({ onDismiss, lender }) {
    const { data: session, update: updateSession } = useSession();

    const [updatedProfileImageFile, setUpdatedProfileImageFile] = useState({});
    const [updatedLogoImageFile, setUpdatedLogoImageFile] = useState({});
    const [headshotFile, setHeadshotFile] = useState(lender.headshot_url);
    const [logoFile, setLogoFile] = useState(lender.brokerage_logo_url);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [modalProfileImageOpen, setModalProfileImageOpen] = useState(false);
    const [modalLogoImageOpen, setModalLogoImageOpen] = useState(false);
    const [modalStateSelectOpen, setModalStateSelectOpen] = useState(false);
    const [selectedStates, setSelectedStates] = useState(lender.states);

    const formTop = useRef();

    const { register, control, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        defaultValues: {
            _id: lender._id,
            name: lender.name,
            name_first: lender.name_first,
            name_last: lender.name_last,
            email: lender.email,
            phone: lender.phone,
            bio: lender.bio,
            brokerage: lender.brokerage,
            link: lender.link,
            address_street: lender.address_street,
            address_more: lender.address_more,
            address_city: lender.address_city,
            address_state: lender.address_state,
            address_zipcode: lender.address_zipcode,
            address_zipcode_plus: lender.address_zipcode_plus,
            position: lender.position,
            nmls_number: lender.nmls_number,
            affiliate_code: lender.affiliate_code,
            social_media_facebook: lender.social_media_facebook,
            social_media_linkedin: lender.social_media_linkedin,
            social_media_instagram: lender.social_media_instagram,
            social_media_x: lender.social_media_x,
            states: lender.states,
        }
    });

    const formatPhoneNumber = (phone) => {
        const cleaned = ('' + phone).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        };

        return phone;
    };

    const states = watch("states");

    useEffect(() => {
        const sortedStates = [...selectedStates].sort();

        setValue("states", sortedStates);
    }, [selectedStates, setValue]);

    const submitForm = async (data) => {
        formTop.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
        });

        // Format phone number (###) ###-####
        data.phone = formatPhoneNumber(data.phone);

        // Create full name string.
        data.name = `${data.name_first.trim()} ${data.name_last.trim()}`;

        // Construct full address.
        const streetAddress = data.address_more != ""
            ? `${data.address_street.trim()} ${data.address_more?.trim()}`
            : `${data.address_street.trim()}`;

        const zipcode_full = data.address_zipcode_plus != ""
            ? `${data.address_zipcode.trim()}-${data.address_zipcode_plus.trim()}`
            : `${data.address_zipcode.trim()}`;

        data.address = `${streetAddress}, ${data.address_city.trim()}, ${data.address_state} ${zipcode_full}`;

        const userData = { ...data };

        // console.log("formData: ", data);
        const formData = new FormData();

        formData.append('headshot', updatedProfileImageFile);
        formData.append('brokerage_logo', updatedLogoImageFile);
        formData.append("user", JSON.stringify(userData));

        try {
            const response = await fetch(`${baseURL}/lender/update_profile`, {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                const update = await response.json();

                setSuccess("Update Successful");
                setError(null);
                updateSession();
            } else if (response.status === 400) {
                const error = await response.json();

                setSuccess(null);
                setError(error.message);
            } else {
                throw new Error(`${response.status} ${response.statusText}`);
            };
        } catch (error) {
            setSuccess(null);
            setError(String(error));
        };
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

            <section className="flex flex-col bg-mw_white rounded-lg mb-6 p-8 shadow-xl">
                <h2 className="text-2xl text-center font-medium w-full mb-4">
                    Profile
                </h2>

                <div className="grid lg:grid-cols-2 lg:gap-2 sm:grid-cols-1">
                    <div className="flex flex-col mb-3">
                        <div className="flex flex-row">
                            <label
                                className="w-36 ml-4"
                                htmlFor="name_first"
                            >
                                First Name (Middle)
                            </label>

                            <p className="text-mw_red font-medium">
                                {errors.name_first?.message}
                            </p>
                        </div>

                        <input
                            type="text"
                            id="name_first"
                            name="name_first"
                            className="mw-input mt-1 focus:outline-none focus:ring-0"
                            {...register('name_first', {
                                required: {
                                    value: true,
                                    message: "Fist Name required",
                                },
                            })}
                            placeholder="John Q."
                            autoComplete="off"
                            maxLength={30}
                        />
                    </div>

                    <div className="flex flex-col mb-3">
                        <div className="flex flex-row">
                            <label
                                className="w-36 ml-4"
                                htmlFor="name_last"
                            >
                                Last Name
                            </label>

                            <p className="text-mw_red font-medium">
                                {errors.name_last?.message}
                            </p>
                        </div>

                        <input
                            type="text"
                            id="name_last"
                            name="name_last"
                            className="mw-input mt-1 focus:outline-none focus:ring-0"
                            {...register('name_last', {
                                required: {
                                    value: true,
                                    message: "Last Name required",
                                },
                            })}
                            placeholder="Smith"
                            autoComplete="off"
                            maxLength={30}
                        />
                    </div>

                    <div className="flex flex-col mb-3">
                        <div className="flex flex-row">
                            <label
                                className="w-36 ml-4"
                                htmlFor="email"
                            >
                                Email
                            </label>

                            <p className="text-mw_red font-medium">
                                {errors.email?.message}
                            </p>
                        </div>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="mw-input mt-1"
                            {...register('email', {
                                required: {
                                    value: true,
                                    message: "Email address required",
                                },
                            })}
                            placeholder="jsmith@email.com"
                            autoComplete="off"
                        />
                    </div>

                    <div className="flex flex-col mb-3">
                        <div className="flex flex-row">
                            <label
                                className="w-36 ml-4"
                                htmlFor="phone"
                            >
                                Phone Number
                            </label>

                            <p className="text-mw_red font-medium">
                                {errors.phone?.message}
                            </p>
                        </div>

                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            className="mw-input mt-1"
                            {...register('phone', {
                                required: {
                                    value: true,
                                    message: "Phone number required",
                                },
                            })}
                            autoComplete="off"
                            placeholder="(555) 555-1234"
                            maxLength={15}
                        />
                    </div>

                    <div className="flex flex-col mb-3">
                        <div className="flex flex-row">
                            <label
                                className="w-36 ml-4"
                                htmlFor="bio"
                            >
                                Biography
                            </label>

                            <p className="text-mw_red font-medium">
                                {errors.bio?.message}
                            </p>
                        </div>

                        <textarea
                            id="bio"
                            name="bio"
                            className="mw-input"
                            {...register("bio", {
                                required: {
                                    value: true,
                                    message: "Brief bio required",
                                },
                            })}
                            rows={4}
                            placeholder="Biography/ information"
                            maxLength={500}
                        />
                    </div>
                </div>
            </section>

            <section className="flex flex-col bg-mw_white rounded-lg mb-6 p-8 shadow-xl">
                <h2 className="text-2xl text-center font-medium w-full mb-4">
                    Company/ Brokerage
                </h2>

                <div className="grid lg:grid-cols-2 lg:gap-2 sm:grid-cols-1">
                    <div className="flex flex-col mb-3">
                        <div className="flex flex-row">
                            <label
                                className="w-36 ml-4"
                                htmlFor="brokerage"
                            >
                                Brokerage Name
                            </label>

                            <p className="text-mw_red font-medium">
                                {errors.brokerage?.message}
                            </p>
                        </div>

                        <input
                            type="text"
                            id="brokerage"
                            name="brokerage"
                            className="mw-input"
                            {...register("brokerage", {
                                required: {
                                    value: true,
                                    message: "Brokerage name required",
                                },
                            })}
                            autoComplete="off"
                            maxLength={30}
                        />
                    </div>

                    <div className="flex flex-col mb-3">
                        <div className="flex flex-row">
                            <label
                                className="w-36 ml-4"
                                htmlFor="link"
                            >
                                Brokerage URL
                            </label>

                            <p className="text-mw_red font-medium">
                                {errors.link?.message}
                            </p>
                        </div>

                        <input
                            type="text"
                            id="link"
                            name="link"
                            className="mw-input"
                            {...register("link", {
                                required: {
                                    value: true,
                                    message: "URL required",
                                },
                            })}
                            autoComplete="off"
                        />
                    </div>

                    <div className="flex flex-col mb-3">
                        <div className="flex flex-row">
                            <label
                                className="w-36 ml-4"
                                htmlFor="position"
                            >
                                Position
                            </label>

                            <p className="text-mw_red font-medium">
                                {errors.position?.message}
                            </p>
                        </div>

                        <input
                            type="text"
                            id="position"
                            name="position"
                            className="mw-input"
                            {...register("position", {
                                required: {
                                    value: true,
                                    message: "Position name required",
                                },
                            })}
                            autoComplete="off"
                            maxLength={50}
                        />
                    </div>

                    <div className="flex flex-col mb-3">
                        <div className="flex flex-row">
                            <label
                                className="w-36 ml-4"
                                htmlFor="nmls_number"
                            >
                                NMLS Number
                            </label>

                            <p className="text-mw_red font-medium">
                                {errors.nmls_number?.message}
                            </p>
                        </div>

                        <input
                            type="text"
                            id="nmls_number"
                            name="nmls_number"
                            className="mw-input"
                            {...register("nmls_number", {
                                required: {
                                    value: true,
                                    message: "Brokerage NMLS number required",
                                },
                            })}
                            autoComplete="off"
                        />
                    </div>

                    <div className="flex flex-col mb-3">
                        <div className="flex flex-row">
                            <label
                                className="w-36 ml-4"
                                htmlFor="affiliate_code"
                            >
                                Affiliate Code
                            </label>

                            <p className="text-mw_red font-medium">
                                {errors.affiliate_code?.message}
                            </p>
                        </div>

                        <input
                            type="text"
                            id="affiliate_code"
                            name="affiliate_code"
                            className="mw-input"
                            {...register("affiliate_code", {
                                required: {
                                    value: true,
                                    message: "Affiliate Code required",
                                },
                                maxLength: {
                                    value: 20,
                                    message: "20 Character Maximum"
                                },
                                minLength: {
                                    value: 4,
                                    message: "4 Character Minimum"
                                }
                            })}
                            autoComplete="off"
                        />
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 lg:gap-2 sm:grid-cols-1 mt-8">
                    <div className="flex flex-col mb-3">
                        <div className="flex flex-row">
                            <label
                                className="w-36 ml-4"
                                htmlFor="address_street"
                            >
                                Street Address
                            </label>

                            <p className="text-mw_red font-medium">
                                {errors.address_street?.message}
                            </p>
                        </div>

                        <input
                            type="text"
                            id="address_street"
                            className="mw-input"
                            {...register("address_street", {
                                required: {
                                    value: true,
                                    message: "Street address required",
                                },
                            })}
                            placeholder="123 Main Street"
                            autoComplete="off"
                        />
                    </div>

                    <div className="flex flex-col mb-3">
                        <div className="flex flex-row">
                            <label
                                className="w-36 ml-4"
                                htmlFor="address_more"
                            >
                                Building, Suite
                            </label>

                            <p className="text-mw_red font-medium">
                                {errors.address_more?.message}
                            </p>
                        </div>

                        <input
                            type="text"
                            id="address_more"
                            className="mw-input"
                            {...register("address_more")}
                            placeholder="Suite 221B"
                            autoComplete="off"
                        />
                    </div>

                    <div className="flex flex-col mb-3">
                        <div className="flex flex-row">
                            <label
                                className="w-36 ml-4"
                                htmlFor="address_city"
                            >
                                City
                            </label>

                            <p className="text-mw_red font-medium">
                                {errors.address_city?.message}
                            </p>
                        </div>

                        <input
                            type="text"
                            id="address_city"
                            className="mw-input"
                            {...register("address_city", {
                                required: {
                                    value: true,
                                    message: "City required",
                                },
                            })}
                            placeholder="Springfield"
                            autoComplete="off"
                        />
                    </div>

                    <div className="flex flex-col mb-3">
                        <div className="flex flex-row mb-1">
                            <label
                                className="w-36 ml-4"
                                htmlFor="address_state"
                            >
                                State
                            </label>

                            <p className="text-mw_red font-medium">
                                {errors.address_state?.message}
                            </p>
                        </div>

                        <Controller
                            control={control}
                            name={`address_state`}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, ...field } }) =>
                                <Select
                                    inputId="address_state"
                                    className="w-full"
                                    {...field}
                                    options={state_data}
                                    onChange={(selectedOption) => {
                                        onChange(selectedOption.value);
                                    }}
                                    styles={SelectStyles}
                                    // placeholder="State (Two-Letter Abbreviation)"
                                    placeholder={lender.address_state}
                                />
                            }
                        />
                    </div>

                    <div className="flex flex-col mb-3">
                        <div className="flex flex-row">
                            <label
                                className="w-36 ml-4"
                                htmlFor="address_zipcode"
                            >
                                Zip Code
                            </label>

                            <p className="text-mw_red font-medium">
                                {errors.address_zipcode?.message}
                            </p>
                        </div>

                        <input
                            type="text"
                            id="address_zipcode"
                            className="mw-input"
                            {...register("address_zipcode", {
                                pattern: {
                                    value: /^\d{5}?$/,
                                    message: "Invalid Zip Code",
                                },
                                required: {
                                    value: true,
                                    message: "Zip Code required",
                                },
                            })}
                            placeholder="12345"
                            autoComplete="off"
                        />
                    </div>

                    <div className="flex flex-col mb-3">
                        <div className="flex flex-row">
                            <label
                                className="w-36 ml-4"
                                htmlFor="address_zipcode_plus"
                            >
                                Zip Codde +4
                            </label>

                            <p className="text-mw_red font-medium">
                                {errors.address_zipcode_plus?.message}
                            </p>
                        </div>

                        <input
                            type="text"
                            id="address_zipcode_plus"
                            className="mw-input"
                            {...register("address_zipcode_plus", {
                                pattern: {
                                    value: /^\d{4}?$/,
                                    message: "Invalid +4 Code",
                                },
                            })}
                            placeholder="6789"
                            autoComplete="off"
                        />
                    </div>
                </div>
            </section>

            <section className="flex flex-col bg-mw_white rounded-lg mb-6 p-8 shadow-xl">
                <h2 className="text-2xl text-center font-medium w-full mb-4">
                    Profile Picture / Company Logo
                </h2>

                <p className="text-center mb-8">
                    Recommended image ratio is 1 x 1.<br></br>
                    Recommend image size is minimum 300px x 300px to maximum 600px x 600px.
                </p>

                <div className="grid lg:grid-cols-2 lg:gap-2 sm:grid-cols-1">
                    <div className="flex flex-col gap-y-4 mb-3">
                        <div className="flex flex-row">
                            <h4 className="w-36 ml-4 mb-1">
                                Headshot Image
                            </h4>

                            <p className="text-mw_red font-medium">
                                {errors.headshot?.message}
                            </p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="flex justify-center items-center bg-white border-mw_gray border-2 w-96 h-96">
                                <Image
                                    className="w-full h-full object-contain"
                                    src={headshotFile}
                                    alt="blog image"
                                    width={0}
                                    height={0}
                                    sizes="100vh"
                                    priority
                                />
                            </div>

                            <button
                                type="button"
                                className="bg-white text-xl border-mw_gray border-2 rounded-xl mt-8 px-3 py-2 hover:bg-mw_gray cursor-pointer"
                                onClick={() => setModalProfileImageOpen(true)}
                            >
                                Select an Image
                            </button>

                            <p className="text-[12px] mt-2 text-mw_red">
                                We recommend 1,000 x 1,000 pixels minimum.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-4 mb-3">
                        <div className="flex flex-row">
                            <h4 className="w-36 ml-4 mb-1">
                                Brokerage Logo
                            </h4>

                            <p className="text-mw_red font-medium">
                                {errors.brokerage_logo?.message}
                            </p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="flex justify-center items-center bg-white border-mw_gray border-2 w-96 h-96">
                                <Image
                                    className="w-full h-full object-contain"
                                    src={logoFile}
                                    alt="blog image"
                                    width={0}
                                    height={0}
                                    sizes="100vh"
                                    priority
                                />
                            </div>

                            <button
                                type="button"
                                className="bg-white text-xl border-mw_gray border-2 rounded-xl mt-8 px-3 py-2 hover:bg-mw_gray cursor-pointer"
                                onClick={() => setModalLogoImageOpen(true)}
                            >
                                Select an Image
                            </button>

                            <p className="text-[12px] mt-2 text-mw_red">
                                We recommend 1,000 x 1,000 pixels minimum.
                            </p>
                        </div>
                    </div>
                </div>
            </section >

            <section className="flex flex-col bg-mw_white items-center rounded-lg mb-6 p-8 shadow-xl">
                <h2 className="text-2xl text-center font-medium w-full mb-4">
                    State Coverage
                </h2>

                <p className="text-mw_red text-center font-medium w-full mb-2">
                    {errors.states && "Subscription state(s) required"}
                </p>

                <div className="flex flex-col justify-center items-center w-full gap-x-8">
                    <textarea
                        className="w-[200px] p-2 mb-4 border border-gray-300 rounded-lg resize-none"
                        rows={4}
                        value={(Array.isArray(states) ? states : []).join("\n")}
                        {...register("states", {
                            validate: value => value.length > 0 || "At least one subscription state is required"
                        })}
                        readOnly
                    />

                    <button
                        type="button"
                        className="bg-mw_olive rounded-xl px-3 py-2"
                        onClick={() => setModalStateSelectOpen(true)}
                    >
                        Add/ Delete States
                    </button>
                </div>
            </section>

            <section className="bg-mw_white rounded-lg mb-6 p-8">
                <p className="text-2xl text-center font-medium w-full mb-4">
                    Social Media Links
                </p>

                <div className="grid lg:grid-cols-2 lg:gap-2 sm:grid-cols-1">
                    <div className="flex flex-col mb-3">
                        <div className="flex flex-row">
                            <div className="h-6 w-6 ml-4">
                                <Image
                                    className="w-full h-full object-contain"
                                    src="/images/icons-social-media/facebook-color/facebook-96.svg"
                                    alt="facebook logo"
                                    placeholder="blur"
                                    blurDataURL="/images/icons-social-media/facebook-color/facebook-96.svg"
                                    width="0"
                                    height="0"
                                    sizes="100vh"
                                />
                            </div>

                            <label
                                className="w-36 ml-1"
                                htmlFor="facebook"
                            >
                                Facebook
                            </label>

                            <p className="text-mw_red font-medium">
                                {errors.social_media_facebook?.message}
                            </p>
                        </div>

                        <input
                            type="text"
                            id="facebook"
                            name="facebook"
                            className="mw-input"
                            {...register("social_media_facebook")}
                            autoComplete="off"
                        />
                    </div>

                    <div className="flex flex-col mb-3">
                        <div className="flex flex-row">
                            <div className="h-6 w-6 ml-4">
                                <Image
                                    className="w-full h-full object-contain"
                                    src="/images/icons-social-media/linkedin-color/linkedin-96.svg"
                                    alt="linkedin logo"
                                    placeholder="blur"
                                    blurDataURL="/images/icons-social-media/linkedin-color/linkedin-96.svg"
                                    width="0"
                                    height="0"
                                    sizes="100vh"
                                />
                            </div>

                            <label
                                className="w-36 ml-1"
                                htmlFor="linkedin"
                            >
                                LinkedIn
                            </label>

                            <p className="text-mw_red font-medium">
                                {errors.social_media_linkedin?.message}
                            </p>
                        </div>

                        <input
                            type="text"
                            id="linkedin"
                            name="linkedin"
                            className="mw-input"
                            {...register("social_media_linkedin")}
                            autoComplete="off"
                        />
                    </div>

                    <div className="flex flex-col mb-3">
                        <div className="flex flex-row">
                            <div className="h-6 w-6 ml-4">
                                <Image
                                    className="w-full h-full object-contain"
                                    src="/images/icons-social-media/instagram-color/instagram-96.svg"
                                    alt="instagram logo"
                                    placeholder="blur"
                                    blurDataURL="/images/icons-social-media/instagram-color/instagram-96.svg"
                                    width="0"
                                    height="0"
                                    sizes="100vh"
                                />
                            </div>

                            <label
                                className="w-36 ml-1"
                                htmlFor="instagram"
                            >
                                Instagram
                            </label>

                            <p className="text-mw_red font-medium">
                                {errors.social_media_instagram?.message}
                            </p>
                        </div>

                        <input
                            type="text"
                            id="instagram"
                            name="instagram"
                            className="mw-input"
                            {...register("social_media_instagram")}
                            autoComplete="off"
                        />
                    </div>

                    <div className="flex flex-col mb-3">
                        <div className="flex flex-row">
                            <div className="h-6 w-6 ml-4">
                                <Image
                                    className="w-full h-full object-contain"
                                    src="/images/icons-social-media/twitterx-color/twitterx-96.svg"
                                    alt="twitter logo"
                                    placeholder="blur"
                                    blurDataURL="/images/icons-social-media/twitterx-color/twitterx-96.svg"
                                    width="0"
                                    height="0"
                                    sizes="100vh"
                                />
                            </div>

                            <label
                                className="w-36 ml-1"
                                htmlFor="twitter"
                            >
                                Twitter/ X
                            </label>

                            <p className="text-mw_red font-medium">
                                {errors.social_media_x?.message}
                            </p>
                        </div>

                        <input
                            type="text"
                            id="twitter"
                            name="twitter"
                            className="mw-input"
                            {...register("social_media_x")}
                            autoComplete="off"
                        />
                    </div>
                </div>
            </section>

            <div className="flex justify-center mt-10 space-x-8">
                <button
                    type="submit"
                    className="bg-mw_olive rounded-xl h-12 px-6 hover:bg-mw_turq"
                >
                    Submit Changes
                </button>
            </div>

            {modalProfileImageOpen && (
                <ModalImageSelectCrop
                    currentImage={headshotFile}
                    setCurrentImage={setHeadshotFile}
                    setCurrentImageFile={setUpdatedProfileImageFile}
                    closeModal={() => setModalProfileImageOpen(false)}
                />
            )}

            {modalLogoImageOpen && (
                <ModalImageSelectCrop
                    currentImage={logoFile}
                    setCurrentImage={setLogoFile}
                    setCurrentImageFile={setUpdatedLogoImageFile}
                    closeModal={() => setModalLogoImageOpen(false)}
                />
            )}

            {modalStateSelectOpen && (
                <ModalStateSelect
                    selectedStates={selectedStates}
                    setSelectedStates={setSelectedStates}
                    closeModal={() => setModalStateSelectOpen(false)}
                />
            )}
        </form>
    );
};
