import React from "react";
import MyVolunteerNeedPost from "./MyVolunteerNeedPost";
import MyVolunteerRequestPost from "./MyVolunteerRequestPost";
import { motion } from "framer-motion";
import useDynamicTitle from "../../hooks/useDynamicTitle";
console.log(motion);

const MyPosts = () => {
  useDynamicTitle("Dashboard")
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* My Volunteer Need Posts Section */}
      <section className="mb-12 p-6 bg-white rounded-2xl">
        <MyVolunteerNeedPost />
      </section>

      {/* My Volunteer Request Posts Section */}
      <section className="p-6 bg-white rounded-2xl">
        <MyVolunteerRequestPost />
      </section>
    </div>
  );
};

export default MyPosts;
