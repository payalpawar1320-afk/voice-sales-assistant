import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo from "@/assets/logo.jpg";
import { toast } from "sonner";

export default function Auth() {
  const [searchParams] = useSearchParams();
  const [isSignup, setIsSignup] = useState(searchParams.get("mode") === "signup");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(isSignup ? "Account created!" : "Welcome back!");
      navigate("/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 font-bold text-2xl mb-2">
            <img src={logo} alt="VoxaFlow" className="h-9 w-9 rounded-lg object-cover" />
            VoxaFlow
          </Link>
          <p className="text-muted-foreground text-sm">
            {isSignup ? "Create your account to get started" : "Welcome back, sign in to continue"}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-8 shadow-elevated">
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <>
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="Juan dela Cruz" required className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+63 912 345 6789" required className="mt-1.5" />
                </div>
              </>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" required className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" required className="mt-1.5" />
            </div>
            <Button type="submit" className="w-full gradient-primary border-0 h-11" disabled={loading}>
              {loading ? "Please wait..." : isSignup ? "Create Account" : "Sign In"}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button onClick={() => setIsSignup(!isSignup)} className="text-primary font-medium hover:underline">
              {isSignup ? "Sign in" : "Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
