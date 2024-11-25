import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "./Textbox";
import Loading from "./Loader";
import Button from "./Button";
import { useCreateUserMutation } from "../redux/auth/authApi";

const AddUser = ({ open, setOpen, userData }) => {
  let defaultValues = userData ?? {};  // Set the default form values to userData if it exists
  const { user } = useSelector((state) => state.auth);

  const [createUser, { isLoading, isError, isSuccess, error }] = useCreateUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  // Handle form submission
  const handleOnSubmit = async (data) => {
    try {
      await createUser(data).unwrap();  // This triggers the createUser mutation with the form data
      setOpen(false); // Close modal after successful submission
    } catch (err) {
      // Handle error (e.g. show error messages)
      console.error("Failed to create user:", err);
    }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
          <Dialog.Title
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4'
          >
            {userData ? "UPDATE PROFILE" : "ADD NEW USER"}
          </Dialog.Title>
          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder='Full name'
              type='text'
              name='name'
              label='Full Name'
              className='w-full rounded'
              register={register("name", {
                required: "Full name is required!",
              })}
              error={errors.name ? errors.name.message : ""}
            />
            <Textbox
              placeholder='Title'
              type='text'
              name='title'
              label='Title'
              className='w-full rounded'
              register={register("title", {
                required: "Title is required!",
              })}
              error={errors.title ? errors.title.message : ""}
            />
            <Textbox
              placeholder='Email Address'
              type='email'
              name='email'
              label='Email Address'
              className='w-full rounded'
              register={register("email", {
                required: "Email Address is required!",
              })}
              error={errors.email ? errors.email.message : ""}
            />

            <Textbox
              placeholder='Role'
              type='text'
              name='role'
              label='Role'
              className='w-full rounded'
              register={register("role", {
                required: "User role is required!",
              })}
              error={errors.role ? errors.role.message : ""}
            />
          </div>

          {/* Loading indicator or form actions */}
          {isLoading ? (
            <div className='py-5'>
              <Loading />
            </div>
          ) : (
            <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
              <Button
                type='submit'
                className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto'
                label='Submit'
              />

              <Button
                type='button'
                className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                onClick={() => setOpen(false)}
                label='Cancel'
              />
            </div>
          )}

          {/* Show error message if mutation fails */}
          {isError && (
            <div className="text-red-500 mt-4">
              {error?.data?.message || "An error occurred while creating the user."}
            </div>
          )}

          {/* Show success message if mutation succeeds */}
          {isSuccess && (
            <div className="text-green-500 mt-4">
              User created successfully!
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddUser;
