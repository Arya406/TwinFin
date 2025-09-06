import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';


const LoginForm = ({ onSubmit, isLoading }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      // Mock authentication - check against predefined credentials
      if (formData?.email === 'demo@facetwin.com' && formData?.password === 'demo123') {
        onSubmit(formData);
        navigate('/photo-upload');
      } else {
        setErrors({ 
          email: 'Invalid credentials. Use demo@facetwin.com / demo123',
          password: 'Invalid credentials. Use demo@facetwin.com / demo123'
        });
      }
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
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
        
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={handleChange}
          error={errors?.password}
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          name="rememberMe"
          checked={formData?.rememberMe}
          onChange={handleChange}
        />
        
        <button
          type="button"
          className="text-sm text-primary hover:text-primary/80 transition-colors duration-200"
          onClick={() => {
            // Mock forgot password functionality
            alert('Password reset link would be sent to your email');
          }}
        >
          Forgot password?
        </button>
      </div>
      <Button
        type="submit"
        variant="default"
        size="lg"
        loading={isLoading}
        iconName="LogIn"
        iconPosition="right"
        className="w-full"
      >
        Sign In
      </Button>
      <div className="text-center">
        <p className="text-sm text-text-secondary">
          Demo credentials: demo@facetwin.com / demo123
        </p>
      </div>
    </form>
  );
};

export default LoginForm;