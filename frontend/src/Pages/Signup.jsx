import { useEffect, useState } from "react";
import { signupStyles as s } from "../assets/dummyStyles";
import { useAuth } from "../shared/AuthContext";
import { useNavigate } from "react-router-dom";

const stepList = [
  { id: 1, title: "Account" },
  { id: 2, title: "OTP" },
  { id: 3, title: "Profile" },
];

const signupHighlighligths = [
  "Step 1 collects student account details and checks immediately if the email already exists.",
  "Step 2 verifies the OTP before moving forward.",
  "Step 3 saves department, stream, semester, year, and roll number.",
];

const demoOtp = "2468";

const Signup = () => {
  const { registerStudent, completeProfileData, logout, verifyOtpCode } =
    useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    otp: "",
    role: "user",
    department: "",
    stream: "",
    semester: "Semester 1",
    academicYear: "1st Year",
    rollNumber: "",
  });

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  const hamdleChange = (event) => {
    const { name, value } = event.target;
    setError("");
    if (name == "phone") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
      setForm((current) => ({ ...current, [name]: digitsOnly }));
    } else {
      setForm((current) => ({
        ...current,
        [name]: value,
      }));
    }
  };

  return <div className={s.pageContainer}></div>;
};

export default Signup;
