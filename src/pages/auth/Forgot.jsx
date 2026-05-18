import { NavLink } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Alert from "../../components/Alert";

export default function Forgot() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-10">
      <h2 className="text-3xl font-bold text-center text-gray-700">Forgot Password</h2>
      <p className="text-center text-gray-400 mt-2 mb-8">
        Enter your email to reset your password
      </p>

      <Alert variant="info" className="mb-6">
        Link reset password akan dikirim ke email kamu dalam beberapa menit.
      </Alert>

      <form>
        <div className="mb-6">
          <Input
            label="Email Address"
            type="email"
            placeholder="Your email address"
            icon={<FaEnvelope />}
            required
          />
        </div>

        <Button type="submit" className="w-full" size="lg">
          SEND RESET LINK
        </Button>
      </form>

      <p className="text-center text-gray-500 text-sm mt-6">
        Ingat password?{" "}
        <NavLink to="/login" className="text-cyan-400 font-semibold hover:underline">
          Sign in
        </NavLink>
      </p>
    </div>
  );
}
