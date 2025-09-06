import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';


const SignupForm = ({ onSubmit, isLoading }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData?.fullName?.trim()?.length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/?.test(formData?.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      navigate('/photo-upload');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const getPasswordStrength = () => {
    const password = formData?.password;
    if (!password) return { strength: 0, label: '' };
    
    let strength = 0;
    if (password?.length >= 8) strength++;
    if (/[a-z]/?.test(password)) strength++;
    if (/[A-Z]/?.test(password)) strength++;
    if (/\d/?.test(password)) strength++;
    if (/[^a-zA-Z\d]/?.test(password)) strength++;
    
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['bg-error', 'bg-warning', 'bg-warning', 'bg-success', 'bg-success'];
    
    return {
      strength,
      label: labels?.[strength - 1] || '',
      color: colors?.[strength - 1] || 'bg-muted'
    };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          value={formData?.fullName}
          onChange={handleChange}
          error={errors?.fullName}
          required
        />
        
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData?.email}
          onChange={handleChange}
          error={errors?.email}
          required
        />
        
        <div>
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Create a strong password"
            value={formData?.password}
            onChange={handleChange}
            error={errors?.password}
            required
          />
          
          {formData?.password && (
            <div className="mt-2">
              <div className="flex items-center space-x-2 mb-1">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${passwordStrength?.color}`}
                    style={{ width: `${(passwordStrength?.strength / 5) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-text-secondary">
                  {passwordStrength?.label}
                </span>
              </div>
              <p className="text-xs text-text-secondary">
                Use 8+ characters with uppercase, lowercase, and numbers
              </p>
            </div>
          )}
        </div>
        
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData?.confirmPassword}
          onChange={handleChange}
          error={errors?.confirmPassword}
          required
        />
      </div>
      <div className="space-y-4">
        <Checkbox
          label="I agree to the Terms of Service and Privacy Policy"
          name="agreeToTerms"
          checked={formData?.agreeToTerms}
          onChange={handleChange}
          error={errors?.agreeToTerms}
          required
        />
      </div>
      <Button
        type="submit"
        variant="default"
        size="lg"
        loading={isLoading}
        iconName="UserPlus"
        iconPosition="right"
        className="w-full"
      >
        Create Account
      </Button>
      <div className="text-center">
        <p className="text-xs text-text-secondary">
          By signing up, you agree to our data protection practices and SSL encryption
        </p>
      </div>
    </form>
  );
};

export default SignupForm;