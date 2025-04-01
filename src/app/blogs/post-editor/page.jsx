"use client";

import ConfirmationModal from "@/app/blogs/posts-components/confirmation-modal";
import ModalImageSelectCrop from "@/components/image-select-crop/modal-image-select-crop";
import UserNavSide from "@/components/navigation/UserSideNav";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaUsers } from "react-icons/fa";
import { FcInvite } from "react-icons/fc";
import { MdArticle, MdSpaceDashboard } from "react-icons/md";
import slugify from "slugify";
import xss from "xss";
import PostEditor from "../posts-components/post-editor";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const placeholderImage = "/images/placeholder-transparent.png";

export default function CreatePost() {
	const { data: session } = useSession();

	const [content, setContent] = useState("")
	const [postImage, setPostImage] = useState(placeholderImage);
	const [postImageFile, setPostImageFile] = useState(null);
	const [success, setSuccess] = useState(null);
	const [error, setError] = useState("");
	const [isModalOpened, setIsModalOpened] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [response, setResponse] = useState('No');
	const [formData, setFormData] = useState();

	const navigation = [
		{
			name: "Dashboard",
			href: session?.user?.userRole === 'realtor' ? "/agent" : "/lender",
			icon: <MdSpaceDashboard className="h-6 w-6" />
		},
		{
			name: "Profile",
			href: session?.user?.userRole === 'realtor' ? "/agent/profile" : "/lender/profile",
			icon: <FaUser className="h-6 w-6" />
		},
		{
			name: "Clients",
			href: session?.user?.userRole === 'realtor' ? "/agent/clients" : "/lender/clients",
			icon: <FaUsers className="h-6 w-6" />
		},
		{
			name: "Invited",
			href: session?.user?.userRole === 'realtor' ? "/agent/invited" : "/lender/invited",
			icon: <FcInvite className="h-6 w-6" />

		},
		{
			name: "Submit Article",
			href: "/blogs/post-editor",
			icon: <MdArticle className="h-6 w-6" />
		},
	];

	const formTop = useRef();

	const { register, control, handleSubmit, formState, reset, formState: { errors } } = useForm({
		defaultValues: {
			author: {
				_id: session?.user._id,
				name: session?.user.name,
				user_role: session?.user.userRole
			},
			title: "",
			category: "",
			summary: "",
			content: "",
			slug: "",
			image_url: "",
		}
	});

	const inputStyle = "bg-white border-mw_gray border-2 rounded-xl w-full shadow-xl focus:border-transparent focus:ring-0";

	const submitForm = useCallback(async (data) => {
		setFormData(data);
		setIsModalOpened(true);

		if (response === 'Yes') {
			formTop.current.scrollIntoView({
				behavior: "smooth",
				block: "start",
				inline: "nearest"
			});

			const cleanedContent = xss(content);
			data.content = cleanedContent;
			data.author = {
				_id: session?.user._id,
				name: session?.user.name,
				user_role: session?.user.userRole
			};
			data.summary = content.replace(/<\/?[^>]+>/gi, '').slice(0, 250);

			const postSlug = slugify(data.title, {
				replacement: '-',
				remove: undefined,
				lower: true,
				strict: true,
				trim: true
			});

			data.slug = postSlug;

			const formData = new FormData();

			// Check if image is selected
			if (!postImageFile) {
				setError("An article image is required.");

				return; // Exit the function if image is missing
			} else
				formData.append("postImage", postImageFile);

			formData.append("post", JSON.stringify(data));

			try {
				const response = await fetch(`${baseURL}/post/create_post`, {
					method: "POST",
					body: formData
				});

				if (response.ok) {
					const submission = await response.json();

					setSuccess("Post Submitted Successfully");
					setError(null);
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
	}, [content, postImageFile, response, session?.user]);

	// Handle the confirmation response
	useEffect(() => {
		if (response === 'Yes' && formData) {
			submitForm(formData);
		};
	}, [response, formData, submitForm]);

	return (
		<div className="flex">
			{session?.user &&
				<UserNavSide className="w-64" navigation={navigation} />
			}

			<main className="bg-mw_white w-full text-mw_black h-screen overflow-y-auto px-4 py-20 md:mb-8 sm:mb-20">
				<header className="mb-12" ref={formTop}>
					<h1 className="text-4xl text-center uppercase font-bold mb-4">
						Create Post
					</h1>

					<div className="flex bg-white justify-center items-center shadow-xl rounded-xl h-12">
						{success &&
							<div className="flex items-center gap-16">
								<p className="text-2xl">
									{success}
								</p>

								<Link
									className="bg-mw_green text-xl text-center rounded-xl w-24 py-1 hover:bg-mw_olive"
									href="/blogs/"
								>
									Done
								</Link>
							</div>
						}

						{/* {error &&
							<p className="text-2xl text-mw_red">
								{error}
							</p>
						} */}

						{error && (
							<p className="text-2xl text-mw_red">
								{error === "An article image is required." ? "An article image is required." : error}
							</p>
						)}

						{Object.keys(errors).length !== 0 &&
							<p className="text-2xl text-mw_red">
								Please fix errors and resubmit
							</p>
						}
					</div>
				</header>

				<form
					className="lg:px-14"
					onSubmit={handleSubmit(submitForm)}
				>
					<section className="flex flex-row gap-6 w-full mb-6 flex-wrap md:flex-nowrap">
						<div className="flex flex-col items-center gap-6 w-full md:w-[50%]">
							<div className="flex flex-col w-full mb-3">
								<div className="flex gap-x-4">
									<label
										className="font-bold uppercase"
										htmlFor="title"
									>
										Title
									</label>

									<p className="text-mw_red text-[14px] mb[5px]">
										{errors.title?.message}
									</p>
								</div>

								<input
									type="text"
									id="title"
									name="title"
									className={inputStyle}
									{...register("title", {
										required: {
											value: true,
											message: "Title required",
										},
									})}
									placeholder="Make sure to tell your audience what is the post about"
									autoComplete="off"
								/>
							</div>

							<div className="flex flex-col w-full mb-3">
								<div className="flex gap-x-4">
									<h4
										className="font-bold uppercase"
										htmlFor="category"
									>
										Category
									</h4>

									<p className="text-mw_red text-[14px] mb-[5px]">
										{errors.category?.message}
									</p>
								</div>

								<select
									id="category"
									className={inputStyle}
									{...register("category", {
										required: {
											value: true,
											message: "Category required",
										},
									})}
								>
									<option value="" disabled>Select a category</option>
									<option value="Home Buyer">Home Buyer</option>
									<option value="Home Seller">Home Seller</option>
									<option value="Agent">Agent</option>
									<option value="Lender">Lender</option>
								</select>
							</div>
						</div>

						<div className="flex justify-center md:w-[50%]">
							<div className="text-mw_black">
								<p className="text-lg text-center w-full mb-4">
									Post Image
								</p>

								<div className="flex flex-col items-center">
									<div className="flex justify-center items-center bg-white border-mw_gray border-2 w-full max-w-96 h-96">
										<Image
											className="w-full h-full object-contain"
											src={postImage}
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
										onClick={() => setModalOpen(true)}
									>
										Select an Image
									</button>

									<p className="text-[12px] mt-2 text-mw_red">
										We recommend 1,000 x 1,000 pixels minimum.
									</p>
								</div>
							</div>
						</div>
					</section>

					<section className="flex-grow w-full mb-12">
						<div className="flex gap-x-4">
							<p className="font-bold uppercase">
								Content
							</p>

							<p className="text-mw_red text-[14px] mb-[5px]">
								{errors.content?.message}
							</p>
						</div>

						<div className="post-content-editor">
							<PostEditor
								name="post"
								content={content}
								setContent={setContent}
							/>
						</div>
					</section>

					<div className="flex justify-center">
						<button
							type="submit"
							className="bg-mw_green md:text-xl text-mw_black text-center font-bold h-[40px] rounded-xl px-4
								hover:bg-mw_olive cursor-pointer lg:min-h-[44px] lg:py-2 min-w-[200px] hover-scale-btn"
						>
							Submit Article
						</button>
					</div>
				</form>

				{modalOpen && (
					<ModalImageSelectCrop
						currentImage={postImage}
						setCurrentImage={setPostImage}
						setCurrentImageFile={setPostImageFile}
						closeModal={() => setModalOpen(false)}
					/>
				)}

				{isModalOpened && !error &&
					<ConfirmationModal
						response={response}
						setIsModalOpened={setIsModalOpened}
						setResponse={setResponse}
					/>
				}
			</main >
		</div>
	);
};
