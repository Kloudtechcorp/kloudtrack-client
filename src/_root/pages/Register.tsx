import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import bcrypt from "bcryptjs";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password: hashedPassword }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(data.message);
        // Handle successful registration (e.g., redirect or show success message)
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex w-full rounded-2xl dark:bg-secondary bg-[#F6F8FC]">
      <div className="w-full flex flex-row container">
        <div className="w-1/5 justify-center p-5"></div>
        <div className="w-3/4 p-5 flex flex-col justify-between">
          <div className="w-full">
            <div className="flex flex-col mb-10">
              <h1 className="text-3xl font-bold">Register here</h1>
              {error && <span className="text-red-500">{error}</span>}
              {success && <span className="text-green-500">{success}</span>}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <span>Username</span>
                  <Input
                    className="w-1/2"
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span>Password</span>
                  <Input
                    className="w-1/2"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {/* Uncomment this block if you want to add password confirmation
                <div className="flex flex-col gap-2">
                  <span>Confirm Password</span>
                  <Input
                    className="w-1/2"
                    type="password"
                    name="confirm_password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div> */}
              </div>
              <div className="flex flex-row gap-2 mt-8">
                <Button className="bg-red-300 hover:bg-red-400" type="button">
                  Cancel
                </Button>
                <Button className="bg-blue-300 hover:bg-blue-400" type="submit">
                  Register
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
