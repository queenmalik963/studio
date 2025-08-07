import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'em-content.zobj.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
// src/app/signup/page.tsx
"use client";

import React, { useState } from "react";
import { signUpWithEmail } from "@/services/authService";

const SignupPage = () => {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
      const [error, setError] = useState<string | null>(null);
        const [success, setSuccess] = useState(false);

          const handleSignUp = async (e: React.FormEvent) => {
              e.preventDefault();

                  const result = await signUpWithEmail(email, password);

                      if (!result.success) {
                            setError(result.error);
                                  setSuccess(false);
                                      } else {
                                            setError(null);
                                                  setSuccess(true);
                                                      }
                                                        };

                                                          return (
                                                              <div style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}>
                                                                    <h2>Sign Up</h2>
                                                                          <form onSubmit={handleSignUp}>
                                                                                  <input
                                                                                            type="email"
                                                                                                      placeholder="Email"
                                                                                                                value={email}
                                                                                                                          onChange={(e) => setEmail(e.target.value)}
                                                                                                                                    required
                                                                                                                                              style={{ width: "100%", padding: 8, marginBottom: 10 }}
                                                                                                                                                      />
                                                                                                                                                              <input
                                                                                                                                                                        type="password"
                                                                                                                                                                                  placeholder="Password"
                                                                                                                                                                                            value={password}
                                                                                                                                                                                                      onChange={(e) => setPassword(e.target.value)}
                                                                                                                                                                                                                required
                                                                                                                                                                                                                          style={{ width: "100%", padding: 8, marginBottom: 10 }}
                                                                                                                                                                                                                                  />
                                                                                                                                                                                                                                          <button type="submit" style={{ padding: 10, width: "100%" }}>
                                                                                                                                                                                                                                                    Create Account
                                                                                                                                                                                                                                                            </button>
                                                                                                                                                                                                                                                                  </form>

                                                                                                                                                                                                                                                                        {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
                                                                                                                                                                                                                                                                              {success && <p style={{ color: "green", marginTop: 10 }}>Signup successful!</p>}
                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                                                                    };

                                                                                                                                                                                                                                                                                    export default SignupPage;