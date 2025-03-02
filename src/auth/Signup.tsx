import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:3005/api/auth/register";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<SignUpFormData>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: SignUpFormData) => {
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, role: "customer" }), // Default role
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed");
      }

      toast.success("Account created successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create an Account</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="w-full p-2 border rounded-md"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full p-2 border rounded-md"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required", minLength: 8 })}
            className="w-full p-2 border rounded-md"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) => value === watch("password") || "Passwords do not match",
            })}
            className="w-full p-2 border rounded-md"
          />
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
