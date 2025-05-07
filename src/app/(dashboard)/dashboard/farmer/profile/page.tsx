'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ProfileFormValues, profileSchema } from '@/zod_schema/schema';
import { UseUserUpdateProfile } from '@/hooks/useUpdateProfile';
import { useDispatch } from 'react-redux';
import { addToast } from '@/lib/store/slices/toastSlice';
import Spinner from '@/app/components/Loader';

const Profile = () => {
  const dispatch = useDispatch();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const updateProfileMutation = UseUserUpdateProfile();
  const onSubmit = (data: ProfileFormValues) => {
    updateProfileMutation.mutate(data, {
      onSuccess: () => {
        dispatch(addToast({ message: 'Profile updated successfully', type: 'success' }));
        form.reset();
      },
      onError: (error) => {
        dispatch(addToast({ message: error.message, type: 'error' }));
      },
    });
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Profile Settings</h1>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="shadow-md">
          <CardContent className="space-y-4 p-6">
            <div>
              <Label>Name</Label>
              <Input {...form.register('username')} placeholder="Your Name" />
              {form.formState.errors.username && (
                <p className="text-red-500 text-sm">{form.formState.errors.username.message}</p>
              )}
            </div>

            <div>
              <Label>Email</Label>
              <Input type="email" {...form.register('email')} placeholder="you@example.com" />
              {form.formState.errors.email && (
                <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <Label>Password</Label>
              <Input {...form.register('password')} placeholder="******" />
              {form.formState.errors.password && (
                <p className="text-red-500 text-sm">{form.formState.errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full mt-4 cursor-pointer bg-green-300">{updateProfileMutation.isPending ? <Spinner /> : 'Save Profile'}</Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default Profile;
