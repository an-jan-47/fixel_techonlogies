import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  validation?: (value: string) => string | null;
  multiline?: boolean;
  rows?: number;
  className?: string;
}

export default function FormField({
  label,
  id,
  type = "text",
  value,
  onChange,
  required = false,
  placeholder,
  validation,
  multiline = false,
  rows = 3,
  className,
}: FormFieldProps) {
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (touched && validation) {
      const validationError = validation(value);
      setError(validationError);
      setIsValid(!validationError && value.length > 0);
    } else if (touched && required) {
      const hasError = value.length === 0;
      setError(hasError ? `${label} is required` : null);
      setIsValid(!hasError);
    }
  }, [value, touched, validation, required, label]);

  const handleBlur = () => {
    setTouched(true);
  };

  const inputType = type === "password" && showPassword ? "text" : type;

  const InputComponent = multiline ? Textarea : Input;

  return (
    <div className={cn("group relative", className)}>
      <Label
        htmlFor={id}
        className={cn(
          "text-sm font-medium transition-colors duration-200",
          touched && error
            ? "text-red-500"
            : touched && isValid
              ? "text-green-500"
              : "text-foreground group-hover:text-fixel-blue",
        )}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>

      <div className="relative mt-2">
        <InputComponent
          id={id}
          type={inputType}
          value={value}
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
          ) => onChange(e.target.value)}
          onBlur={handleBlur}
          rows={multiline ? rows : undefined}
          className={cn(
            "pr-10 transition-all duration-300",
            touched && error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
              : touched && isValid
                ? "border-green-500 focus:border-green-500 focus:ring-green-500/20"
                : "hover:border-fixel-blue/50 focus:border-fixel-blue focus:ring-fixel-blue/20",
          )}
        />

        {/* Status Icon */}
        <div className="absolute right-3 top-3 flex items-center">
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 mr-2"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          )}

          {touched && (
            <div className="animate-scale-in">
              {error ? (
                <AlertCircle className="w-4 h-4 text-red-500" />
              ) : isValid ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : null}
            </div>
          )}
        </div>

        {/* Animated underline */}
        <div
          className={cn(
            "absolute bottom-0 left-0 h-0.5 bg-gradient-to-r transition-all duration-300",
            touched && error
              ? "from-red-500 to-red-600 w-full"
              : touched && isValid
                ? "from-green-500 to-green-600 w-full"
                : "from-fixel-blue to-fixel-purple w-0 group-focus-within:w-full",
          )}
        />
      </div>

      {/* Error Message */}
      {touched && error && (
        <div className="mt-2 animate-slide-in-left">
          <p className="text-sm text-red-500 flex items-center">
            <AlertCircle className="w-3 h-3 mr-1" />
            {error}
          </p>
        </div>
      )}

      {/* Success Message */}
      {touched && isValid && !error && (
        <div className="mt-2 animate-slide-in-left">
          <p className="text-sm text-green-500 flex items-center">
            <CheckCircle className="w-3 h-3 mr-1" />
            Looks good!
          </p>
        </div>
      )}
    </div>
  );
}

// Validation functions
export const validationRules = {
  email: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return "Email is required";
    if (!emailRegex.test(value)) return "Please enter a valid email address";
    return null;
  },
  phone: (value: string) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (value && !phoneRegex.test(value.replace(/\s+/g, ""))) {
      return "Please enter a valid phone number";
    }
    return null;
  },
  required: (fieldName: string) => (value: string) => {
    if (!value || value.trim().length === 0) {
      return `${fieldName} is required`;
    }
    return null;
  },
  minLength: (min: number) => (value: string) => {
    if (value && value.length < min) {
      return `Must be at least ${min} characters long`;
    }
    return null;
  },
};
