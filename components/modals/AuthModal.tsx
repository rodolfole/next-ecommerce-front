"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

import Modal from "@/components/ui/Modal";
import useAuthModal from "@/hooks/useAuthModal";
import Button from "../ui/Button";
import Input from "../ui/Input";

const AuthModal = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, onClose, setType, type] = useAuthModal((state) => [
    state.isOpen,
    state.onClose,
    state.setType,
    state.type,
  ]);
  const authTitle = type === "Login" ? "in" : "up";
  const authSubtitleLink = type === "Login" ? "up" : "in";
  const authSubtitle =
    type === "Login"
      ? "Don't have an account yet?"
      : "Already have an account?";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      confirm_password: "",
      email: "",
      name: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (type === "Register") {
      setIsLoading(true);

      const { confirm_password, ...credentials } = data;

      axios
        .post("/api/register", credentials)
        .then(() => {
          toast.success("Registered!");
          signIn("credentials", {
            ...credentials,
            redirect: false,
          });
          onClose();
        })
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(true);

      const { confirm_password, name, ...credentials } = data;

      signIn("credentials", {
        ...credentials,
        redirect: false,
      }).then((callback) => {
        setIsLoading(false);

        if (callback?.ok) {
          toast.success("Logged in");
          router.refresh();
          onClose();
        }

        if (callback?.error) {
          toast.error(callback.error);
        }
      });
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="w-80">
        <div className="text-center">
          <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
            Sign {authTitle}
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {authSubtitle}
            <p
              className="text-blue-600 decoration-2 hover:underline font-medium cursor-pointer"
              onClick={() => setType(type === "Login" ? "Register" : "Login")}
            >
              Sign {authSubtitleLink} here
            </p>
          </p>
        </div>

        <div className="mt-5">
          <Button onClick={() => signIn("google")}>
            <FcGoogle className="h-4 w-4" />
            Sign {type === "Login" ? "in" : "up"} with Google
          </Button>

          <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
            Or
          </div>

          <div className="grid gap-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm mb-2 dark:text-white"
              >
                Email address
              </label>
              <div className="relative">
                <Input
                  errors={errors}
                  id="email"
                  name="email"
                  register={register}
                  required
                  type="email"
                />
              </div>
            </div>

            {type === "Register" && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm mb-2 dark:text-white"
                >
                  Name
                </label>
                <div className="relative">
                  <Input
                    errors={errors}
                    id="name"
                    name="name"
                    register={register}
                    required
                    type="text"
                  />
                </div>
              </div>
            )}

            <div>
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="block text-sm mb-2 dark:text-white"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <Input
                  errors={errors}
                  id="password"
                  name="password"
                  register={register}
                  required
                  type="password"
                />
              </div>
            </div>
            {type === "Register" && (
              <div>
                <label
                  htmlFor="confirm_password"
                  className="block text-sm mb-2 dark:text-white"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    errors={errors}
                    id="confirm_password"
                    name="confirm_password"
                    register={register}
                    required
                    type="password"
                  />
                </div>
              </div>
            )}

            <Button disabled={isLoading} onClick={handleSubmit(onSubmit)}>
              Sign {authTitle}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AuthModal;
