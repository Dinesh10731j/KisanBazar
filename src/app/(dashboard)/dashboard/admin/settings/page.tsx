'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SettingsFormData,adminSettingSchema } from '@/zod_schema/schema';
const Settings = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(adminSettingSchema),
  });

  const onSubmit = (data: SettingsFormData) => {
    console.log('Form data:', data);
    
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Settings</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="shadow-md">
          <CardContent className="p-6 space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Name</label>
              <Input placeholder="Enter your name" {...register('adminName')} />
              {errors.adminName && (
                <p className="text-red-500 text-sm mt-1">{errors.adminName.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <Input placeholder="Enter your email" {...register('email')} />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Phone Number</label>
              <Input placeholder="Enter your password" {...register('password')} />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full mt-4">Save Settings</Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default Settings;
