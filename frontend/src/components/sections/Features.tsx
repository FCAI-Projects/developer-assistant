import React from "react";
import ManageProjectImg from "../../images/manage-projects.svg";
import Time from "../../images/time.svg";
import Chat from "../../images/chat.svg";
import Charts from "../../images/charts.svg";
import Mails from "../../images/mails.svg";
import Github from "../../images/github.svg";
import Payment from "../../images/payment.svg";

export const Features: React.FC = () => {
  return (
    <div id="features">
      <p className="mt-6 mb-8 flex justify-center text-3xl font-bold text-cyan-800">Features</p>
      <div>
        {/* Manage projects */}
        <div className="flex justify-between container mx-auto px-10 pt-6 pb-32">
          <div>
            <h1 className="text-2xl font-bold text-cyan-800 mb-4">
              Manage Projects and Tasks
            </h1>
            <ul className=" ml-6 list-disc text-slate-700 text-lg">
              <li>Manage all your projects and create tasks for every project separately.</li>
              <li>Manage tasks in Drag and Drop Lists.</li>
              <li>Allowing adding private notes for every member.</li>
              <li>Write docs on one page for your task.</li>
              <li>Write comments on tasks.</li>
            </ul>
          </div>
          <img 
            className="w-64 mr-8"
            src={ManageProjectImg}
            alt="Image"
          />
        </div>

        {/* Time Tracking */}
        <div className="bg-cyan-800 py-32">
          <div className="flex justify-between container mx-auto px-10">
            <img 
              className="w-56 ml-12"
              src={Time}
              alt="Image"
            />
            <div className="flex flex-col justify-center">
              <h1 className="text-2xl font-bold text-white mb-4">
                Time Tracking
              </h1>
              <ul className=" ml-6 list-disc text-slate-300 text-lg">
                <li>Time tracking for every project for every member and timesheets.</li>
                <li>Reminders with tasks if deadline get close.</li>
                <li>Show all deadlines in calendar.</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Chat and video calls with Screen share */}
        <div className="flex justify-between container mx-auto px-10 py-32">
          <div>
            <h1 className="text-2xl font-bold text-cyan-800 mb-4">
              Chat and video calls with Screen share
            </h1>
            <ul className=" ml-6 list-disc text-slate-700 text-lg">
              <li>Create chat group with specific team members.</li>
              <li>Can you chat and make video calls.</li>
              <li>In Video call can share your screen for other members in call.</li>
            </ul>
          </div>
          <img 
            className="w-64 mr-8"
            src={Chat}
            alt="Image"
          />
        </div>

        {/* Charts and Statistics */}
        <div className="bg-cyan-800 py-10">
          <div className="flex justify-between container mx-auto px-10 py-32">
            <img 
              className="w-80 ml-12"
              src={Charts}
              alt="Image"
            />
            <div className="flex flex-col justify-center">
              <h1 className="text-2xl font-bold text-white mb-4">
                Charts and Statistics
              </h1>
              <ul className=" ml-6 list-disc text-slate-300 text-lg">
                <li>Interactive charts and statistics about the team activities.</li>
                <li>Chart for tasks every member finish .</li>
                <li>Chart for latest tasks for all and for every project.</li>
                <li>Chart for Expenses and Payments.</li>
                <li>How many pull requests they did .</li>
              </ul>
            </div>
          </div>
        </div>

        {/* GitHub Integration */}
        <div className="flex justify-between container mx-auto px-10 py-32">
          <div className="mt-3">
            <h1 className="text-2xl font-bold text-cyan-800 mb-4">
              GitHub Integration
            </h1>
            <ul className=" ml-6 list-disc text-slate-700 text-lg">
              <li>Git integration to see pull requests and issues.</li>
              <li>Create the branch with the task name.</li>
              <li>Notify the project admin when doing pull request.</li>
              <li>connect every project with one repo.</li>
            </ul>
          </div>
          <img 
            className="w-56 mr-8"
            src={Github}
            alt="Image"
          />
        </div>

        {/* Send Emails */}
        <div className="bg-cyan-800 py-32">
          <div className="flex justify-between container mx-auto px-10">
            <img 
              className="w-56 ml-12"
              src={Mails}
              alt="Image"
            />
            <div className="flex flex-col justify-center">
              <h1 className="text-2xl font-bold text-white mb-4">
                Chat and video calls with Screen share
              </h1>
              <ul className=" ml-6 list-disc text-slate-300 text-lg">
                <li>Sending and Receive emails to the clients.</li>
                <li>Real-time report templates and sending the reports to clients.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Payment Invoice */}
        <div className="flex justify-between container mx-auto px-10 py-32">
          <div className="mt-3">
            <h1 className="text-2xl font-bold text-cyan-800 mb-4">
              Payment Invoice
            </h1>
            <ul className=" ml-6 list-disc text-slate-700 text-lg">
              <li>Create estimates based on project data, Add and track expenses.</li>
              <li>Accept online payments for your invoices.</li>
            </ul>
          </div>
          <img 
            className="w-72 mr-8"
            src={Payment}
            alt="Image"
          />
        </div>
        
      </div>
    </div>
  );
};
