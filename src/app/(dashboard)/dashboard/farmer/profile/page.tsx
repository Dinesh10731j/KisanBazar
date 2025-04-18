'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ProfileFormValues,profileSchema } from '@/zod_schema/schema';

const Profile = () => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    console.log('Profile data:', data);
    // Save logic here (API call etc.)
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Profile Settings</h1>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="shadow-md">
          <CardContent className="space-y-4 p-6">
            <div>
              <Label>Name</Label>
              <Input {...form.register('name')} placeholder="Your Name" />
              {form.formState.errors.name && (
                <p className="text-red-500 text-sm">{form.formState.errors.name.message}</p>
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
              <Label>Phone</Label>
              <Input {...form.register('password')} placeholder="98XXXXXXXX" />
              {form.formState.errors.password && (
                <p className="text-red-500 text-sm">{form.formState.errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full mt-4">Save Profile</Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default Profile;
