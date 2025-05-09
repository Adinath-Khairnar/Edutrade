/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MotionWrapper from "../MotionWrapper/MotionWrapper";

export default function About() {
  const githubUsernames = ["deepakchavan18", "user2", "user3", "user4"]; // Replace with actual usernames
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchGithubData = async () => {
      const userData = await Promise.all(
        githubUsernames.map(async (username) => {
          const response = await fetch(
            `https://api.github.com/users/${username}`
          );
          return response.json();
        })
      );
      setUsers(userData);
    };
    fetchGithubData();
  }, []);

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <MotionWrapper>
        <div className="bg-gradient-to-b from-white to-gray-100 pb-16 pt-10">
        <h2 className="text-2xl font-bold text-gray-900 text-center">About Us</h2>

      <div className="container m-auto px-6 text-gray-800 md:px-12 xl:px-6">
        {/* Hero Section */}
        <motion.div
          className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="md:w-5/12 lg:w-5/12" variants={itemVariants}>
            <img
              src="https://i.ibb.co/T1RNwPh/pngtree-start-up-team-working-flat-design-style-png-image-5870928-transparent-Craiyon.png"
              alt="team"
              className="rounded-lg shadow-sm transform hover:scale-105 transition-transform duration-300"
            />
          </motion.div>
          <motion.div className="md:w-7/12 lg:w-6/12" variants={itemVariants}>
            <h2 className="text-3xl text-gray-900 font-bold md:text-5xl mb-4">
              EduTrade
            </h2>
            <h3 className="text-2xl text-gray-700 font-bold md:text-3xl mb-6">
              Simplifying Educational Resource Exchange for Students
            </h3>
            <p className="text-gray-600 text-lg mb-6">
              EduTrade is a platform dedicated to simplifying the exchange of
              educational resources. Whether you're looking to buy, rent, or
              sell textbooks, notes, or past question papers, EduTrade empowers
              students to access materials they need in an affordable and
              efficient way. Our goal is to foster a collaborative learning
              environment where resources are easily accessible for everyone.
            </p>
            <p className="text-gray-600 text-lg">
              <span className="font-semibold text-xl">Why EduTrade?</span>{" "}
              Traditional methods of acquiring educational materials can be
              costly and time-consuming. EduTrade provides a solution by
              creating a marketplace where students can exchange resources
              directly. This saves both time and money, while also promoting a
              sustainable practice of reusing valuable educational materials.
            </p>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.hr
          className="h-px mx-20 my-12 bg-gray-300 border-0"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* GitHub Profiles Section */}
        <MotionWrapper>
            <div className="bg-gradient-to-b from-white to-gray-100 pb-16 pt-10">
              <div className="container m-auto px-6 text-gray-800 md:px-12 xl:px-6">
                <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
                  Meet The Team
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                  {users.map((user, index) => (
                    <div
                      key={index}
                      className="bg-white shadow-xl rounded-lg p-6 text-center border border-gray-200 transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                    >
                      <div className="relative w-full flex justify-center">
                        <img
                          className="rounded-full border-4 border-gray-600 w-24 h-24 mb-4"
                          src={user.avatar_url}
                          alt={user.login}
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{user.name || user.login}</h3>
                      <p className="text-gray-600 text-sm"><strong>Role:</strong> Web Developer</p>
                      <p className="text-gray-600 text-sm"><strong>Location:</strong> {user.location || "Not Available"}</p>
                      <p className="text-gray-600 text-sm"><strong>Bio:</strong> {user.bio || "No bio available"}</p>
                      <p className="text-gray-600 text-sm">
                        <strong>Blog:</strong> {user.blog ? (
                          <a className="text-blue-500 hover:text-blue-800" href={user.blog} target="_blank" rel="noopener noreferrer">
                            {user.blog}
                          </a>
                        ) : "Not Available"}
                      </p>
                      <a
                        className="text-blue-500 hover:text-blue-800 block mt-4 font-semibold"
                        href={user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Profile
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
        </MotionWrapper>
      </div>
    </div>
    </MotionWrapper>
    
  );
}
