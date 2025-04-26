import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type Prop = {
  toggleLogin: () => void;
};

function Signup({ toggleLogin }: Prop) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormData>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: SignUpFormData) => {
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        name: data.name,
        email: data.email,
        password: data.password,
        role: "customer", // Default role
      });

      if (response.status !== 201) {
        throw new Error("Signup failed");
      }

      toast.success("Account created successfully! Redirecting to login...");
      setTimeout(() => navigate("/auth"), 2000);
    } catch (err: unknown) {
      const errorMessage =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to create account";
      alert(errorMessage)
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 md:mt-5 md:w-[80%]">
      <input
        type="text"
        {...register("name", { required: "Name is required" })}
        placeholder="Name"
        className="py-3 border-gray-400 border-b"
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

      <input
        type="email"
        {...register("email", { required: "Email is required" })}
        placeholder="Email"
        className="py-3 border-gray-400 border-b bg-white"
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <input
        type="password"
        {...register("password", { required: "Password is required", minLength: 8 })}
        placeholder="Password"
        className="py-3 border-gray-400 border-b"
      />
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}

      <input
        type="password"
        {...register("confirmPassword", {
          required: "Please confirm your password",
          validate: (value) => value === watch("password") || "Passwords do not match",
        })}
        placeholder="Confirm Password"
        className="py-3 border-gray-400 border-b"
      />
      {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}

      <button type="submit" className="bg-[#DB4444] rounded-md py-2 text-white" disabled={loading}>
        {loading ? "Creating Account..." : "Create Account"}
      </button>


      <p className="text-center">
        Already have an account? <span onClick={toggleLogin} className="cursor-pointer">Log In</span>
      </p>
    </form>
  );
}

export default Signup;
