import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Reusable Card Component with Gradient Backgrounds and Animation
const Card = ({ title, children, icon, gradient }) => {
  return (
    <motion.div
      className={`p-6 bg-gradient-to-r ${gradient} text-white rounded-lg shadow-lg`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {icon && (
        <svg
          className="w-7 h-7 mb-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          {icon}
        </svg>
      )}
      <h5 className="mb-2 text-xl font-semibold tracking-tight">{title}</h5>
      <div>{children}</div>
    </motion.div>
  );
};

const Dashboard = ({user}) => {
    const router = useRouter();
    
    const [profile, setProfile] = useState({ name: '', subject: '' });
    useEffect(() => {
        if (!localStorage.getItem("myuser")) {
          router.push("/");
        }

        const getData = async () =>{
            const data = {user:user}
            let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getdashboardinfo`, {
                method: "POST", // or 'PUT'
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              });
              a = await a.json();
              if(!a.success){
                toast.error("An error occured while fetching data!", {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
              }
              setProfile({name: a.name, subject: a.subject})
        }
        getData();
      
      }, [router, user])

  const [assessment] = useState({
    initialScore: 70,
    currentScore: 85,
    targetScore: 90,
  });
  const [activities] = useState(["Completed Module 1", "Attended Workshop"]);
  const [feedback] = useState(["Great progress!", "Keep up the good work!"]);

  const data = [
    { name: 'Jan', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Feb', uv: 300, pv: 2210, amt: 2290 },
    { name: 'Mar', uv: 200, pv: 2290, amt: 2000 },
    { name: 'Apr', uv: 278, pv: 2000, amt: 2181 },
    { name: 'May', uv: 189, pv: 2181, amt: 2500 },
  ];

  return (
    <div className="p-5">
      {/* Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Profile Card */}
        <Card
          title="Profile"
          gradient="from-purple-500 to-indigo-500"
          icon={
            <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
          }
        >
          <p className="mb-2">Name: {profile.name}</p>
          <p>Subject: {profile.subject}</p>
        </Card>

        {/* Initial Assessment Card */}
        <Card
          title="Initial Assessment"
          gradient="from-pink-500 to-red-500"
        >
          <p className="mb-2">Initial Score: {assessment.initialScore}</p>
          <p className="mb-2">Current Score: {assessment.currentScore}</p>
          <p>Target Score: {assessment.targetScore}</p>
        </Card>

        {/* Recent Activities Card */}
        <Card
          title="Recent Activities"
          gradient="from-green-500 to-teal-500"
        >
          <ul className="list-disc pl-5 space-y-1">
            {activities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        </Card>

        {/* User Feedback Card */}
        <Card
          title="User Feedback"
          gradient="from-yellow-500 to-orange-500"
        >
          <ul className="list-disc pl-5 space-y-1">
            {feedback.map((feedbackItem, index) => (
              <li key={index}>{feedbackItem}</li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Performance Chart */}
        <div className="col-span-1">
          <Card
            title="Performance Chart"
            gradient="from-blue-500 to-cyan-500"
          >
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="pv" stroke="#ffffff" />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Another Chart or Widget */}
        <div className="col-span-1">
          <Card
            title="Another Widget or Chart"
            gradient="from-gray-500 to-blue-500"
          >
            {/* Add additional content or chart here */}
            <p>Content goes here</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;