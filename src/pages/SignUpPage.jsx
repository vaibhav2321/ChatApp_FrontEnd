import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Corrected import
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Lock, Mail, MessageSquare, User } from 'lucide-react';
import AuthImagePattern from '../components/AuthImagePattern';
import toast from 'react-hot-toast';

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
    });

    const { signUp, isSigningUp } = useAuthStore();

    const validateForm = () => {
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        console.log("asdfa",formData);
        

        if( !formData.fullname.trim()) return toast.error("Full Name is required.");
        if( !formData.email.trim()) return toast.error("Email is required.");
        if( !emailRegex.test(formData.email)) return toast.error("Invalid email format.")
        if( !formData.password.trim()) return toast.error("Password is required.");
        if( formData.password.length < 6) return toast.error("Password must be at least 6 characters.")

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = validateForm();

        if(success == true){
            signUp(formData)
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left side */}
            <div className="flex flex-col justify-center items-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    {/* LOGO */}
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <MessageSquare className="size-6 text-primary" />
                            </div>
                            <h1 className="text-2xl font-bold mt-2">Create Account</h1>
                            <p className="text-base-content/60">
                                Get started with your free account
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Full Name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Full Name</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    type="text"
                                    className="input input-bordered w-full pl-10"
                                    placeholder="John Doe"
                                    value={formData.fullname}
                                    onChange={(e) =>
                                        setFormData({ ...formData, fullname: e.target.value })
                                    }
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    type="text"
                                    className="input input-bordered w-full pl-10"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="input input-bordered w-full pl-10"
                                    placeholder="**********"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                    }
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="size-5 text-base-content/40" />
                                    ) : (
                                        <Eye className="size-5 text-base-content/40" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className={`btn btn-primary w-full ${isSigningUp && 'loading'}`}
                        >
                            {isSigningUp ? 'Signing Up...' : 'Sign Up'}
                        </button>

                        {/* Redirect to Login */}
                        <div className="text-center">
                            <p className="text-base-content/60">
                                Already have an account?{' '}
                                <Link to="/login" className="link link-primary">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <AuthImagePattern
                title="Join our community"
                subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
            />
        </div>
    );
};

export default SignUpPage;
