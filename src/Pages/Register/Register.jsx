import { Link, NavLink, useNavigate } from "react-router";
import bgImage from "../../assets/signup-bg-DGRfriy9.png";
import image from "../../assets/me.jpg";
import { Heart } from "iconsax-reactjs";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { parseDate } from "@internationalized/date";

const schema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be less than 20 characters")
      .regex(/^[a-zA-Z][a-zA-Z ]{2,20}$/, "Please enter a valid username"),

    email: zod
      .string("Email is required")
      .nonempty("Email is required")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email",
      ),

    password: zod
      .string()
      .nonempty("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be less than 20 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      ),

    rePassword: zod.string().nonempty("Confirm password is required"),

    dateOfBirth: zod.string().nonempty("Date of birth is required"),

    gender: zod.enum(["male", "female"]),
  })
  .refine(({ password, rePassword }) => password === rePassword, {
    error: "Confirm password does not match the password",
    path: ["rePassword"],
  });

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isExisting, setIsExisting] = useState(false);

  function goToLogin() {
    setIsExisting(true);
    
    // setTimeout(() => {
    //   navigate("/login");
    // }, 400 );
    navigate("/login");
  }

  // Custom hook from react-hook-form to manage form state and validation
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    watch,
    control,
  } = useForm({
    defaultValues: {
      // Put the default values for the form fields
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    mode: "all", // Validate on all events (change, blur, submit)
    resolver: zodResolver(schema), // Use zod schema for validation
  });
  // console.log(errors);

  async function sendUserRegister(object) {
    // Without zod
    /* if (e.password !== e.rePassword) {
      setError("rePassword", {
        message: "Confirm password does not match the password",
      });
    } else {
      console.log(e);
      // Call the API to register the user
    } */
    // console.log(object);
    // console.log(`${import.meta.env.VITE_BASE_URL}users/signup`);

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}users/signup`,
        object,
      );
      // console.log(response);
      setIsLoading(false);
      toast.success("Your account has been created successfully");
      goToLogin();
    } catch (error) {
      toast.error(error.response.data.error);
      setIsLoading(false);
      // console.log(error.response.data.error);
    }
  }

  return (
    <div
      className={`min-h-screen grid grid-cols-1 lg:grid-cols-2 transition-opacity duration-0 ease-in-out ${isExisting ? "opacity-0" : "opacity-100"}`}
    >
      <section
        className="bg-cover bg-center relative before:absolute before:inset-0 before:bg-blue-600/75 dark:before:bg-gray-900/75 transition-colors duration-400 ease-in-out p-8"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="relative z-10 ">
          <div>
            <h1 className="text-white flex items-center gap-2">
              <NavLink
                to="/login"
                className="text-lg font-bold size-12 flex justify-center items-center bg-white/40 border border-white/30 rounded-xl"
              >
                S
              </NavLink>
              <span className="text-3xl font-bold">SocialHub</span>
            </h1>

            <h2 className="text-white text-5xl my-4 lg:my-10 xl:my-16 font-bold">
              Conncet with <br />
              <span className="bg-linear-to-r from-cyan-300 to-cyan-100 bg-clip-text text-transparent">
                amazing people
              </span>
            </h2>

            <p className="text-white mt-4 text-lg">
              Join millions of users sharing moments, ideas, and building
              meaningful connections every day
            </p>
          </div>

          <div className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 rounded-xl bg-white/20 text-white border border-white/30 px-4 py-2 hover:scale-105 transition-transform duration-300 backdrop-blur-lg">
                  <div className="size-10 flex justify-center items-center rounded-xl bg-teal-400/20 text-green-300">
                    <i className="fa-solid fa-message"></i>
                  </div>

                  <div>
                    <h3>Real-time Chat</h3>
                    <p>Instant messaging</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-white/20 text-white border border-white/30 px-4 py-2 hover:scale-105 transition-transform duration-300 backdrop-blur-lg">
                  <div className="size-10 flex justify-center items-center rounded-xl bg-blue-400/20 text-blue-200">
                    <i className="fa-solid fa-image"></i>
                  </div>
                  <div>
                    <h3>Share Media</h3>
                    <p>Photos & videos</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 rounded-xl bg-white/20 text-white border border-white/30 px-4 py-2 hover:scale-105 transition-transform duration-300 backdrop-blur-lg">
                  <div className="size-10 flex justify-center items-center rounded-xl bg-pink-400/20 text-pink-200">
                    <i className="fa-solid fa-bell"></i>
                  </div>
                  <div>
                    <h3>Smart Alerts</h3>
                    <p>Stay updated</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-white/20 text-white border border-white/30 px-4 py-2 hover:scale-105 transition-transform duration-300 backdrop-blur-lg">
                  <div className="size-10 flex justify-center items-center rounded-xl bg-teal-400/20 text-green-300">
                    <i className="fa-solid fa-users"></i>
                  </div>
                  <div>
                    <h3>Communities</h3>
                    <p>Find your tribe</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-5 md:gap-8 items-center my-8 md:my-12 lg:my-16">
            <div className="flex flex-col gap-1 text-white">
              <div className="flex gap-2 items-center">
                <i className="fa-solid fa-users"></i>
                <h3 className="text-2xl font-bold">2M+</h3>
              </div>
              <h3 className="text-lg text-center">Active Users</h3>
            </div>

            <div className="flex flex-col gap-1 text-white">
              <div className="flex gap-2 items-center">
                <Heart size="25" variant="Bold" />
                <h3 className="text-2xl font-bold">10M+</h3>
              </div>
              <h3 className="text-lg text-center">Posts Shared</h3>
            </div>

            <div className="flex flex-col gap-1 text-white">
              <div className="flex gap-2 items-center">
                <i className="fa-solid fa-message"></i>
                <h3 className="text-2xl font-bold">50M+</h3>
              </div>
              <h3 className="text-lg text-center">Message Sent</h3>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-white/20 text-white border border-white/30 p-5 hover:bg-white/30 transition-background duration-300 backdrop-blur-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-amber-200">
                <i className="fa-solid fa-star"></i>
              </span>
              <span className="text-amber-200">
                <i className="fa-solid fa-star"></i>
              </span>
              <span className="text-amber-200">
                <i className="fa-solid fa-star"></i>
              </span>
              <span className="text-amber-200">
                <i className="fa-solid fa-star"></i>
              </span>
              <span className="text-amber-200">
                <i className="fa-solid fa-star"></i>
              </span>
            </div>

            <p className="text-md italic">
              "SocialHub has completely changed how I connect with friends and
              discover new communities. The experience is seamless!"
            </p>

            <div className="flex items-center gap-3 mt-4">
              <div className="size-15 rounded-full border-2 border-white/50">
                <img
                  src={image}
                  className="w-full rounded-full "
                  alt="El-Sayed Mokdam"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="text-md font-semibold text-white">
                  El-Sayed Mokdam
                </h2>
                <p className="text-sm text-white/70">Product Designer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 dark:bg-gray-800 p-8 text-white transition-colors duration-400 ease-in-out">
        <div className="max-w-lg  mx-auto mt-10 bg-white p-4 md:p-8 rounded-2xl shadow-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:shadow-white/10 transition-colors duration-400 ease-in-out">
          <div className="text-center text-gray-800 dark:text-white transition-colors duration-400 ease-in-out">
            <h1 className="text-2xl font-bold mb-2">Create account</h1>
            <p>
              Already have an account?{" "}
              <button
                type="button"
                onClick={goToLogin}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Login
              </button>
            </p>
          </div>

          <div className="mt-5 flex gap-2 items-center">
            <div className="flex-1 border border-gray-300 dark:border-gray-600 text-center py-2 rounded-xl text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-400 ease-in-out">
              <span className="text-red-500 dark:text-white transition-colors duration-300 ease-in-out">
                <i className="fa-brands fa-google"></i>
              </span>
              <span className="ms-2">Google</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400">or</p>
            <div className="flex-1 text-center py-2 rounded-xl text-white bg-blue-500 dark:bg-gray-600 hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-400 ease-in-out">
              <span>
                <i className="fa-brands fa-facebook-f"></i>
              </span>
              <span className="ms-2">Facebook</span>
            </div>
          </div>

          <p className="my-5 text-gray-500 dark:text-gray-400 transition-colors duration-300 text-center text-sm relative before:absolute before:left-0 before:top-1/2 before:w-[30%] before:h-px before:bg-linear-to-r before:from-transparent before:via-gray-300 before:to-transparent dark:before:bg-gray-600 before:rounded-4xl before:-translate-y-1/2 after:absolute after:right-0 after:top-1/2 after:w-[30%] after:h-px after:bg-linear-to-l after:from-transparent after:via-gray-300 after:to-transparent dark:after:bg-gray-600 after:-translate-y-1/2">
            or continue with email
          </p>

          <Form onSubmit={handleSubmit(sendUserRegister)}>
            {/* Full Name */}
            <Input
              {...register("name")}
              /* {...register("name", {
                required: { value: true, message: "Name is required" },
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Name must be less than 20 characters",
                },
                pattern: {
                  value: /^[a-zA-Z][a-zA-Z ]{2,20}$/,
                  message: "Please enter a valid username",
                },
              })} */
              // if error exist for name field, then isInvalid will be true and errorMessage will be the error message for name field
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
              label="Full Name"
              labelPlacement="outside"
              autoComplete="off"
              placeholder="Enter your full name"
              type="text"
              startContent={
                <i className="fa-solid fa-user text-default-400"></i>
              }
              classNames={{
                inputWrapper: `${errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-600 transition-colors duration-400 ease-in-out"} py-7 border-2 rounded-xl`,
                input:
                  "caret-black dark:caret-white transition-colors duration-400 ease-in-out",
                label:
                  "text-gray-800 dark:text-white pb-2 transition-colors duration-400 ease-in-out",
              }}
            />

            {/* Email */}
            <Input
              {...register("email")}
              /* {...register("email", {
                required: { value: true, message: "Email is required" },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email",
                },
              })} */
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
              label="Email Addrees"
              labelPlacement="outside"
              autoComplete="new-email"
              placeholder="name@example.com"
              type="email"
              startContent={
                <i className="fa-solid fa-envelope text-default-400"></i>
              }
              classNames={{
                inputWrapper: `${errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600 transition-colors duration-400 ease-in-out"} py-7 border-2 rounded-xl`,
                input:
                  "caret-black dark:caret-white transition-colors duration-400 ease-in-out",
                label:
                  "text-gray-800 dark:text-white pb-2 transition-colors duration-400 ease-in-out",
              }}
            />

            {/* Password */}
            <Input
              {...register("password")}
              /* {...register("password", {
                required: { value: true, message: "Password is required" },
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Password must be less than 20 characters",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/,
                  message:
                    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                },
              })} */
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              label="Password"
              labelPlacement="outside"
              autoComplete="off"
              placeholder="Create a strong password"
              type="password"
              startContent={
                <i className="fa-solid fa-lock text-default-400"></i>
              }
              classNames={{
                inputWrapper: `${errors.password ? "border-red-500" : "border-gray-300 dark:border-gray-600 transition-colors duration-400 ease-in-out"} py-7 border-2 rounded-xl`,
                input:
                  "caret-black dark:caret-white transition-colors duration-400 ease-in-out",
                label:
                  "text-gray-800 dark:text-white pb-2 transition-colors duration-400 ease-in-out",
              }}
            />

            {/* Confirm Password */}
            <Input
              {...register("rePassword")}
              /* {...register("rePassword", {
                validate: (value) => {
                  return value === watch("password")
                    ? true
                    : "Confirm password does not match the password";
                },
              })} */
              isInvalid={!!errors.rePassword}
              errorMessage={errors.rePassword?.message}
              label="Confirm Password"
              labelPlacement="outside"
              autoComplete="off"
              placeholder="Confirm your password"
              type="password"
              startContent={
                <i className="fa-solid fa-lock text-default-400"></i>
              }
              classNames={{
                inputWrapper: `${errors.rePassword ? "border-red-500" : "border-gray-300 dark:border-gray-600 transition-colors duration-400 ease-in-out"} py-7 border-2 rounded-xl`,
                input:
                  "caret-black dark:caret-white transition-colors duration-400 ease-in-out",
                label:
                  "text-gray-800 dark:text-white pb-2 transition-colors duration-400 ease-in-out",
              }}
            />

            <Controller
              name="dateOfBirth"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <DatePicker
                  label="Birth date"
                  value={field.value ? parseDate(field.value) : null}
                  onChange={(date) => {
                    field.onChange(date ? date.toString() : null);
                  }}
                  isInvalid={!!errors.dateOfBirth}
                  errorMessage={errors.dateOfBirth?.message}
                />
              )}
            />

            {/* <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Birth date"
                  labelPlacement="outside"
                  onChange={(date) => field.onChange(date?.toString() ?? null)}
                  isInvalid={!!errors.dateOfBirth}
                  errorMessage={errors.dateOfBirth?.message}
                  classNames={{
                    inputWrapper: `${
                      errors.dateOfBirth
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } py-7 border-2 rounded-xl`,
                    input:
                      "caret-black dark:caret-white transition-colors duration-400 ease-in-out",
                  }}
                />
              )}
            /> */}

            {/* Component from react-hook-form to control an element (Gender select option) */}
            <Controller
              name="gender"
              control={control}
              /* rules={{
                required: "Gender is required",
              }} */
              render={({ field }) => {
                return (
                  <Select
                    label="Gender"
                    labelPlacement="outside"
                    placeholder="Select a gender"
                    {...field}
                    isInvalid={!!errors.gender}
                    errorMessage={errors.gender?.message}
                    startContent={
                      <i className="fa-solid fa-venus-mars text-default-400"></i>
                    }
                    classNames={{
                      trigger: `${errors.gender ? "border-red-500" : "border-gray-300 dark:border-gray-600 transition-colors duration-400 ease-in-out"} py-7 border-2 rounded-xl`,
                      value:
                        "caret-black dark:caret-white transition-colors duration-400 ease-in-out",
                      label: "text-gray-800 dark:text-white pb-2",
                    }}
                    selectedKeys={[field.value]}
                  >
                    {/* {console.log(field)} */}
                    <SelectItem key="male">Male</SelectItem>
                    <SelectItem key="female">Female</SelectItem>
                  </Select>
                );
              }}
            />

            <div className="flex flex-col w-full gap-2">
              <Button
                className={`font-bold bg-blue-600 text-white dark:bg-gray-500 transition-colors duration-400 ease-in-out ${
                  isLoading ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                type="submit"
                isLoading={isLoading}
              >
                Create Account{" "}
                <span>
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
              </Button>
              <Button
                className="font-bold bg-gray-300 dark:bg-gray-600"
                type="reset"
                variant="flat"
              >
                Reset
              </Button>
            </div>
          </Form>
        </div>
      </section>
    </div>
  );
}
