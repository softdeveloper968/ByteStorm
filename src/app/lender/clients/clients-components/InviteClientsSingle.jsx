"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function InviteClientsSingle() {
  const { data: session, update: updateSession } = useSession();

  const [message, setMessage] = useState(null);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const clearInviteForm = (event) => {
    event.preventDefault();
    setMessage(null);
    reset();
  };

  const onSubmit = async (data) => {
    const token = session?.user.token;

    const client = {
      clients: [
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
        },
      ],
    };

    try {
      const response = await fetch(`${baseURL}/lender/invite_client`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(client),
      });

      if (response.ok) {
        const success = await response.json();

        setMessage(success.message);
        setError(null);
        updateSession();
      } else if (response.status === 400) {
        const error = await response.json();

        setError(error.message);
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (error) {
      setMessage(null);
      setError(String(error));
    }
  };

  return (
    <form
      className="bg-mw_white rounded-lg w-full max-h-[95%]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <section className="flex flex-col mx-auto w-[90%]">
        <div className="flex justify-between h-10">
          <p className="text-xl mt-8">Add Home Buyer Client</p>

          {message && (
            <div className="flex justify-end items-center gap-8">
              <p className="text-mw_olive">{message}</p>

              <button
                className="bg-mw_olive text-mw_black rounded-lg w-40 p-2 cursor-pointer"
                onClick={(event) => clearInviteForm(event)}
              >
                Clear Form
              </button>
            </div>
          )}
        </div>

        <div className="flex mt-4">
          <div className="flex flex-col w-full py-6">
            <div className="flex flex-col mb-3">
              <div className="flex flex-row">
                <label className="w-36 ml-4" htmlFor="name">
                  Name
                </label>

                <p className="text-mw_red font-medium">
                  {errors.name?.message}
                </p>
              </div>

              <input
                type="text"
                id="name"
                name="name"
                className="mw-input"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name required",
                  },
                })}
                autoComplete="off"
              />
            </div>

            <div className="flex flex-col mb-3">
              <div className="flex flex-row">
                <label className="w-36 ml-4" htmlFor="email">
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
                className="mw-input"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email address required",
                  },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                    message: "Enter valid email address",
                  },
                })}
                autoComplete="off"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex flex-col mb-3">
                <div className="flex flex-row">
                  <label className="w-36 ml-4" htmlFor="phone">
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
                  className="mw-input"
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "Phone number required",
                    },
                    pattern: {
                      value: /^\d+$/,
                      message: "Invalid mobile number format",
                    },
                  })}
                  autoComplete="off"
                />
              </div>

              <div className="flex justify-center mt-4 pb-4">
                <button
                  type="submit"
                  className="bg-mw_red text-white rounded-lg w-40 p-2 cursor-pointer"
                >
                  Send Invite Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
}
