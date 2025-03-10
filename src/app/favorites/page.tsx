"use client"
import React from 'react';
import withAuth from '@/hoc/withAuth';

const Favorites = () => {
  return <div>Favorites Page - Protected</div>;
};

export default withAuth(Favorites);
